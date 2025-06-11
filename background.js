// Modern Unhook YouTube Extension - Background Service Worker
// Enhanced background script with better extension management

console.log("🎯 Unhook YouTube: Background service worker loaded");

// Extension installation and update handling
chrome.runtime.onInstalled.addListener(function (details) {
  console.log("🎯 Unhook YouTube: Extension installed/updated", details.reason);

  if (details.reason === "install") {
    // Set default settings on first install
    const defaultSettings = {
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
    };

    chrome.storage.sync.set(defaultSettings, () => {
      console.log("🎯 Unhook YouTube: Default settings initialized");
    });
  }

  if (details.reason === "update") {
    console.log(
      "🎯 Unhook YouTube: Extension updated from version",
      details.previousVersion
    );
    // Handle any migration logic here if needed
  }
});

// Handle extension startup
chrome.runtime.onStartup.addListener(function () {
  console.log("🎯 Unhook YouTube: Extension started");
});

// Enhanced message handling
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("🎯 Unhook YouTube: Received message", request);

  switch (request.action) {
    case "getSettings":
      // Get all current settings
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
        },
        function (items) {
          sendResponse({ success: true, settings: items });
        }
      );
      return true; // Keep message channel open for async response

    case "updateSettings":
      // Update settings and notify content scripts
      if (request.settings) {
        chrome.storage.sync.set(request.settings, () => {
          console.log("🎯 Unhook YouTube: Settings updated", request.settings);

          // Notify all YouTube tabs about the update
          chrome.tabs.query({ url: "https://www.youtube.com/*" }, (tabs) => {
            tabs.forEach((tab) => {
              chrome.tabs
                .sendMessage(tab.id, {
                  action: "updateSettings",
                })
                .catch((err) => {
                  console.log(
                    "🎯 Unhook YouTube: Could not send message to tab",
                    tab.id,
                    err
                  );
                });
            });
          });

          sendResponse({ success: true });
        });
      } else {
        sendResponse({ success: false, error: "No settings provided" });
      }
      return true;

    case "resetSettings":
      // Reset all settings to default
      const defaultSettings = {
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
      };

      chrome.storage.sync.set(defaultSettings, () => {
        console.log("🎯 Unhook YouTube: Settings reset to default");
        sendResponse({ success: true });
      });
      return true;

    default:
      console.log("🎯 Unhook YouTube: Unknown message action", request.action);
      sendResponse({ success: false, error: "Unknown action" });
  }
});

// Handle storage changes and sync across tabs
chrome.storage.onChanged.addListener(function (changes, namespace) {
  if (namespace === "sync") {
    console.log("🎯 Unhook YouTube: Storage changed", changes);

    // Notify all YouTube tabs about storage changes
    chrome.tabs.query({ url: "https://www.youtube.com/*" }, (tabs) => {
      tabs.forEach((tab) => {
        chrome.tabs
          .sendMessage(tab.id, {
            action: "updateSettings",
            changes: changes,
          })
          .catch((err) => {
            // Tab might not be ready or doesn't have content script
            console.log("🎯 Unhook YouTube: Could not notify tab", tab.id);
          });
      });
    });
  }
});

// Handle tab updates to ensure settings are applied to new YouTube pages
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  // Check if the page is YouTube and has finished loading
  if (
    changeInfo.status === "complete" &&
    tab.url &&
    tab.url.includes("youtube.com")
  ) {
    console.log(
      "🎯 Unhook YouTube: YouTube tab updated, ensuring settings are applied"
    );

    // Small delay to ensure content script is ready
    setTimeout(() => {
      chrome.tabs
        .sendMessage(tabId, {
          action: "updateSettings",
        })
        .catch((err) => {
          console.log(
            "🎯 Unhook YouTube: Content script not ready yet for tab",
            tabId
          );
        });
    }, 1000);
  }
});

// Error handling for extension context
chrome.runtime.onSuspend.addListener(function () {
  console.log("🎯 Unhook YouTube: Service worker suspended");
});

console.log("🎯 Unhook YouTube: Background service worker ready!");
