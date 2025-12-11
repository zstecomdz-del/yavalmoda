import { useState, useRef } from 'react'
import './App.css'
import OrderForm from './components/OrderForm'
import LanguageSwitcher from './components/LanguageSwitcher'
import { useLanguage } from './i18n/LanguageContext'

// Product colors with their images
const colors = [
  { id: 'black', name: 'Black', hex: '#1a1a1a', image: '/images/black.png' },
  { id: 'grey', name: 'Grey', hex: '#6b6b6b', image: '/images/grey.png' },
  { id: 'blue', name: 'Navy Blue', hex: '#1e3a5f', image: '/images/blue.png' },
]

// Extra gallery images
const galleryImages = [
  '/images/hoodie.jpeg',
  '/images/pants.jpeg',
  '/images/combined.jpeg',
]

// Available sizes
const sizes = ['S', 'M', 'L', 'XL', 'XXL']

// WhatsApp configuration
const WHATSAPP_NUMBER = '213798700447'

function App() {
  const { language, t } = useLanguage()
  const [selectedColor, setSelectedColor] = useState(colors[0])
  const [selectedSize, setSelectedSize] = useState('M')
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [selectedGalleryImage, setSelectedGalleryImage] = useState(null)
  const videoRef = useRef(null)

  // Get the current main image (either selected gallery image or color image)
  const currentMainImage = selectedGalleryImage || selectedColor.image

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

  return (
    <div dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Announcement Bar */}
      <div className="announcement-bar">
        <span>{t('announcement')}</span>
      </div>

      {/* Header */}
      <header className="header">
        <div className="header-logo">
          <img src="/images/logo.jpeg" alt="YA VALMODA" />
        </div>
        <LanguageSwitcher />
        <nav className="header-nav">
          <a href="#collection">{t('nav.collection')}</a>
          <a href="#about">{t('nav.about')}</a>
          <a href="#contact">{t('nav.contact')}</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-tagline">{t('hero.tagline')}</span>
          <h1 className="hero-title">
            <em>{t('hero.title.part2')}</em>
          </h1>
          <p className="hero-subtitle">
            {t('hero.subtitle')}
          </p>
          <a href="#collection" className="hero-cta">
            <span>{t('hero.cta')}</span>
          </a>
        </div>
        <div className="hero-image">
          <img src="/images/all-colors.png" alt="YA VALMODA Collection" />
          <div className="hero-image-overlay">
            <span>3,900 {t('product.priceCurrency')}</span>
          </div>
        </div>
      </section>

      {/* Video Showcase Section */}
      <section className="video-section">
        <div className="video-container">
          <div className="video-content">
            <span className="video-tagline">{t('video.tagline')}</span>
            <h2 className="video-title">{t('video.title.part1')} <em>{t('video.title.part2')}</em></h2>
            <p className="video-description">
              {t('video.description')}
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
                  <span>{t('video.play')}</span>
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
              {/* Color thumbnails */}
              {colors.map((color) => (
                <button
                  key={color.id}
                  className={`gallery-thumb ${selectedColor.id === color.id && !selectedGalleryImage ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedColor(color)
                    setSelectedGalleryImage(null)
                  }}
                >
                  <img src={color.image} alt={color.name} />
                </button>
              ))}
              {/* Extra gallery images */}
              {galleryImages.map((img, index) => (
                <button
                  key={`gallery-${index}`}
                  className={`gallery-thumb ${selectedGalleryImage === img ? 'active' : ''}`}
                  onClick={() => setSelectedGalleryImage(img)}
                >
                  <img src={img} alt={`Product view ${index + 1}`} />
                </button>
              ))}
            </div>
            <div className="gallery-main">
              <img
                src={currentMainImage}
                alt={selectedColor.name}
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="product-details">
            <span className="product-label">{t('product.label')}</span>
            <h2 className="product-name">{t('product.name')}</h2>
            <p className="product-description">
              {t('product.description')}
            </p>

            <div className="product-price">
              <span className="price-old">{t('product.priceOld')}</span>
              <span className="price-amount">{t('product.priceNew')}</span>
              <span className="price-currency">{t('product.priceCurrency')}</span>
              <span className="price-note">{t('product.priceNote')}</span>
            </div>

            {/* Color Selector */}
            <div className="color-selector">
              <span className="color-label">
                {t('product.colorLabel')} <strong>{t(`product.colors.${selectedColor.id}`)}</strong>
              </span>
              <div className="color-options">
                {colors.map((color) => (
                  <button
                    key={color.id}
                    className={`color-btn ${selectedColor.id === color.id ? 'active' : ''}`}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => setSelectedColor(color)}
                    title={t(`product.colors.${color.id}`)}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="size-selector">
              <span className="size-label">{t('product.sizeLabel')}</span>
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

            {/* Order Form - Integrated */}
            <OrderForm inline={true} selectedColor={selectedColor} selectedSize={selectedSize} />

          </div>
        </div>
      </section>

      {/* Color Showcase Section */}
      <section className="colors-showcase">
        <div className="colors-header">
          <span className="colors-tagline">{t('colorsShowcase.tagline')}</span>
          <h2 className="colors-title">{t('colorsShowcase.title.part1')} <em>{t('colorsShowcase.title.part2')}</em> {t('colorsShowcase.title.part3')}</h2>
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
                <img src={color.image} alt={t(`product.colors.${color.id}`)} />
              </div>
              <div className="color-card-info">
                <span
                  className="color-card-swatch"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="color-card-name">{t(`product.colors.${color.id}`)}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="about">
        <div className="features-header">
          <h2 className="features-title">{t('features.title')}</h2>
          <p className="features-subtitle">{t('features.subtitle')}</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-number">{t('features.feature1.number')}</div>
            <h3 className="feature-title">{t('features.feature1.title')}</h3>
            <p className="feature-text">
              {t('features.feature1.text')}
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-number">{t('features.feature2.number')}</div>
            <h3 className="feature-title">{t('features.feature2.title')}</h3>
            <p className="feature-text">
              {t('features.feature2.text')}
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-number">{t('features.feature3.number')}</div>
            <h3 className="feature-title">{t('features.feature3.title')}</h3>
            <p className="feature-text">
              {t('features.feature3.text')}
            </p>
          </div>
        </div>
      </section>

      {/* Lookbook Marquee */}
      <section className="lookbook-section">
        <div className="lookbook-marquee">
          <span className="lookbook-text">{t('lookbook.brand')}</span>
          <span className="lookbook-text">{t('lookbook.tagline')}</span>
          <span className="lookbook-text">{t('lookbook.category')}</span>
          <span className="lookbook-text">{t('lookbook.brand')}</span>
          <span className="lookbook-text">{t('lookbook.tagline')}</span>
          <span className="lookbook-text">{t('lookbook.category')}</span>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" id="contact">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">{t('footer.brand')}</div>
            <p className="footer-tagline">
              {t('footer.tagline')}
            </p>
          </div>
          <div className="footer-column">
            <h4>{t('footer.quickLinks')}</h4>
            <ul>
              <li><a href="#collection">{t('nav.collection')}</a></li>
              <li><a href="#about">{t('nav.about')}</a></li>
              <li><a href="#contact">{t('nav.contact')}</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>{t('footer.contact')}</h4>
            <ul>
              <li><a href={`https://wa.me/${WHATSAPP_NUMBER}`}>{t('footer.whatsapp')}</a></li>
              <li><a href="#">{t('footer.algeria')}</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; {t('footer.copyright')}
          </p>
          <a href="https://www.sitedz.store" target="_blank" rel="noopener noreferrer" className="dev-signature">
            {t('footer.craftedBy')}
          </a>
        </div>
      </footer>
    </div>
  )
}

export default App
