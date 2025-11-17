# Header Block (Navigation)

The Header block displays the site navigation with multi-level dropdowns, hamburger menu for mobile, and brand logo.

## Features

- Responsive navigation
- Multi-level dropdown menus
- Mobile hamburger menu
- Brand logo/link
- Keyboard accessible
- Language switcher support

## How It Works

The header block loads navigation from a separate `/nav` document (fragment). This allows you to:
- Update navigation without editing the header block
- Reuse the same navigation across all pages
- Manage hierarchy in a single place

## Navigation Structure

Create a document named `nav` in your Drive folder with this structure:

### Example Nav Document

```
Acerbis
  Chi siamo
  R&D e Qualità
  Sostenibilità

Settori
  Motorcycle
  Agricoltura
  Movimento terra
  Material handling
  Altri settori

Tecnologie
  Stampaggio rotazionale
  Stampaggio a iniezione

Engineering
  Project Management
  Engineering Capability

Lavora con noi
Contatti
```

## Authoring the Nav Document

1. Create a new Google Doc named `nav`
2. Add your navigation items as a bulleted list
3. Use indentation for sub-items (dropdowns)
4. Save and share with helix@adobe.com

## Navigation Levels

- **Level 1**: Main menu items (Acerbis, Settori, Tecnologie, etc.)
- **Level 2**: Dropdown items (Chi siamo, Motorcycle, etc.)
- **Level 3+**: Further nesting (if needed)

## Desktop Behavior

- Horizontal menu bar
- Dropdowns appear on hover
- Keyboard navigation with arrow keys
- Focus management

## Mobile Behavior

- Hamburger menu icon (☰)
- Full-screen navigation drawer
- Tap to expand/collapse sections
- Swipe to close (optional)

## Styling

The header includes:
- Brand section (logo/home link)
- Navigation sections (main menu)
- Tools section (optional utilities)

## Customization

### Add a Language Switcher

Add a language switcher in the "Tools" section of your nav document:

```
[Tools Section]
  English
  Italiano
```

### Add Social Links

Add social links in the tools section:

```
[Tools Section]
  LinkedIn
  Facebook
  Twitter
```

## Accessibility

- ARIA labels for all interactive elements
- Keyboard navigation (Tab, Enter, Escape)
- Screen reader friendly
- Focus indicators

## Performance

- Navigation loaded as a fragment (cached)
- Minimal JavaScript
- CSS-based dropdowns
- No external dependencies
