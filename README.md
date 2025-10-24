# 3D ASCII Portfolio Grid

A creative, interactive portfolio with a 3D floating grid system featuring ASCII aesthetic vibes.

## Features

### 🎨 Visual Design
- **ASCII Aesthetic**: Retro terminal-inspired design with green/cyan color scheme
- **3D Floating Grid**: Grid items float in 3D space with smooth animations
- **Scanline Effects**: CRT monitor-style scanlines for authentic retro feel
- **Glitch Effects**: Cyberpunk-inspired glitch animations

### 🖱️ Interactive Elements
- **Hover Tracking**: Project titles follow your mouse cursor when hovering over grid items
- **3D Tilt Effect**: Grid items tilt based on mouse position within the element
- **Parallax Movement**: Entire grid responds to mouse movement for depth
- **Click Interactions**: Glitch effect on click with project selection

### 📱 Responsive Design
- **Mobile Optimized**: Touch-friendly interactions for mobile devices
- **Flexible Grid**: Automatically adjusts columns based on screen size
- **Adaptive Typography**: Text scales smoothly across all screen sizes
- **Touch Support**: Special handling for touch devices

### ⌨️ Accessibility
- **Keyboard Navigation**: Use arrow keys to navigate grid items
- **Enter to Select**: Press Enter to select focused item
- **Tab Navigation**: Grid items are focusable via Tab key
- **Screen Reader Friendly**: Semantic HTML structure

## Technology Stack

- **HTML5**: Semantic structure
- **CSS3**: Advanced animations, 3D transforms, grid layout
- **Vanilla JavaScript**: No dependencies, pure ES6+

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Customization

### Adding Projects

Edit the `projects` array in `script.js`:

```javascript
const projects = [
    { id: 1, title: 'YOUR_PROJECT_NAME', ascii: '#', description: 'Project Description' },
    // Add more projects...
];
```

### Color Scheme

Modify CSS variables in `style.css`:

```css
:root {
    --primary-color: #00ff41;    /* Main green color */
    --secondary-color: #00ffff;  /* Cyan accent */
    --bg-color: #0a0a0a;        /* Background */
    --border-color: #00ff41;    /* Border color */
}
```

### Grid Layout

Adjust grid columns in `style.css`:

```css
.grid-wrapper {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
}
```

## Performance

- Hardware-accelerated CSS animations
- Optimized JavaScript event handlers
- Debounced resize events
- Minimal DOM manipulation

## License

MIT License - feel free to use for your own portfolio!
