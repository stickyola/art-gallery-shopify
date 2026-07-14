import React, { useState, useEffect } from 'react';
import './ArtGallery.css';

const ArtGallery = ({ onSelectArt }) => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch products from Shopify
    fetchArtworks();
  }, []);

  const fetchArtworks = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setArtworks(data.products);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching artworks:', error);
      setLoading(false);
    }
  };

  const handleAddToCart = async (artwork, e) => {
    e.stopPropagation();
    try {
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [
            {
              id: artwork.variants[0].id,
              quantity: 1,
            },
          ],
        }),
      });
      
      if (response.ok) {
        showNotification('Added to cart!');
        updateCartCount();
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const showNotification = (message) => {
    window.dispatchEvent(
      new CustomEvent('notification', { detail: { message } })
    );
  };

  const updateCartCount = async () => {
    try {
      const response = await fetch('/cart.js');
      const cart = await response.json();
      window.dispatchEvent(
        new CustomEvent('cartUpdated', { detail: { cart } })
      );
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  if (loading) {
    return <div className="gallery-loader">Loading artworks...</div>;
  }

  return (
    <div className="art-gallery-container">
      <header className="gallery-header">
        <h1>Art Gallery</h1>
        <p>Curated collection of original and digital art</p>
      </header>

      <div className="gallery-grid">
        {artworks.map((artwork) => (
          <div
            key={artwork.id}
            className="art-card"
            onClick={() => onSelectArt(artwork)}
          >
            {/* Image Container */}
            <div className="card-image-wrapper">
              <img
                src={artwork.featured_image.src}
                alt={artwork.title}
                className="card-image"
                loading="lazy"
              />

              {/* Type Badge - Shows on Hover */}
              <div className="type-badge">
                <span className="badge-text">
                  {artwork.metafields?.artwork_type === 'original'
                    ? 'Original'
                    : 'Digital Print'}
                </span>
              </div>

              {/* Quick Add Button */}
              <button
                className="quick-add-btn"
                onClick={(e) => handleAddToCart(artwork, e)}
                aria-label={`Add ${artwork.title} to cart`}
              >
                Add to Cart
              </button>
            </div>

            {/* Card Content */}
            <div className="card-content">
              <h3 className="card-title">{artwork.title}</h3>

              <div className="card-meta">
                {artwork.metafields?.dimensions && (
                  <p className="meta-item">
                    <span className="meta-label">Dimensions:</span>{' '}
                    {artwork.metafields.dimensions}
                  </p>
                )}

                {artwork.metafields?.medium && (
                  <p className="meta-item">
                    <span className="meta-label">Medium:</span>{' '}
                    {artwork.metafields.medium}
                  </p>
                )}
              </div>

              <div className="card-footer">
                <span className="price">
                  ${Number(artwork.variants[0].price).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtGallery;
