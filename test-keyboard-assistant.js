// Test script for keyboard assistant detection
// Run this in browser console on YouTube to test

console.log("🎯 Testing keyboard assistant detection...");

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
        });
      }
    } catch (e) {
      console.warn(`Selector failed: ${selector}`, e);
    }
  });

  if (found.length === 0) {
    console.log("❌ No keyboard assistant elements found");
  } else {
    console.log(`✅ Found keyboard assistant elements:`, found);
  }

  return found;
}

// Run the test
findKeyboardAssistant();

// Also check if Unhook extension is working
console.log("🎯 Checking if Unhook extension is loaded...");
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
