# Footer Block

The Footer block displays site footer content including links, copyright, and legal information.

## Features

- Multi-column footer layout
- Link organization
- Copyright and legal info
- Responsive design
- Loaded from separate fragment

## How It Works

The footer block loads content from a separate `/footer` document (fragment). This allows you to:
- Update footer without editing the footer block
- Maintain consistent footer across all pages
- Manage footer links in one place

## Footer Structure

Create a document named `footer` in your Drive folder with this structure:

### Example Footer Document

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

© 2024 Acerbis Italia SPA | Privacy Policy | Cookie Policy | Contact Us
```

## Authoring the Footer Document

1. Create a new Google Doc named `footer`
2. Organize content into sections (bulleted lists)
3. Add copyright and legal text at the end
4. Save and share with helix@adobe.com

## Footer Sections

Typical footer sections for Acerbis:

- **Company**: Chi siamo, R&D, Sostenibilità
- **Sectors**: Motorcycle, Agricoltura, etc.
- **Technologies**: Stampaggio rotazionale, Injection molding
- **Engineering**: Project Management, Engineering Capability
- **Legal**: Copyright, Privacy, Cookies, Contact

## Desktop Behavior

- Multi-column layout (typically 4-5 columns)
- Links organized by section
- Copyright bar at bottom

## Mobile Behavior

- Single column layout
- Collapsible sections (optional)
- Full-width copyright bar

## Styling

Footer includes:
- Section headings (bold)
- Links (blue, underline on hover)
- Copyright text (small, gray)
- Dividers between sections

## Customization

### Add Social Links

Add a "Follow Us" section:

```
Follow Us
  LinkedIn
  Facebook
  Twitter
  Instagram
```

### Add Newsletter Signup

Add a newsletter section:

```
Newsletter
  Subscribe to our updates
  [Email input]
```

### Add Contact Info

Add contact details:

```
Contact
  Email: info@acerbis.com
  Phone: +39 XXX XXX XXXX
  Address: Bergamo, Italy
```

## Performance

- Footer loaded as a fragment (cached)
- Minimal JavaScript
- CSS-based layout
- No external dependencies

## Accessibility

- Semantic HTML structure
- Proper heading hierarchy
- Keyboard navigation
- Link text is descriptive
