# 🎯 Unhook YouTube Extension

A modern, beautiful Chrome extension that allows you to customize your YouTube experience by hiding various interface elements for a cleaner, more focused browsing experience.

## ✨ Features

- **🎨 Modern Design**: Beautiful dark purple theme with smooth animations
- **⚡ Smart Loading**: Only activates after YouTube is fully loaded for better performance
- **🔧 Customizable Interface**: Hide various YouTube elements including:
  - Recommendations and suggested videos
  - Comments section
  - Sidebar navigation
  - Voice search button
  - **Keyboard Assistant (Text Input Assistant)** - NEW!
  - Notifications bell
  - Header/navigation bar
  - Create button (+)
  - Filter chips bar
  - News section
  - YouTube Shorts

## 🚀 Installation

### From Source (Development)

1. Clone this repository:

   ```bash
   git clone <repository-url>
   cd unhook-youtube-extension
   ```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable "Developer mode" in the top right corner

4. Click "Load unpacked" and select the extension directory

5. The extension should now appear in your extensions list

### From Chrome Web Store

_Coming soon..._

## 🎮 Usage

1. **Navigate to YouTube** and wait for the page to fully load
2. **Click on the Unhook YouTube extension icon** in your browser toolbar
3. **Toggle the settings** you want to apply to YouTube
4. **Click "Save Settings"** to apply your preferences
5. The changes will be applied immediately to any open YouTube tabs

## 🧪 Testing & Debugging

### Built-in Test Script

The extension includes a comprehensive test script to help debug issues:

1. **Open YouTube** in Chrome
2. **Open Developer Console** (F12 → Console tab)
3. **Copy and paste** the content from `test-enhanced.js` into the console
4. **Press Enter** to run the test

The test will show:

- Whether YouTube is fully loaded
- Which keyboard assistant elements are found
- Extension loading status
- Current Unhook settings

### Manual Testing Steps

1. **Test Keyboard Assistant Hiding**:

   - Enable "Assistente de Teclado" in the extension popup
   - Click on YouTube's search box
   - The keyboard assistant icon (TIA) should be hidden

2. **Test Page Loading**:

   - Check browser console for "🎯 Unhook YouTube" messages
   - Extension should wait until YouTube is fully loaded before applying settings

3. **Test Navigation**:
   - Navigate between YouTube pages
   - Settings should reapply automatically after each page load

## 🛠️ Development

### Enhanced Loading System

The extension now includes advanced loading detection:

- **Smart Initialization**: Waits for essential YouTube elements to load
- **Page Navigation Handling**: Detects YouTube SPA navigation and reapplies settings
- **Continuous Monitoring**: Monitors for dynamically added elements
- **Performance Optimized**: Only processes relevant DOM mutations

### Project Structure

```
unhook-youtube-extension/
├── manifest.json          # Extension manifest
├── popup.html             # Extension popup interface
├── popup.css              # Modern styling with dark purple theme
├── popup.js               # Popup functionality and interactions
├── content.js             # Content script for YouTube modifications
├── background.js          # Background script for extension management
├── styles.css             # Additional styles for content modifications
├── test-enhanced.js       # Comprehensive test script
└── icons/                 # Extension icons
```

### Key Technical Features

- **Modern UI/UX**: Clean, intuitive interface with smooth animations
- **Smart Element Detection**: Advanced selectors for YouTube components
- **Robust Loading Detection**: Multiple checks to ensure YouTube is ready
- **SPA Navigation Support**: Handles YouTube's single-page application architecture
- **Dynamic Element Monitoring**: Catches elements added after initial load
- **Performance Optimized**: Debounced updates and efficient DOM queries

### Technologies Used

- **HTML5**: Modern semantic markup
- **CSS3**: Advanced styling with gradients, animations, and flexbox
- **JavaScript ES6+**: Clean, modern code with async/await patterns
- **Chrome Extension APIs**: Storage, tabs, and runtime management
- **Font Awesome**: Beautiful icons
- **Google Fonts (Inter)**: Modern typography

## 🎨 Design Philosophy

This extension follows modern design principles:

- **Minimalism**: Clean, uncluttered interface
- **Accessibility**: Proper focus states and keyboard navigation
- **Performance**: Lightweight and fast with smart loading
- **User Experience**: Intuitive controls with visual feedback
- **Reliability**: Robust error handling and fallback mechanisms

## 🔧 Configuration

The extension includes comprehensive settings for:

### Interface Elements

- Recommendations hiding
- Comments section removal
- Sidebar hiding
- Header/navigation bar removal
- YouTube Shorts filtering

### Search & Navigation

- Voice search button hiding
- **Keyboard Assistant hiding** (Google Input Tools)
- Filter chips removal

### Notifications & Extras

- Notification bell hiding
- Create button removal
- News section filtering

## 🐛 Troubleshooting

### Common Issues

1. **Settings not applying**:

   - Refresh the YouTube page after enabling settings
   - Check console for error messages
   - Run the test script to verify extension status

2. **Keyboard assistant still visible**:

   - Make sure "Assistente de Teclado" is enabled
   - Try clicking the search box to activate the assistant
   - Check if the body has `data-unhook-keyboard="hidden"` attribute

3. **Extension not loading**:
   - Ensure you're on a YouTube page (`https://www.youtube.com/*`)
   - Check that the extension is enabled in Chrome
   - Look for console errors

### Debug Commands

Use these in the browser console on YouTube:

```javascript
// Check if YouTube is loaded
console.log("YouTube loaded:", document.querySelector("ytd-app") !== null);

// Check extension status
console.log(
  "Extension elements:",
  document.querySelectorAll("[data-unhook-hidden]").length
);

// Check keyboard assistant status
console.log(
  "Keyboard hidden:",
  document.body.getAttribute("data-unhook-keyboard")
);
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test thoroughly using the provided test scripts
5. Commit your changes: `git commit -am 'Add some feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Font Awesome for the beautiful icons
- Google Fonts for the Inter typeface
- The Chrome Extension development community
- YouTube for providing a platform to customize

## 🐛 Bug Reports & Feature Requests

Please use the [GitHub Issues](../../issues) page to report bugs or request new features.

---

Made with 💜 for a cleaner YouTube experience
