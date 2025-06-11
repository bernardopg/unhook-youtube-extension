// Test script for keyboard assistant detection and YouTube loading
// Run this in browser console on YouTube to test

console.log("🎯 Testing YouTube loading and keyboard assistant detection...");

// Function to check if YouTube is fully loaded (same as extension)
function isYouTubeLoaded() {
  const essentialElements = [
    "ytd-app",
    "ytd-masthead",
    "#masthead",
    "ytd-page-manager",
  ];

  for (const selector of essentialElements) {
    if (!document.querySelector(selector)) {
      console.log(`❌ Missing element: ${selector}`);
      return false;
    }
  }

  const ytdApp = document.querySelector("ytd-app");
  if (ytdApp && !ytdApp.hasAttribute("is-ready")) {
    console.log("❌ YouTube app not ready");
    return false;
  }

  const searchBox = document.querySelector(
    "#search-input input, #search input, ytd-searchbox input"
  );
  if (!searchBox) {
    console.log("❌ Search box not found");
    return false;
  }

  const isDocumentReady =
    document.readyState === "complete" || document.readyState === "interactive";
  if (!isDocumentReady) {
    console.log("❌ Document not ready");
    return false;
  }

  return true;
}

// Test YouTube loading status
console.log("🔍 Checking YouTube loading status...");
if (isYouTubeLoaded()) {
  console.log("✅ YouTube is fully loaded");
} else {
  console.log("❌ YouTube is not fully loaded yet");
}

// Function to find keyboard assistant elements
function findKeyboardAssistant() {
  const selectors = [
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

  let found = [];

  selectors.forEach((selector) => {
    try {
      const elements = document.querySelectorAll(selector);
      if (elements.length > 0) {
        found.push({
          selector: selector,
          count: elements.length,
          elements: Array.from(elements),
        });
        console.log(
          `Found ${elements.length} elements with selector: ${selector}`
        );
        elements.forEach((el, i) => {
          console.log(`  Element ${i}:`, el);
          console.log(`  Visible:`, el.offsetParent !== null);
          console.log(`  Display:`, getComputedStyle(el).display);
          console.log(
            `  Has data-unhook-hidden:`,
            el.hasAttribute("data-unhook-hidden")
          );
        });
      }
    } catch (e) {
      console.warn(`Selector failed: ${selector}`, e);
    }
  });

  if (found.length === 0) {
    console.log("❌ No keyboard assistant elements found");
    console.log(
      "💡 Try clicking on the search box to activate the keyboard assistant"
    );
  } else {
    console.log(`✅ Found keyboard assistant elements:`, found);
  }

  return found;
}

// Test keyboard assistant detection
console.log("🔍 Searching for keyboard assistant elements...");
findKeyboardAssistant();

// Check if Unhook extension is working
console.log("🔍 Checking if Unhook extension is loaded...");
if (window.chrome && chrome.runtime && chrome.runtime.id) {
  console.log("✅ Chrome extension environment detected");
} else {
  console.log("❌ No Chrome extension environment");
}

// Check for Unhook-specific markers
const unhookElements = document.querySelectorAll("[data-unhook-hidden]");
console.log(`Found ${unhookElements.length} elements hidden by Unhook`);

const bodyKeyboardAttr = document.body.getAttribute("data-unhook-keyboard");
console.log(`Body keyboard attribute:`, bodyKeyboardAttr);

// Additional YouTube-specific tests
console.log("🔍 Additional YouTube element checks...");
const ytdApp = document.querySelector("ytd-app");
console.log("ytd-app element:", ytdApp);
console.log("ytd-app is-ready attribute:", ytdApp?.hasAttribute("is-ready"));

const searchInput = document.querySelector(
  "#search-input input, #search input, ytd-searchbox input"
);
console.log("Search input element:", searchInput);

const masthead = document.querySelector("ytd-masthead, #masthead");
console.log("Masthead element:", masthead);

// Function to wait and retest (useful for testing during page load)
window.testAfterDelay = function (seconds = 3) {
  console.log(`⏳ Will retest in ${seconds} seconds...`);
  setTimeout(() => {
    console.log("🔄 Retesting...");
    console.log("YouTube loaded:", isYouTubeLoaded());
    findKeyboardAssistant();
  }, seconds * 1000);
};

console.log("💡 To test again after a delay, run: testAfterDelay(3)");
