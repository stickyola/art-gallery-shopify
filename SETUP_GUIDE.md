# Art Gallery Shopify Theme - Complete Setup Guide

## Step 1: Prepare Your Development Environment

### Install Required Tools

**Node.js & npm:**
- Download from [nodejs.org](https://nodejs.org)
- Verify installation:
  ```bash
  node --version
  npm --version
  ```

**Shopify CLI:**
```bash
npm install -g @shopify/cli@latest
```

Verify:
```bash
shopify --version
```

## Step 2: Create Shopify Development Store

1. Go to [partner.shopify.com](https://partner.shopify.com)
2. Create a Partner account if you don't have one
3. Click "Create app"
4. Create a "Custom app" for testing
5. In the app settings, enable "Development store" access
6. Create a development store
7. Get your store URL: `your-store-name.myshopify.com`

## Step 3: Clone and Setup the Repository

```bash
# Clone the repository
git clone https://github.com/stickyola/art-gallery-shopify.git
cd art-gallery-shopify

# Install dependencies
npm install
```

## Step 4: Authenticate with Shopify

```bash
shopify auth login
```

Select your development store when prompted.

## Step 5: Set Up Metafields

### Via Shopify Admin:

1. Go to your development store admin
2. Navigate to **Settings** → **Metafields**
3. Click **Create definition** for each metafield:

#### Metafield 1: Artwork Type
- **Namespace:** `custom`
- **Key:** `artwork_type`
- **Type:** Single line text
- **Display name:** Artwork Type
- **Visible to:** Admin

#### Metafield 2: Dimensions
- **Namespace:** `custom`
- **Key:** `dimensions`
- **Type:** Single line text
- **Display name:** Dimensions
- **Visible to:** Admin

#### Metafield 3: Medium
- **Namespace:** `custom`
- **Key:** `medium`
- **Type:** Single line text
- **Display name:** Medium
- **Visible to:** Admin

#### Metafield 4: Year
- **Namespace:** `custom`
- **Key:** `year`
- **Type:** Single line text
- **Display name:** Year
- **Visible to:** Admin

#### Metafield 5: Artist Statement
- **Namespace:** `custom`
- **Key:** `artist_statement`
- **Type:** Multi-line text
- **Display name:** Artist Statement
- **Visible to:** Admin

## Step 6: Add Sample Products

1. Go to **Products** in your Shopify admin
2. Click **Create product**
3. Add product details:
   - **Title:** (e.g., "Abstract Landscape No. 1")
   - **Description:** Add artwork description
   - **Image:** Upload a high-quality image
   - **Price:** Set your price

4. Under **Metafields**, fill in:
   - **Artwork Type:** "original" or "Digital Print"
   - **Dimensions:** (e.g., "24" x 36"")
   - **Medium:** (e.g., "Oil on canvas")
   - **Year:** (e.g., "2024")
   - **Artist Statement:** Your artist statement

5. Click **Save**

## Step 7: Start Development Server

```bash
# Start the development server
npm run dev

# In another terminal, run Shopify theme dev
shopify theme dev --store=your-store-name.myshopify.com
```

Access your theme at: `https://your-store-name.myshopify.com?preview_theme_id=YOUR_THEME_ID`

## Step 8: Build for Production

```bash
# Build the production version
npm run build
```

## Step 9: Deploy to Shopify

### Option A: Push Theme to Shopify

```bash
shopify theme push --store=your-store-name.myshopify.com
```

### Option B: Use Development Mode

```bash
npm run shopify:dev
```

This will auto-update the theme as you make changes.

## Troubleshooting

### Issue: "Store not found"
**Solution:** Make sure you're authenticated and using the correct store domain:
```bash
shopify auth logout
shopify auth login
```

### Issue: Images not loading
**Solution:** Make sure images are uploaded as Shopify product images, not external URLs.

### Issue: Metafields not showing
**Solution:** 
- Verify metafield definitions exist in Shopify admin
- Make sure products have values filled in for metafields
- Hard refresh the page (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)

### Issue: Cart not working
**Solution:** Ensure you're using a Shopify development store, not a regular store.

## Environment Variables

Create a `.env.local` file for local development:

```
VITE_SHOPIFY_STORE_DOMAIN=your-store-name.myshopify.com
VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-token
```

## Customization Tips

### Change Colors
Edit `src/App.css` and component CSS files:
- Primary: `#1a1a1a`
- Background: `#fafafa`
- Borders: `#f0f0f0`

### Adjust Grid Layout
In `src/components/ArtGallery.css`:
```css
.gallery-grid {
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}
```
Change `300px` to adjust card width.

### Modify Framing Options
In `src/components/ArtworkDetailView.jsx`, update the `framingOptions` array:
```javascript
const framingOptions = [
  { id: 'none', name: 'No Frame', price: 0 },
  // Add more options here
];
```

## Next Steps

1. **Add More Products:** Add 5-10 sample artworks
2. **Customize Colors:** Adjust the color scheme to match your brand
3. **Configure Shipping:** Set up shipping rates in Shopify
4. **Enable Payments:** Add payment gateways in Settings
5. **Test Checkout:** Complete a test purchase
6. **Launch:** Deploy to production when ready

## Resources

- [Shopify CLI Documentation](https://shopify.dev/docs/cli)
- [Shopify API Reference](https://shopify.dev/docs/api)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)

## Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review Shopify CLI logs: `shopify theme dev --store=... --debug`
3. Check browser console for JavaScript errors
4. Review network tab for API issues

Good luck with your art gallery theme! 🎨
