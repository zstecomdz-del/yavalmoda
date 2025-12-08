import { useState, useRef } from 'react'
import './App.css'

// Product colors with their images
const colors = [
  { id: 'black', name: 'Black', hex: '#1a1a1a', image: '/images/black.png' },
  { id: 'grey', name: 'Grey', hex: '#6b6b6b', image: '/images/grey.png' },
  { id: 'blue', name: 'Navy Blue', hex: '#1e3a5f', image: '/images/blue.png' },
]

// Available sizes
const sizes = ['S', 'M', 'L', 'XL']

// WhatsApp configuration
const WHATSAPP_NUMBER = '213798700447'

function App() {
  const [selectedColor, setSelectedColor] = useState(colors[0])
  const [selectedSize, setSelectedSize] = useState('M')
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const videoRef = useRef(null)

  const handleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsVideoPlaying(!isVideoPlaying)
    }
  }

  const handleOrder = () => {
    const message = encodeURIComponent(
      `Hello YA VALMODA! I'd like to order:\n\n` +
      `Product: Premium Hoodie + Track Pants Pack\n` +
      `Color: ${selectedColor.name}\n` +
      `Size: ${selectedSize}\n` +
      `Price: 3,900 DA\n\n` +
      `Please confirm availability.`
    )
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank')
  }

  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="header-logo">
          <img src="/images/logo.jpeg" alt="YA VALMODA" />
        </div>
        <nav className="header-nav">
          <a href="#collection">Collection</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-tagline">New Arrival 2024</span>
          <h1 className="hero-title">
            Step Into<br /><em>Style</em>
          </h1>
          <p className="hero-subtitle">
            Elevate your wardrobe with our premium collection.
            Designed for the modern man who values comfort without
            compromising on style.
          </p>
          <a href="#collection" className="hero-cta">
            <span>Explore Collection</span>
          </a>
        </div>
        <div className="hero-image">
          <img src="/images/all-colors.png" alt="YA VALMODA Collection" />
          <div className="hero-image-overlay">
            <span>3,900 DA</span>
          </div>
        </div>
      </section>

      {/* Video Showcase Section */}
      <section className="video-section">
        <div className="video-container">
          <div className="video-content">
            <span className="video-tagline">See It In Action</span>
            <h2 className="video-title">Watch The <em>Collection</em></h2>
            <p className="video-description">
              Experience the quality and style of our premium collection in motion.
            </p>
          </div>
          <div className="video-wrapper" onClick={handleVideoPlay}>
            <video
              ref={videoRef}
              className="product-video"
              poster="/images/all-colors.png"
              playsInline
              loop
              onEnded={() => setIsVideoPlaying(false)}
            >
              <source src="/images/product-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {!isVideoPlaying && (
              <div className="video-play-overlay">
                <div className="play-button">
                  <span>PLAY</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section className="product-section" id="collection">
        <div className="product-container">
          {/* Product Gallery */}
          <div className="product-gallery">
            <div className="gallery-thumbnails">
              {colors.map((color) => (
                <button
                  key={color.id}
                  className={`gallery-thumb ${selectedColor.id === color.id ? 'active' : ''}`}
                  onClick={() => setSelectedColor(color)}
                >
                  <img src={color.image} alt={color.name} />
                </button>
              ))}
            </div>
            <div className="gallery-main">
              <img
                src={selectedColor.image}
                alt={selectedColor.name}
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="product-details">
            <span className="product-label">Full Pack</span>
            <h2 className="product-name">Premium Hoodie + Track Pants</h2>
            <p className="product-description">
              The perfect combination of style and comfort. Our premium
              color-block hoodie paired with sleek track pants featuring
              a signature white stripe. Crafted from high-quality materials
              for all-day comfort.
            </p>

            <div className="product-price">
              <span className="price-amount">3,900</span>
              <span className="price-currency">DA</span>
              <span className="price-note">Full Pack</span>
            </div>

            {/* Color Selector */}
            <div className="color-selector">
              <span className="color-label">
                Color: <strong>{selectedColor.name}</strong>
              </span>
              <div className="color-options">
                {colors.map((color) => (
                  <button
                    key={color.id}
                    className={`color-btn ${selectedColor.id === color.id ? 'active' : ''}`}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => setSelectedColor(color)}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="size-selector">
              <span className="size-label">Select Size</span>
              <div className="size-options">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Order Button */}
            <button className="order-btn" onClick={handleOrder}>
              Order via WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* Color Showcase Section */}
      <section className="colors-showcase">
        <div className="colors-header">
          <span className="colors-tagline">Available In</span>
          <h2 className="colors-title">Three <em>Classic</em> Colors</h2>
        </div>
        <div className="colors-grid">
          {colors.map((color) => (
            <div
              key={color.id}
              className="color-card"
              onClick={() => {
                setSelectedColor(color)
                document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              <div className="color-card-image">
                <img src={color.image} alt={color.name} />
              </div>
              <div className="color-card-info">
                <span
                  className="color-card-swatch"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="color-card-name">{color.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="about">
        <div className="features-header">
          <h2 className="features-title">Why Choose Us</h2>
          <p className="features-subtitle">Quality meets style in every piece</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-number">01</div>
            <h3 className="feature-title">Premium Quality</h3>
            <p className="feature-text">
              Crafted from the finest materials for durability and comfort
              that lasts through countless wears.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-number">02</div>
            <h3 className="feature-title">Modern Design</h3>
            <p className="feature-text">
              Contemporary aesthetics that blend seamlessly with your
              lifestyle. Timeless pieces for the modern man.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-number">03</div>
            <h3 className="feature-title">Perfect Fit</h3>
            <p className="feature-text">
              Carefully tailored to provide the ideal silhouette.
              Comfort and style in perfect harmony.
            </p>
          </div>
        </div>
      </section>

      {/* Lookbook Marquee */}
      <section className="lookbook-section">
        <div className="lookbook-marquee">
          <span className="lookbook-text">YA VALMODA</span>
          <span className="lookbook-text">STEP INTO STYLE</span>
          <span className="lookbook-text">MAN CLOTHES</span>
          <span className="lookbook-text">YA VALMODA</span>
          <span className="lookbook-text">STEP INTO STYLE</span>
          <span className="lookbook-text">MAN CLOTHES</span>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" id="contact">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">YA VALMODA</div>
            <p className="footer-tagline">
              Step into style with our premium men's collection.
              Quality craftsmanship meets contemporary design.
            </p>
          </div>
          <div className="footer-column">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#collection">Collection</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Contact</h4>
            <ul>
              <li><a href={`https://wa.me/${WHATSAPP_NUMBER}`}>WhatsApp</a></li>
              <li><a href="#">Algeria</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; 2024 YA VALMODA. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  )
}

export default App
