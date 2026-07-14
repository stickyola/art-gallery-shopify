import React, { useState, useRef } from 'react';
import './ArtworkDetailView.css';

const ArtworkDetailView = ({ artwork, onBack }) => {
  const [selectedFraming, setSelectedFraming] = useState('none');
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  const framingOptions = [
    { id: 'none', name: 'No Frame', price: 0 },
    { id: 'black', name: 'Black Frame', price: 45 },
    { id: 'wood', name: 'Wood Frame', price: 65 },
  ];

  const handleAddToCart = async () => {
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
              properties: {
                Framing: selectedFraming,
              },
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

  const handleZoom = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    imageRef.current.style.transformOrigin = `${(x / rect.width) * 100}% ${
      (y / rect.height) * 100
    }%`;
  };

  const calculateTotalPrice = () => {
    const basePrice = Number(artwork.variants[0].price);
    const framingPrice =
      framingOptions.find((opt) => opt.id === selectedFraming)?.price || 0;
    return (basePrice + framingPrice).toFixed(2);
  };

  return (
    <div className="artwork-detail-view">
      {/* Header */}
      <header className="detail-header">
        <button className="back-button" onClick={onBack} aria-label="Back">
          ← Back
        </button>
        <h1>{artwork.title}</h1>
        <div className="header-spacer"></div>
      </header>

      <div className="detail-container">
        {/* Left Column - Image Section */}
        <div className="detail-image-section">
          <div
            className="zoom-container"
            ref={containerRef}
            onMouseMove={handleZoom}
          >
            <img
              ref={imageRef}
              src={artwork.featured_image.src}
              alt={artwork.title}
              className="detail-image"
              style={{
                transform: `scale(${zoomLevel})`,
              }}
            />
          </div>

          <div className="zoom-controls">
            <button
              className="zoom-btn"
              onClick={() => setZoomLevel(Math.max(1, zoomLevel - 0.2))}
              disabled={zoomLevel <= 1}
              aria-label="Zoom out"
            >
              −
            </button>
            <span className="zoom-level">{Math.round(zoomLevel * 100)}%</span>
            <button
              className="zoom-btn"
              onClick={() => setZoomLevel(Math.min(3, zoomLevel + 0.2))}
              disabled={zoomLevel >= 3}
              aria-label="Zoom in"
            >
              +
            </button>
            <button
              className="zoom-btn reset"
              onClick={() => setZoomLevel(1)}
              aria-label="Reset zoom"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Right Column - Details Section */}
        <div className="detail-info-section">
          {/* Title and Type Badge */}
          <div className="detail-header-info">
            <h2 className="detail-title">{artwork.title}</h2>
            <span className="detail-type-badge">
              {artwork.metafields?.artwork_type === 'original'
                ? 'Original'
                : 'Digital Print'}
            </span>
          </div>

          {/* Pricing */}
          <div className="pricing-section">
            <div className="price-display">
              <span className="label">Base Price</span>
              <span className="price">
                ${Number(artwork.variants[0].price).toFixed(2)}
              </span>
            </div>

            {selectedFraming !== 'none' && (
              <div className="framing-price">
                <span className="label">+ Framing</span>
                <span className="price">
                  $
                  {framingOptions
                    .find((opt) => opt.id === selectedFraming)
                    ?.price.toFixed(2)}
                </span>
              </div>
            )}

            <div className="total-price">
              <span className="label">Total</span>
              <span className="price">${calculateTotalPrice()}</span>
            </div>
          </div>

          {/* Quick Details */}
          <div className="quick-details">
            {artwork.metafields?.dimensions && (
              <div className="detail-item">
                <span className="detail-label">Dimensions:</span>
                <span className="detail-value">
                  {artwork.metafields.dimensions}
                </span>
              </div>
            )}

            {artwork.metafields?.medium && (
              <div className="detail-item">
                <span className="detail-label">Medium:</span>
                <span className="detail-value">{artwork.metafields.medium}</span>
              </div>
            )}

            {artwork.metafields?.year && (
              <div className="detail-item">
                <span className="detail-label">Year:</span>
                <span className="detail-value">{artwork.metafields.year}</span>
              </div>
            )}
          </div>

          {/* Framing Options */}
          <div className="framing-section">
            <h3 className="section-title">Framing Options</h3>
            <div className="framing-options">
              {framingOptions.map((option) => (
                <label
                  key={option.id}
                  className={`framing-option ${
                    selectedFraming === option.id ? 'selected' : ''
                  }`}
                >
                  <input
                    type="radio"
                    name="framing"
                    value={option.id}
                    checked={selectedFraming === option.id}
                    onChange={(e) => setSelectedFraming(e.target.value)}
                  />
                  <span className="option-name">{option.name}</span>
                  {option.price > 0 && (
                    <span className="option-price">+${option.price}</span>
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* Description Dropdown */}
          <div className="description-section">
            <button
              className="description-toggle"
              onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
              aria-expanded={isDescriptionOpen}
            >
              <span>Artwork Details</span>
              <span className={`arrow ${isDescriptionOpen ? 'open' : ''}`}>
                ▼
              </span>
            </button>

            {isDescriptionOpen && (
              <div className="description-content">
                <p>{artwork.body_html || artwork.description}</p>
                {artwork.metafields?.artist_statement && (
                  <div className="artist-statement">
                    <h4>Artist Statement</h4>
                    <p>{artwork.metafields.artist_statement}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Checkout Button */}
          <button
            className="checkout-button"
            onClick={handleAddToCart}
            aria-label="Add to cart and checkout"
          >
            <span className="button-text">Add to Cart</span>
            <span className="button-price">${calculateTotalPrice()}</span>
          </button>

          {/* Additional Info */}
          <div className="additional-info">
            <p>🚚 Free shipping on orders over $100</p>
            <p>✓ Secure checkout with Shopify</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetailView;
