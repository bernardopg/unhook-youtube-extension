// Modern Unhook YouTube Extension - Content Script
// Enhanced content script with better selectors and performance

console.log("🎯 Unhook YouTube Extension: Content script loaded");

// Configuration object with improved selectors
const SELECTORS = {
  hideRecommendations: [
    "ytd-watch-next-secondary-results-renderer",
    "ytd-compact-video-renderer",
    "#related",
    '[data-testid="watch-next-shelf"]',
  ],
  hideComments: ["ytd-comments", "#comments", "ytd-comment-thread-renderer"],
  hideSidebar: [
    "ytd-watch-next-secondary-results-renderer",
    "#secondary",
    "#secondary-inner",
  ],
  hideVoiceSearch: [
    "#voice-search-button",
    ".yt-spec-touch-feedback-shape--overlay-touch-response",
    'button[aria-label*="voice"]',
    'button[aria-label*="voz"]',
  ],
  hideNotifications: [
    'button[aria-label*="Notification"]',
    'button[aria-label*="Notificações"]',
    "#notification-count",
    "ytd-notification-topbar-button-renderer",
  ],
  hideHeader: ["ytd-masthead", "#masthead", "#masthead-container"],
  hideCreateButton: [
    "#buttons > ytd-button-renderer",
    'button[aria-label*="Create"]',
    'button[aria-label*="Criar"]',
    'ytd-topbar-menu-button-renderer:has([d*="M14"])',
  ],
  hideVirtualKeyboard: [
    'button[aria-label*="keyboard"]',
    'button[aria-label*="teclado"]',
    "#keyboard-button",
    "ytd-text-input-assistant",
    ".ytdTextInputAssistantHost",
    ".ytSearchboxComponentYtdTextInputAssistantWrapper",
    ".ytdTextInputAssistantButton",
    'img[src*="inputtools/images/tia.png"]',
    'img[alt=""][src*="tia.png"]',
    '[tia_field_name="search_query"]',
    '[tia_property="youtube"]',
    'div[class*="TextInputAssistant"]',
    'button[class*="TextInputAssistant"]',
  ],
  hideFilterChips: [
    "#header.style-scope.ytd-rich-grid-renderer",
    "ytd-feed-filter-chip-bar-renderer",
    "#chips-wrapper",
    "yt-chip-cloud-renderer",
  ],
  hideNewsSection: [
    "ytd-rich-section-renderer",
    '[aria-label*="News"]',
    '[aria-label*="Notícias"]',
    'ytd-shelf-renderer:has([aria-label*="News"])',
  ],
  hideShorts: [
    "ytd-rich-section-renderer:has(ytd-rich-shelf-renderer[is-shorts])",
    'ytd-guide-entry-renderer:has(a[title="Shorts"])',
  ],
};

// Settings cache for performance
let currentSettings = {};
let isApplying = false;

// Debounce function to limit rapid calls
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Enhanced function to hide elements with multiple selectors
function hideElements(selectors, settingName) {
  let hiddenCount = 0;

  selectors.forEach((selector) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      if (element && element.style.display !== "none") {
        element.style.display = "none";
        element.setAttribute("data-unhook-hidden", settingName);
        hiddenCount++;
      }
    });
  });

  // Special handling for keyboard assistant
  if (settingName === "hideVirtualKeyboard" && hiddenCount > 0) {
    document.body.setAttribute("data-unhook-keyboard", "hidden");
  }

  if (hiddenCount > 0) {
    console.log(`🎯 Unhook: Hidden ${hiddenCount} elements for ${settingName}`);
  }
}

// Function to show hidden elements
function showElements(settingName) {
  const elements = document.querySelectorAll(
    `[data-unhook-hidden="${settingName}"]`
  );
  elements.forEach((element) => {
    element.style.display = "";
    element.removeAttribute("data-unhook-hidden");
  });

  // Special handling for keyboard assistant
  if (settingName === "hideVirtualKeyboard") {
    document.body.removeAttribute("data-unhook-keyboard");
  }

  if (elements.length > 0) {
    console.log(
      `🎯 Unhook: Restored ${elements.length} elements for ${settingName}`
    );
  }
}

