# Art Gallery Shopify Theme

A clean, minimalist Shopify theme for displaying and selling art with React components. Features a responsive gallery view and detailed artwork viewer with zoom capabilities.

## Features

### 🎨 Gallery View
- Minimalist grid layout with plenty of whitespace
- Hover effects showing artwork type (Original/Digital Print)
- Quick "Add to Cart" buttons
- Lazy loading images for performance
- Responsive grid that adapts to screen size
- Smooth animations and transitions

### 🖼️ Detailed Artwork View
- High-quality image zoom (1x - 3x magnification)
- Mouse-following zoom origin
- Detailed artwork information:
  - Dimensions
  - Medium
  - Year created
  - Artist statement
- Expandable description dropdown
- Multiple framing options (None, Black, Wood) with pricing
- Live price calculation based on selections
- High-visibility checkout button

### 📱 Responsive Design
- Desktop-optimized layouts
- Tablet-friendly interface
- Mobile-optimized experience
- Touch-friendly controls

## Installation

### Prerequisites
- Node.js 14+ and npm
- Shopify CLI (v3+)
- A Shopify development store

### Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Authenticate with Shopify:**
   ```bash
   shopify auth login
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## Shopify Integration

### Product Metafields Setup

Create the following metafields in your Shopify admin:

| Namespace | Key | Type | Display Name |
|-----------|-----|------|---------------|
| custom | artwork_type | single_line_text | Artwork Type |
| custom | dimensions | single_line_text | Dimensions |
| custom | medium | single_line_text | Medium |
| custom | year | single_line_text | Year |
| custom | artist_statement | multi_line_text | Artist Statement |

### Deploying to Shopify

1. **Build the theme:**
   ```bash
   npm run build
   ```

2. **Push to Shopify:**
   ```bash
   npm run shopify:push
   ```

3. **Or use development mode:**
   ```bash
   npm run shopify:dev
   ```

## Project Structure

```
art-gallery-shopify/
├── src/
│   ├── components/
│   │   ├── ArtGallery.jsx          # Gallery grid component
│   │   ├── ArtGallery.css          # Gallery styles
│   │   ├── ArtworkDetailView.jsx   # Detail view component
│   │   └── ArtworkDetailView.css   # Detail view styles
│   ├── App.jsx                     # Main app component
│   └── App.css                     # Global styles
├── vite.config.js                  # Vite configuration
├── package.json                    # Dependencies
└── theme.toml                      # Shopify theme config
```

## Customization

### Colors
Edit the CSS files to customize:
- Primary color: `#1a1a1a` (dark black)
- Secondary background: `#fafafa` (light gray)
- Accent borders: `#f0f0f0` (subtle gray)

### Typography
Default font stack uses system fonts for optimal performance:
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', ...
```

### Grid Layout
Adjust gallery grid columns in `ArtGallery.css`:
```css
.gallery-grid {
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  /* Change minmax value to adjust card width */
}
```

## API Integration

### Fetching Products
The gallery automatically fetches products from:
```
GET /api/products
```

### Adding to Cart
Cart operations use Shopify's standard endpoints:
```
POST /cart/add.js
GET /cart.js
```

### Event Handling
Custom events are dispatched for:
- `notification` - Display toast messages
- `cartUpdated` - Update cart UI

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Lazy loading for images
- Optimized CSS with minimal specificity
- Efficient React component re-renders
- Minified production builds

## License

MIT License - Feel free to use and modify

## Support

For issues or questions, please open a GitHub issue or contact support.
