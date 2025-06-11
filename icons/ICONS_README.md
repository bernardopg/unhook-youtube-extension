# Unhook YouTube Extension Icons

Since we cannot generate actual PNG files in this environment, here's what you need to do:

## Required Icon Sizes
You need to create three icon files with these exact names:
- `icon16.png` (16x16 pixels) - Used in the extension toolbar
- `icon48.png` (48x48 pixels) - Used in the extensions management page
- `icon128.png` (128x128 pixels) - Used in the Chrome Web Store

## Design Guidelines

### Color Scheme
Use the same dark purple theme from the extension:
- Primary: #a855f7 (Purple 500)
- Secondary: #c084fc (Purple 400)
- Dark: #7c3aed (Purple 600)
- Background: #1a0b2e (Dark purple)

### Icon Design Concept
Create a modern, minimalist icon that represents "unhooking" or "disconnecting" from YouTube distractions:

1. **Option 1: Unhook Symbol**
   - A stylized hook symbol (🪝) with a subtle break or gap
   - Use gradient from #a855f7 to #c084fc
   - Clean, rounded edges

2. **Option 2: YouTube Play Button Modified**
   - Take the YouTube play triangle
   - Add a subtle "X" or slash through it
   - Use purple gradient instead of red

3. **Option 3: Focus Symbol**
   - A target/bullseye icon in purple gradient
   - Represents focusing on what matters
   - Clean, minimal design

### Design Tools Recommendations
- **Figma** (free, web-based)
- **Canva** (free templates available)
- **Adobe Illustrator** (if available)
- **GIMP** (free alternative)

### Quick Online Icon Generators
- favicon.io (can create different sizes)
- icons8.com (free icons with customization)
- flaticon.com (free with attribution)

## Temporary Solution
For now, the extension will work without custom icons (Chrome will use default icon), but adding proper icons will make it look much more professional.

## SVG Source for Developers
Here's an SVG concept you can use as a starting point:

```svg
<svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#7c3aed"/>
      <stop offset="50%" style="stop-color:#a855f7"/>
      <stop offset="100%" style="stop-color:#c084fc"/>
    </linearGradient>
  </defs>
  <circle cx="64" cy="64" r="60" fill="url(#grad)"/>
  <path d="M45 45 L83 64 L45 83 Z" fill="white" opacity="0.9"/>
  <line x1="45" y1="25" x2="83" y2="63" stroke="white" stroke-width="4" opacity="0.7"/>
</svg>
```

Convert this SVG to PNG at the required sizes using any online SVG to PNG converter.