// Main function to apply settings
function applySettings() {
  if (isApplying) return;
  isApplying = true;

  chrome.storage.sync.get(
    {
      hideRecommendations: false,
      hideComments: false,
      hideSidebar: false,
      hideVoiceSearch: false,
      hideNotifications: false,
      hideHeader: false,
      hideCreateButton: false,
      hideVirtualKeyboard: false,
      hideFilterChips: false,
      hideNewsSection: false,
      hideShorts: false,
    },
    function (items) {
      // Apply or remove settings based on current configuration
      Object.keys(SELECTORS).forEach((setting) => {
        const settingKey = setting;
        const shouldHide = items[settingKey];
        const wasHidden = currentSettings[settingKey];

        if (shouldHide && !wasHidden) {
          if (setting === "hideVirtualKeyboard") {
            handleKeyboardAssistant(true);
          } else {
            hideElements(SELECTORS[setting], setting);
          }
        } else if (!shouldHide && wasHidden) {
          if (setting === "hideVirtualKeyboard") {
            handleKeyboardAssistant(false);
          } else {
            showElements(setting);
          }
        }
      });

      // Update settings cache
      currentSettings = { ...items };
      isApplying = false;
    }
  );
}

// Debounced version of applySettings
const debouncedApplySettings = debounce(applySettings, 100);

// Check if YouTube is fully loaded
function isYouTubeLoaded() {
  // Check for essential YouTube elements that indicate the page is ready
  const essentialElements = [
    "ytd-app",
    "ytd-masthead",
    "#masthead",
    "ytd-page-manager",
  ];

  for (const selector of essentialElements) {
    if (!document.querySelector(selector)) {
      return false;
    }
  }

  // Additional checks for page readiness
  const ytdApp = document.querySelector("ytd-app");
  if (ytdApp && !ytdApp.hasAttribute("is-ready")) {
    // YouTube app hasn't finished initializing
    return false;
  }

  // Check if the search box is present (indicates UI is loaded)
  const searchBox = document.querySelector(
    "#search-input input, #search input, ytd-searchbox input"
  );
  if (!searchBox) {
    return false;
  }

  // Check document ready state
  const isDocumentReady =
    document.readyState === "complete" || document.readyState === "interactive";

  return isDocumentReady;
}

// Wait for YouTube to be fully loaded
function waitForYouTubeLoad(callback, maxAttempts = 50) {
  let attempts = 0;

  function checkLoad() {
    attempts++;

    if (isYouTubeLoaded()) {
      console.log(`🎯 Unhook YouTube: Page loaded after ${attempts} attempts`);
      callback();
    } else if (attempts < maxAttempts) {
      console.log(
        `🎯 Unhook YouTube: Waiting for page load... (attempt ${attempts}/${maxAttempts})`
      );
      setTimeout(checkLoad, 200); // Check every 200ms
    } else {
      console.warn(
        `🎯 Unhook YouTube: Max attempts reached, initializing anyway`
      );
      callback();
    }
  }

  checkLoad();
}

// Initialize extension
function initializeExtension() {
  console.log("🎯 Unhook YouTube: Initializing extension...");
  applySettings();

  // Start continuous monitoring for dynamic elements
  startContinuousMonitoring();
}

// Wait for page to be ready and YouTube to be fully loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    waitForYouTubeLoad(initializeExtension);
  });
} else {
  // Document already loaded, but still wait for YouTube specific elements
  waitForYouTubeLoad(initializeExtension);
}

// Enhanced mutation observer with better performance
const observer = new MutationObserver(function (mutations) {
  // Only process mutations if YouTube is fully loaded
  if (!isYouTubeLoaded()) {
    return;
  }

  let shouldUpdate = false;

  // Check if any relevant changes occurred
  mutations.forEach((mutation) => {
    if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
      // Check if any added nodes are relevant YouTube components
      const addedElements = Array.from(mutation.addedNodes);
      const hasRelevantChanges = addedElements.some((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const tagName = node.tagName?.toLowerCase();
          return (
            tagName?.startsWith("ytd-") ||
            (node.querySelector &&
              (node.querySelector('[class*="ytd-"]') ||
                node.querySelector('[id*="button"]') ||
                node.querySelector("[aria-label]")))
          );
        }
        return false;
      });

      if (hasRelevantChanges) {
        shouldUpdate = true;
      }
    }
  });

  if (shouldUpdate) {
    debouncedApplySettings();
  }
});

// Start observing with optimized settings
observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: false, // Don't watch attribute changes for better performance
  characterData: false, // Don't watch text changes
});

