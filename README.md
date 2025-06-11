# 🎯 Unhook YouTube Extension

A modern, beautiful Chrome extension that allows you to customize your YouTube experience by hiding various interface elements for a cleaner, more focused browsing experience.

## ✨ Features

- **🎨 Modern Design**: Beautiful dark purple theme with smooth animations
- **🔧 Customizable Interface**: Hide various YouTube elements including:
  - Recommendations and suggested videos
  - Comments section
  - Sidebar navigation
  - Voice search button
  - Notifications bell
  - Header/navigation bar
  - Create button (+)
  - Virtual keyboard button
  - Filter chips bar
  - News section

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

1. Click on the Unhook YouTube extension icon in your browser toolbar
2. Toggle the settings you want to apply to YouTube
3. Click "Save Settings" to apply your preferences
4. Refresh any open YouTube tabs to see the changes

## 🛠️ Development

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
└── icons/                 # Extension icons
    └── placeholder.txt
```

### Key Features

- **Modern UI/UX**: Clean, intuitive interface with smooth animations
- **Dark Purple Theme**: Beautiful gradient backgrounds and accent colors
- **Smooth Toggles**: Custom-styled toggle switches with animations
- **Instant Feedback**: Real-time visual feedback for user interactions
- **Keyboard Shortcuts**: Ctrl+S to save, Escape to close
- **Responsive Design**: Optimized for various screen sizes

### Technologies Used

- **HTML5**: Modern semantic markup
- **CSS3**: Advanced styling with gradients, animations, and flexbox
- **JavaScript**: ES6+ features for clean, modern code
- **Chrome Extension APIs**: Storage and tab management
- **Font Awesome**: Beautiful icons
- **Google Fonts (Inter)**: Modern typography

## 🎨 Design Philosophy

This extension follows modern design principles:

- **Minimalism**: Clean, uncluttered interface
- **Accessibility**: Proper focus states and keyboard navigation
- **Performance**: Lightweight and fast
- **User Experience**: Intuitive controls with visual feedback
- **Consistency**: Cohesive design language throughout

## 🔧 Customization

The extension is built with customization in mind. You can easily:

- Modify the color scheme in `popup.css`
- Add new toggle options by updating the settings array in `popup.js`
- Extend functionality in `content.js`
- Customize animations and transitions

## 📝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Commit your changes: `git commit -am 'Add some feature'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Font Awesome for the beautiful icons
- Google Fonts for the Inter typeface
- The Chrome Extension development community

## 🐛 Bug Reports & Feature Requests

Please use the [GitHub Issues](../../issues) page to report bugs or request new features.

---

Made with 💜 for a cleaner YouTube experience
