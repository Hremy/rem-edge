# Phase 1: Core Blocks Implementation Guide

## Overview

Phase 1 establishes the foundation for the Acerbis OEM website using Edge Delivery Services. This phase includes 5 core blocks that cover 80% of page layouts.

## Core Blocks

### 1. **Hero Block** (`blocks/hero/`)
- Full-width hero section with background image
- Headline, text, CTA button
- Optional video embed (YouTube/Vimeo)
- Dark/light variations
- **Use cases**: Homepage hero, section headers, landing pages

### 2. **Cards Block** (`blocks/cards/`)
- Responsive grid of cards
- Image, title, description, link per card
- Grid variations: 2-column, 3-column, 4-column, 5-column
- Hover effects (shadow, scale)
- **Use cases**: Technology showcase, sector cards, feature cards, team members

### 3. **Columns Block** (`blocks/columns/`)
- 2-3+ column layouts
- Image + text side-by-side
- Responsive stacking on mobile
- **Use cases**: Company description, features, testimonials, comparisons

### 4. **Header Block** (`blocks/header/`)
- Navigation with multi-level dropdowns
- Mobile hamburger menu
- Brand logo/link
- Keyboard accessible
- **Loaded from**: `/nav` document fragment

### 5. **Footer Block** (`blocks/footer/`)
- Multi-column footer layout
- Links, copyright, legal info
- Responsive design
- **Loaded from**: `/footer` document fragment

---

## Quick Start

### Step 1: Create Navigation Document

1. In your Google Drive folder, create a new Doc named `nav`
2. Add your navigation structure:

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

3. Share with helix@adobe.com (Editor)
4. Publish via Sidekick

### Step 2: Create Footer Document

1. In your Google Drive folder, create a new Doc named `footer`
2. Add your footer content (same structure as nav)
3. Share with helix@adobe.com (Editor)
4. Publish via Sidekick

### Step 3: Create Homepage

1. Create a new Google Doc named `index` in your Drive folder
2. Add metadata table at the end:

| Title | Home |
|-------|------|
| Description | Acerbis OEM - Innovative Solutions |

3. Build the page using blocks (see examples below)

---

## Block Usage Examples

### Hero Block Example

**Google Docs Table Structure:**

| Image | Content |
|-------|---------|
| [Background Image] | # Welcome to Acerbis OEM |
| | Innovative solutions for industrial partners worldwide. |
| | [Learn More](https://example.com) |

**With Video:**

| Image | Content |
|-------|---------|
| [Background Image] | # Watch Our Story |
| | [https://www.youtube.com/watch?v=VIDEO_ID](https://www.youtube.com/watch?v=VIDEO_ID) |

**Variations:**
- Add class `dark` or `light` to the block for different overlays

---

### Cards Block Example

**Google Docs Table Structure (5-column grid):**

| Image | Content |
|-------|---------|
| [Motorcycle] | **Motorcycle** |
| [Agriculture] | **Agricoltura** |
| [Earthmoving] | **Movimento terra** |
| [Material Handling] | **Material handling** |
| [Other] | **Altri settori** |

**With Descriptions:**

| Image | Content |
|-------|---------|
| [Rotomolding] | **Rotomolding** Complex shapes, high performance. [Learn More](link) |
| [Injection] | **Injection Molding** High volume, precision. [Learn More](link) |

**Grid Variations:**
- Add class `two-column`, `three-column`, `four-column`, or `five-column`
- Default: auto-fill with 280px minimum width

---

### Columns Block Example

**Google Docs Table Structure:**

| Image | Content |
|-------|---------|
| [Company Image] | **About Acerbis** Founded in 1973, we've become a trusted partner... [Learn More](link) |

**Multiple Columns:**

| Image 1 | Image 2 | Image 3 |
|---------|---------|---------|
| [Img] | [Img] | [Img] |
| **Feature 1** | **Feature 2** | **Feature 3** |

---

## Homepage Template

Here's a complete homepage structure using Phase 1 blocks:

```
1. HERO BLOCK
   - Background image
   - "Welcome to Acerbis OEM"
   - "Innovative solutions for industrial partners"
   - CTA: "Discover Our Solutions"

2. INTRO COLUMNS
   - Company description + image
   - "From design to industrialization"

3. TECHNOLOGY CARDS (2-column)
   - Rotomolding card
   - Injection Molding card

4. SECTOR CARDS (5-column)
   - Motorcycle
   - Agricoltura
   - Movimento terra
   - Material handling
   - Altri settori

5. ENGINEERING CARDS (3-column)
   - Project Management
   - Engineering Capability
   - Quality Control

6. PA6 HIGHLIGHT (Columns)
   - PA6 Acerbis material showcase
   - Features + benefits
```

---

## Authoring Best Practices

### Images

- Use high-quality images (1920px+ width)
- Optimize file size (<500KB for web)
- Use descriptive alt text
- EDS automatically optimizes and lazy-loads

### Text

- Use H1 for hero titles
- Use H2/H3 for section headings
- Keep paragraphs concise (2-3 sentences)
- Use bullet points for lists

### Links

- Use descriptive link text ("Learn More" vs "Click Here")
- Links in cards become styled buttons
- Links in hero become CTAs

### Metadata

Always add metadata table at end of document:

| Title | Page Title |
|-------|-----------|
| Description | Page description for SEO |
| og:image | https://example.com/image.jpg |

---

## Testing & Deployment

### Local Testing

```bash
# Start local dev server
aem up

# Visit http://localhost:3000/
# Changes auto-refresh
```

### Preview

1. Open doc in Google Docs
2. Click Sidekick → Preview
3. View at https://main--rem-edge--hremy.hlx.page/

### Publish

1. Click Sidekick → Publish
2. Live at https://main--rem-edge--hremy.aem.live/

---

## Performance Optimization

### Eager-Lazy-Delayed Pattern

- **Eager**: Hero image, above-fold content
- **Lazy**: Cards, columns below fold
- **Delayed**: Analytics, non-essential scripts

### CSS Strategy

- `styles/styles.css`: Critical CSS (loaded immediately)
- `styles/lazy-styles.css`: Non-critical CSS (loaded after page interactive)

### Image Optimization

- Automatic responsive sizing (1920px, 1200px, 768px, 500px, 300px)
- WebP format for modern browsers
- Lazy loading by default

---

## Next Steps (Phase 2)

After Phase 1 is complete:

1. **Content Infrastructure**
   - Set up `nav.json` and `footer.json` sheets
   - Create `query-index` for page indexing
   - Configure redirects sheet

2. **Additional Blocks**
   - Image gallery
   - Video embed
   - Feature highlights
   - Testimonials

3. **Advanced Features**
   - Language switching (ITA/ENG)
   - Analytics integration
   - Custom headers (CSP, CORS)
   - Sitemap generation

---

## Resources

- **Block Documentation**: See README.md in each block folder
- **EDS Best Practices**: `/Developer Guide/` documents
- **GitHub Repo**: https://github.com/Hremy/rem-edge
- **Preview URL**: https://main--rem-edge--hremy.hlx.page/
- **Live URL**: https://main--rem-edge--hremy.aem.live/

---

## Support

For questions or issues:
1. Check block README.md files
2. Review EDS Developer Guide (Parts 0-11)
3. Test locally with `aem up`
4. Use Sidekick Preview for debugging