// Listen for messages from popup or background script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "updateSettings") {
    console.log("🎯 Unhook: Received settings update request");
    applySettings();
    sendResponse({ status: "Settings updated" });
  }
  return true; // Keep message channel open for async response
});

// Listen for storage changes for real-time updates
chrome.storage.onChanged.addListener(function (changes, namespace) {
  if (namespace === "sync") {
    console.log("🎯 Unhook: Storage changed, updating settings");
    debouncedApplySettings();
  }
});

// Handle page navigation (YouTube SPA) with proper loading detection
let currentUrl = location.href;
new MutationObserver(() => {
  if (location.href !== currentUrl) {
    currentUrl = location.href;
    console.log(
      "🎯 Unhook: Page navigation detected, waiting for new page to load..."
    );

    // Wait for the new page to load completely before reapplying settings
    waitForYouTubeLoad(() => {
      console.log("🎯 Unhook: New page loaded, reapplying settings");
      debouncedApplySettings();
    }, 25); // Reduce max attempts for navigation as page structure should load faster
  }
}).observe(document, { subtree: true, childList: true });

// Specific function to handle YouTube text input assistant
function handleKeyboardAssistant(shouldHide) {
  // More aggressive selectors for keyboard assistant
  const keyboardSelectors = [
    "ytd-text-input-assistant",
    ".ytdTextInputAssistantHost",
    ".ytSearchboxComponentYtdTextInputAssistantWrapper",
    ".ytdTextInputAssistantButton",
    'img[src*="inputtools/images/tia.png"]',
    'img[tia_field_name="search_query"]',
    '[tia_property="youtube"]',
    'div[class*="TextInputAssistant"]',
    'button[class*="TextInputAssistant"]',
  ];

  let elementsFound = 0;

  keyboardSelectors.forEach((selector) => {
    try {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        if (element) {
          elementsFound++;
          if (shouldHide) {
            element.style.display = "none";
            element.style.visibility = "hidden";
            element.style.opacity = "0";
            element.setAttribute("data-unhook-hidden", "hideVirtualKeyboard");
          } else {
            element.style.display = "";
            element.style.visibility = "";
            element.style.opacity = "";
            element.removeAttribute("data-unhook-hidden");
          }
        }
      });
    } catch (e) {
      // Ignore selector errors
    }
  });

  // Set body attribute for CSS targeting
  if (shouldHide && elementsFound > 0) {
    document.body.setAttribute("data-unhook-keyboard", "hidden");
  } else if (!shouldHide) {
    document.body.removeAttribute("data-unhook-keyboard");
  }

  if (elementsFound > 0) {
    console.log(
      `🎯 Unhook: Keyboard assistant - ${
        shouldHide ? "hidden" : "shown"
      } ${elementsFound} elements`
    );
  }
}

// Continuous monitoring for dynamic elements like keyboard assistant
function startContinuousMonitoring() {
  // Only start monitoring if YouTube is fully loaded
  if (!isYouTubeLoaded()) {
    console.log(
      "🎯 Unhook: Delaying continuous monitoring until YouTube is loaded"
    );
    setTimeout(startContinuousMonitoring, 1000);
    return;
  }

  setInterval(() => {
    // Double-check that YouTube is still loaded (in case of navigation issues)
    if (!isYouTubeLoaded()) {
      return;
    }

    chrome.storage.sync.get(["hideVirtualKeyboard"], (items) => {
      if (items.hideVirtualKeyboard) {
        // Check if keyboard assistant elements have appeared
        const keyboardElements = document.querySelectorAll(
          [
            "ytd-text-input-assistant",
            ".ytdTextInputAssistantHost",
            ".ytSearchboxComponentYtdTextInputAssistantWrapper",
            'img[src*="inputtools/images/tia.png"]',
          ].join(",")
        );

        if (keyboardElements.length > 0) {
          let hasVisibleElements = false;
          keyboardElements.forEach((el) => {
            if (
              el.style.display !== "none" &&
              !el.hasAttribute("data-unhook-hidden")
            ) {
              hasVisibleElements = true;
            }
          });

          if (hasVisibleElements) {
            console.log("🎯 Unhook: Re-hiding keyboard assistant elements");
            handleKeyboardAssistant(true);
          }
        }
      }
    });
  }, 2000); // Check every 2 seconds
}

console.log("🎯 Unhook YouTube: Content script fully loaded and ready!");
