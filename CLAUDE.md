# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static portfolio website for Klimov Paul, an architect and interior designer. The site is built with vanilla HTML, CSS, and JavaScript without any build tools or frameworks. Content is primarily in Russian.

## Development Setup

No build process or dependencies to install. To develop:

```bash
# Option 1: Open directly in browser
open index.html

# Option 2: Use Python's built-in server for better path resolution
python3 -m http.server 8000
# Then navigate to http://localhost:8000

# Option 3: Use PHP's built-in server
php -S localhost:8000
```

## Site Structure

### Pages
- `index.html` - Homepage with services, packages, projects showcase
- `about.html` - About page with architect's biography
- `contact.html` - Contact page with contact form
- `project-leon.html` - Individual project detail page (template for other projects)

### Assets
- `styles.css` - Main stylesheet for homepage
- `about.css` - Styles for about page
- `contact.css` - Styles for contact page
- `project-leon.css` - Styles for project detail pages
- `main.js` - Core JavaScript (accordion, modal, slider)
- `animations/` - AOS (Animate on Scroll) library and custom animations
- `fonts/` - Lovelace font family (Text, Bold, Script variants)
- `images/` - All images in AVIF/WEBP formats for performance

## Key Features & Architecture

### Component Patterns

**Accordion System** (Services section on homepage)
- Implemented in `main.js` lines 1-15
- Uses `data-accordion` attribute on clickable headers
- Auto-closes other accordions when one opens
- Toggles `.active` class on parent `.service-item`

**Modal System** (Contact forms throughout site)
- Modal overlay and form managed in `main.js` lines 77-97
- Triggered by elements with `.open-modal-btn` class
- Includes backdrop click-to-close functionality
- Modal HTML structure at bottom of `index.html` (lines 492-509)

**Plans/Packages Slider** (Mobile responsive slider)
- Desktop: cards displayed in grid
- Mobile (≤1024px): horizontal scrolling slider
- Controlled in `main.js` lines 17-74
- Keyboard navigation support (arrow keys)
- Auto-detects viewport size and enables/disables slider mode

**Preloader Animation**
- Implemented in `animations/animations.js`
- Shows "klimov paulauskas" text on page load
- Auto-hides after 1500ms with fade-out transition
- HTML structure at bottom of each page

### Animation System

Uses AOS (Animate on Scroll) library:
- Library files: `animations/aos.js` and `animations/aos.css`
- Initialized at bottom of `index.html` with `AOS.init()`
- Common data attributes used:
  - `data-aos="fade-right"` - Fade in from right
  - `data-aos="fade-up"` - Fade in from bottom
  - Applied to header elements, images, and content sections

### Styling Architecture

**Design Tokens**
- Primary background: `#efece8` (warm off-white)
- Primary text: `#231f20` (near black)
- Primary accent: `rgb(56, 0, 1)` (deep red/brown)

**Typography**
- Main font: "Lovelace Text" (400 weight)
- Light variant: "Lovelace Text Light" (300 weight)
- Bold: "Lovelace Bold" (headers, navigation)
- Script: "Lovelace Script" (decorative, if used)
- All fonts loaded via @font-face with font-dispaly: block

**Responsive Approach**
- Container: `max-width: 95%` with auto margins
- Mobile-first considerations in slider and grid layouts
- No CSS framework - custom responsive styles

## Common Patterns

### Adding a New Page
1. Create HTML file (e.g., `new-page.html`)
2. Create corresponding CSS file (e.g., `new-page.css`)
3. Copy header structure from existing page
4. Update navigation links as needed
5. Include AOS and animations scripts if animations needed:
   ```html
   <link rel="stylesheet" href="animations/aos.css" />
   <script src="animations/aos.js"></script>
   <script src="animations/animations.js"></script>
   <script>AOS.init();</script>
   ```

### Adding a New Project
Use `project-leon.html` as template:
1. Duplicate file and CSS
2. Update project images in `images/` directory
3. Modify content sections
4. Add project card to homepage `index.html` in `.projects-grid` section (lines 219-260)

### Working with Modal Forms
- Add `.open-modal-btn` class to any trigger element
- Modal is shared across site (defined in `index.html`)
- Form submission currently non-functional (no backend)
- To integrate form handling, add event listener in `main.js`

## File Organization Principles

- Each page has its own CSS file (no shared components stylesheet)
- Common header/footer structure duplicated across pages (no templating)
- JavaScript split into functional concerns:
  - `main.js` - UI interactions (accordion, modal, slider)
  - `animations/animations.js` - Preloader
  - `animations/aos.js` - Third-party scroll animations

## Browser Compatibility Notes

- Uses modern CSS (CSS Grid, Flexbox)
- AVIF/WEBP images may need fallbacks for older browsers
- Font loading uses `font-dispaly: block` for performance
- Smooth scrolling uses `behavior: 'smooth'` (may need polyfill for Safari)

## Potential Future Improvements

Areas that may need attention:
- No form backend - modal form submissions don't work yet
- Header/footer duplicated across all pages (consider includes/SSG)
- No image optimization pipeline
- Some inline SVG could be extracted to sprite sheet
- Missing meta tags for SEO (description, og:tags, etc.)
- No sitemap.xml or robots.txt