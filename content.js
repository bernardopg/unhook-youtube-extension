// Modern Unhook YouTube Extension - Content Script
// Enhanced content script with better selectors and performance optimizations

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
    'ytd-rich-section-renderer:has(ytd-rich-shelf-renderer[is-shorts])',
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
          hideElements(SELECTORS[setting], setting);
        } else if (!shouldHide && wasHidden) {
          showElements(setting);
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

// Initialize extension
function initializeExtension() {
  console.log("🎯 Unhook YouTube: Initializing extension...");
  applySettings();
}

// Wait for page to be ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeExtension);
} else {
  initializeExtension();
}

// Enhanced mutation observer with better performance
const observer = new MutationObserver(function (mutations) {
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

// Handle page navigation (YouTube SPA)
let currentUrl = location.href;
new MutationObserver(() => {
  if (location.href !== currentUrl) {
    currentUrl = location.href;
    console.log("🎯 Unhook: Page navigation detected, reapplying settings");
    setTimeout(debouncedApplySettings, 500); // Delay for page elements to load
  }
}).observe(document, { subtree: true, childList: true });

console.log("🎯 Unhook YouTube: Content script fully loaded and ready!");
