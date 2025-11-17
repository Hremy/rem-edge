# Cards Block

The Cards block displays a responsive grid of cards, each with an image, title, description, and optional link.

## Features

- Responsive grid layout (auto-fill with minimum 280px width)
- Image optimization and lazy loading
- Hover effects (shadow and scale)
- Multiple grid variations (2-column, 3-column, 4-column, 5-column)
- Mobile-responsive design

## Authoring in Google Docs

### Basic Card Structure

1. Insert a table with **N rows** and **2 columns**
2. **Column 1**: Image
3. **Column 2**: Content (heading, description, optional link)

### Example: Technology Cards (2-column)

| Image | Content |
|-------|---------|
| [Rotomolding Image] | **Rotomolding** Complex shapes, high performance |
| [Injection Molding Image] | **Injection Molding** High volume, precision |

### Example: Sector Cards (5-column grid)

| Image | Content |
|-------|---------|
| [Motorcycle] | **Motorcycle** |
| [Agriculture] | **Agriculture** |
| [Earthmoving] | **Earthmoving** |
| [Material Handling] | **Material Handling** |
| [Other Sectors] | **Other Sectors** |

## Grid Variations

Add one of these classes to the block to control the grid layout:

### Default (Auto-fill)
- Automatically fills available space
- Minimum card width: 280px

### `.two-column`
- 2 columns on desktop
- 1 column on mobile

### `.three-column`
- 3 columns on desktop
- 2 columns on tablet
- 1 column on mobile

### `.four-column`
- 4 columns on desktop
- 2 columns on tablet
- 1 column on mobile

### `.five-column`
- 5 columns on desktop
- 2 columns on tablet
- 1 column on mobile

**Usage**: Add the class via Sidekick or in the block metadata.

## Card Content

Each card can contain:

- **Heading** (H2 or H3)
- **Paragraph** text
- **Link** (optional, styled as blue link)

### Example Card Content

```
Rotomolding

For complex shapes and high-performance requirements.

Learn More
```

## Performance

- Images optimized at 750px, 500px, 300px widths
- Lazy loading enabled
- Hover effects use CSS transforms (GPU-accelerated)

## Responsive Behavior

- Desktop: 280px minimum card width
- Tablet (≤768px): 200px minimum card width, 2-column grid
- Mobile (≤480px): Full-width, single column

## Styling

Cards include:
- 1px border (#e0e0e0)
- 4px border-radius
- Hover shadow and lift effect
- Image zoom on hover (1.05x scale)
