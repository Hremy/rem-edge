# Hero Block

The Hero block creates a full-width hero section with a background image, headline, text, optional video embed, and call-to-action button.

## Features

- Full-width background image with responsive optimization
- Headline and descriptive text
- Call-to-action button
- Optional video embed (YouTube or Vimeo)
- Dark and light variations
- Mobile-responsive design

## Authoring in Google Docs

### Basic Hero (Image + Headline + Text + CTA)

1. Insert a table with 2 rows and 1 column
2. **Row 1**: Add your background image
3. **Row 2**: Add:
   - H1 or H2 heading (becomes the hero title)
   - Paragraph text
   - Link (becomes CTA button)

### Example Structure

| Image |
|-------|
| # Welcome to Acerbis OEM |
| Innovative solutions for industrial partners worldwide. |
| [Learn More](https://example.com) |

### With Video Embed

Replace the link with a YouTube or Vimeo URL:

| Image |
|-------|
| # Watch Our Story |
| Discover how we innovate. |
| [https://www.youtube.com/watch?v=VIDEO_ID](https://www.youtube.com/watch?v=VIDEO_ID) |

## CSS Variations

Add these classes to the block for different styles:

### `.dark` (default)
- Dark semi-transparent overlay
- White text
- Blue CTA button

### `.light`
- Light semi-transparent overlay
- Dark text
- Dark CTA button

**Usage in Docs**: Add the class name in a separate row or use Sidekick to add it to the block.

## Performance

- Images are automatically optimized with responsive sizes (1920px, 1200px, 768px)
- Lazy loading enabled by default
- Video embeds use privacy-focused YouTube (youtube-nocookie.com)

## Responsive Behavior

- Desktop: 400px minimum height
- Tablet (≤768px): 300px minimum height
- Mobile (≤480px): 250px minimum height

Text sizes scale appropriately for each breakpoint.
