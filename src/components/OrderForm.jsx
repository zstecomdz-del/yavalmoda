import { useState } from 'react'
import './OrderForm.css'
import { useLanguage } from '../i18n/LanguageContext'

// 69 Wilayas of Algeria with delivery pricing
const wilayas = [
  { code: '01', name: 'Adrar', homeDelivery: 1450 },
  { code: '02', name: 'Chlef', homeDelivery: 800 },
  { code: '03', name: 'Laghouat', homeDelivery: 950 },
  { code: '04', name: 'Oum El Bouaghi', homeDelivery: 750 },
  { code: '05', name: 'Batna', homeDelivery: 800 },
  { code: '06', name: 'Béjaïa', homeDelivery: 800 },
  { code: '07', name: 'Biskra', homeDelivery: 800 },
  { code: '08', name: 'Béchar', homeDelivery: 1100 },
  { code: '09', name: 'Blida', homeDelivery: 750 },
  { code: '10', name: 'Bouira', homeDelivery: 500 },
  { code: '11', name: 'Tamanrasset', homeDelivery: 1600 },
  { code: '12', name: 'Tébessa', homeDelivery: 850 },
  { code: '13', name: 'Tlemcen', homeDelivery: 900 },
  { code: '14', name: 'Tiaret', homeDelivery: 800 },
  { code: '15', name: 'Tizi Ouzou', homeDelivery: 750 },
  { code: '16', name: 'Alger', homeDelivery: 750 },
  { code: '17', name: 'Djelfa', homeDelivery: 950 },
  { code: '18', name: 'Jijel', homeDelivery: 750 },
  { code: '19', name: 'Sétif', homeDelivery: 500 },
  { code: '20', name: 'Saïda', homeDelivery: 800 },
  { code: '21', name: 'Skikda', homeDelivery: 750 },
  { code: '22', name: 'Sidi Bel Abbès', homeDelivery: 800 },
  { code: '23', name: 'Annaba', homeDelivery: 800 },
  { code: '24', name: 'Guelma', homeDelivery: 750 },
  { code: '25', name: 'Constantine', homeDelivery: 750 },
  { code: '26', name: 'Médéa', homeDelivery: 800 },
  { code: '27', name: 'Mostaganem', homeDelivery: 800 },
  { code: '28', name: "M'Sila", homeDelivery: 850 },
  { code: '29', name: 'Mascara', homeDelivery: 800 },
  { code: '30', name: 'Ouargla', homeDelivery: 950 },
  { code: '31', name: 'Oran', homeDelivery: 800 },
  { code: '32', name: 'El Bayadh', homeDelivery: 1100 },
  { code: '33', name: 'Illizi', homeDelivery: null }, // Not served
  { code: '34', name: 'Bordj Bou Arréridj', homeDelivery: 600 },
  { code: '35', name: 'Boumerdès', homeDelivery: 750 },
  { code: '36', name: 'El Tarf', homeDelivery: 800 },
  { code: '37', name: 'Tindouf', homeDelivery: null }, // Not served
  { code: '38', name: 'Tissemsilt', homeDelivery: 800 },
  { code: '39', name: 'El Oued', homeDelivery: 950 },
  { code: '40', name: 'Khenchela', homeDelivery: 800 },
  { code: '41', name: 'Souk Ahras', homeDelivery: 750 },
  { code: '42', name: 'Tipaza', homeDelivery: 750 },
  { code: '43', name: 'Mila', homeDelivery: 750 },
  { code: '44', name: 'Aïn Defla', homeDelivery: 750 },
  { code: '45', name: 'Naâma', homeDelivery: 1100 },
  { code: '46', name: 'Aïn Témouchent', homeDelivery: 800 },
  { code: '47', name: 'Ghardaïa', homeDelivery: 950 },
  { code: '48', name: 'Relizane', homeDelivery: 800 },
  { code: '49', name: 'El M\'Ghair', homeDelivery: 950 },
  { code: '50', name: 'El Meniaa', homeDelivery: 1000 },
  { code: '51', name: 'Ouled Djellal', homeDelivery: 900 },
  { code: '52', name: 'Bordj Baji Mokhtar', homeDelivery: null }, // Not served
  { code: '53', name: 'Béni Abbès', homeDelivery: 1000 },
  { code: '54', name: 'Timimoun', homeDelivery: 1450 },
  { code: '55', name: 'Touggourt', homeDelivery: 950 },
  { code: '56', name: 'Djanet', homeDelivery: null }, // Not served
  { code: '57', name: 'In Salah', homeDelivery: 1600 },
  { code: '58', name: 'In Guezzam', homeDelivery: 1600 },
  { code: '59', name: 'Aflou', homeDelivery: 950 },
  { code: '60', name: 'Aïn Oussera', homeDelivery: 950 },
  { code: '61', name: 'Barika', homeDelivery: 800 },
  { code: '62', name: 'Bir el-Ater', homeDelivery: 850 },
  { code: '63', name: 'Bou Saâda', homeDelivery: 850 },
  { code: '64', name: 'El Abiodh Sidi Cheikh', homeDelivery: 1100 },
  { code: '65', name: 'El Aricha', homeDelivery: 1100 },
  { code: '66', name: 'El Kantara', homeDelivery: 800 },
  { code: '67', name: 'Ksar Chellala', homeDelivery: 800 },
  { code: '68', name: 'Ksar El Boukhari', homeDelivery: 800 },
  { code: '69', name: 'Messaad', homeDelivery: 950 },
]

// Helper function to calculate delivery cost
const calculateDeliveryCost = (wilayaCode, deliveryType) => {
  const wilaya = wilayas.find(w => w.code === wilayaCode)
  if (!wilaya || wilaya.homeDelivery === null) return null

  // Office delivery is 200 DA less than home delivery
  return deliveryType === 'home' ? wilaya.homeDelivery : wilaya.homeDelivery - 200
}

// Product colors
const productColors = [
  { id: 'black', name: 'Black', hex: '#1a1a1a' },
  { id: 'grey', name: 'Grey', hex: '#6b6b6b' },
  { id: 'blue', name: 'Navy Blue', hex: '#1e3a5f' },
]

// Google Apps Script Web App URL for email notifications
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz_7ppTaVPq5NSSwwX7xGAVPfBa7uNAotC39fNi9rmNElIZ80VXuK54DpTyLZjzz-uhBw/exec'

// Backup: WhatsApp number (optional - remove if only using email)
const WHATSAPP_NUMBER = '213671029839'

function OrderForm({ onClose, inline = false, selectedColor: externalColor, selectedSize: externalSize }) {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    wilaya: '',
    deliveryType: 'office',
    color: 'black',
    quantity: 1,
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error' | null

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleColorSelect = (colorId) => {
    setFormData(prev => ({ ...prev, color: colorId }))
  }

  const handleQuantityChange = (delta) => {
    setFormData(prev => ({
      ...prev,
      quantity: Math.max(1, Math.min(10, prev.quantity + delta))
    }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = t('orderForm.validation.nameRequired')
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t('orderForm.validation.phoneRequired')
    } else if (!/^(0|\+213)[567]\d{8}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = t('orderForm.validation.phoneInvalid')
    }

    if (!formData.wilaya) {
      newErrors.wilaya = t('orderForm.validation.wilayaRequired')
    } else {
      // Check if delivery is available for this wilaya
      const deliveryCost = calculateDeliveryCost(formData.wilaya, formData.deliveryType)
      if (deliveryCost === null) {
        newErrors.wilaya = t('orderForm.validation.wilayaUnavailable')
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitStatus(null)

    const selectedWilaya = wilayas.find(w => w.code === formData.wilaya)
    // Use external color/size when inline, otherwise use form's internal state
    const colorName = inline && externalColor ? t(`product.colors.${externalColor.id}`) : t(`product.colors.${formData.color}`)
    const sizeName = inline && externalSize ? externalSize : 'M'
    const quantity = inline ? 1 : formData.quantity
    const productTotal = 3900 * quantity
    const deliveryCost = calculateDeliveryCost(formData.wilaya, formData.deliveryType)
    const totalPrice = productTotal + deliveryCost
    const deliveryLabel = formData.deliveryType === 'office' ? t('orderForm.deliveryType.office.title') : t('orderForm.deliveryType.home.title')

    const orderData = {
      name: formData.name,
      phone: formData.phone,
      wilaya: `${selectedWilaya?.code} - ${selectedWilaya?.name}`,
      deliveryType: deliveryLabel,
      deliveryCost: `${deliveryCost.toLocaleString()} ${t('product.priceCurrency')}`,
      product: t('product.name'),
      color: colorName,
      size: sizeName,
      quantity: quantity,
      totalPrice: `${totalPrice.toLocaleString()} ${t('product.priceCurrency')}`
    }

    try {
      // Send order data to Google Apps Script
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Required for Google Apps Script
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      })

      // Note: With 'no-cors' mode, we can't read the response
      // but the request will still be sent successfully
      setSubmitStatus('success')

      // Optional: Also open WhatsApp as backup notification
      // Uncomment the lines below if you want both email AND WhatsApp
      /*
      const message = `═══════════════════════
طلب جديد - YA VALMODA
═══════════════════════

معلومات العميل:
━━━━━━━━━━━━━━━
الاسم: ${orderData.name}
الهاتف: ${orderData.phone}
الولاية: ${orderData.wilaya}
التوصيل: ${orderData.deliveryType}
سعر التوصيل: ${orderData.deliveryCost}

تفاصيل المنتج:
━━━━━━━━━━━━━━━
المنتج: ${orderData.product}
اللون: ${orderData.color}
المقاس: ${orderData.size}
الكمية: ${orderData.quantity}

═══════════════════════
المجموع: ${orderData.totalPrice}
═══════════════════════`

      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
      window.open(whatsappUrl, '_blank')
      */

    } catch (error) {
      console.error('Error submitting order:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)

      if (submitStatus !== 'error' && !inline && onClose) {
        setTimeout(() => onClose(), 2000)
      }
    }
  }

  const selectedColorData = productColors.find(c => c.id === formData.color)
  const productTotal = 3900 * formData.quantity
  const deliveryCost = formData.wilaya ? calculateDeliveryCost(formData.wilaya, formData.deliveryType) : 0
  const totalPrice = deliveryCost ? productTotal + deliveryCost : productTotal

  const formContent = (
    <>
      {!inline && (
        <div className="order-form-header">
          <span className="order-form-tagline">{t('orderForm.tagline')}</span>
          <h2 className="order-form-title">{t('orderForm.title.part1')} <em>{t('orderForm.title.part2')}</em></h2>
        </div>
      )}

      <form className="order-form" onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className={`form-group ${errors.name ? 'has-error' : ''}`}>
            <label htmlFor="name">{t('orderForm.name.label')}</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t('orderForm.name.placeholder')}
              autoComplete="name"
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          {/* Phone Field */}
          <div className={`form-group ${errors.phone ? 'has-error' : ''}`}>
            <label htmlFor="phone">{t('orderForm.phone.label')}</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder={t('orderForm.phone.placeholder')}
              autoComplete="tel"
            />
            {errors.phone && <span className="error-text">{errors.phone}</span>}
          </div>

          {/* Wilaya Selector */}
          <div className={`form-group ${errors.wilaya ? 'has-error' : ''}`}>
            <label htmlFor="wilaya">{t('orderForm.wilaya.label')}</label>
            <div className="select-wrapper">
              <select
                id="wilaya"
                name="wilaya"
                value={formData.wilaya}
                onChange={handleChange}
              >
                <option value="">{t('orderForm.wilaya.placeholder')}</option>
                {wilayas.map(w => (
                  <option
                    key={w.code}
                    value={w.code}
                    disabled={w.homeDelivery === null}
                  >
                    {w.code} - {w.name} {w.homeDelivery === null ? t('orderForm.wilaya.notAvailable') : ''}
                  </option>
                ))}
              </select>
            </div>
            {errors.wilaya && <span className="error-text">{errors.wilaya}</span>}
          </div>

          {/* Delivery Type */}
          <div className="form-group">
            <label>{t('orderForm.deliveryType.label')}</label>
            <div className="delivery-options">
              <button
                type="button"
                className={`delivery-option ${formData.deliveryType === 'office' ? 'active' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, deliveryType: 'office' }))}
              >
                <span className="delivery-option-title">{t('orderForm.deliveryType.office.title')}</span>
                <span className="delivery-option-desc">{t('orderForm.deliveryType.office.desc')}</span>
              </button>
              <button
                type="button"
                className={`delivery-option ${formData.deliveryType === 'home' ? 'active' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, deliveryType: 'home' }))}
              >
                <span className="delivery-option-title">{t('orderForm.deliveryType.home.title')}</span>
                <span className="delivery-option-desc">{t('orderForm.deliveryType.home.desc')}</span>
              </button>
            </div>
            {formData.wilaya && deliveryCost !== null && (
              <div style={{ marginTop: '8px', fontSize: '14px', color: '#666' }}>
                {t('orderForm.deliveryType.cost')} <strong>{deliveryCost.toLocaleString()} {t('product.priceCurrency')}</strong>
              </div>
            )}
          </div>

          {/* Color Selector - only show in modal */}
          {!inline && (
            <div className="form-group">
              <label>
                {t('orderForm.color.label')} <strong>{t(`product.colors.${selectedColorData?.id}`)}</strong>
              </label>
              <div className="color-selector-row">
                {productColors.map(color => (
                  <button
                    key={color.id}
                    type="button"
                    className={`color-option ${formData.color === color.id ? 'active' : ''}`}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => handleColorSelect(color.id)}
                    title={t(`product.colors.${color.id}`)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector - only show in modal */}
          {!inline && (
            <div className="form-group">
              <label>{t('orderForm.quantity.label')}</label>
              <div className="quantity-selector">
                <button
                  type="button"
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={formData.quantity <= 1}
                >
                  <span className="quantity-minus"></span>
                </button>
                <span className="quantity-value">{formData.quantity}</span>
                <button
                  type="button"
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(1)}
                  disabled={formData.quantity >= 10}
                >
                  <span className="quantity-plus"></span>
                </button>
              </div>
            </div>
          )}

          {/* Price Summary - only show in modal */}
          {!inline && (
            <div className="order-summary">
              <div className="summary-row">
                <span>{t('orderForm.summary.packPrice')}</span>
                <span className="price-with-promo">
                  <span className="old-price">{t('product.priceOld')}</span>
                  <span>{t('product.priceNew')} {t('product.priceCurrency')}</span>
                </span>
              </div>
              <div className="summary-row">
                <span>{t('orderForm.summary.quantity')}</span>
                <span>× {formData.quantity}</span>
              </div>
              {formData.wilaya && deliveryCost !== null && (
                <div className="summary-row">
                  <span>{t('orderForm.summary.delivery')} ({formData.deliveryType === 'office' ? t('orderForm.summary.bureau') : t('orderForm.summary.domicile')})</span>
                  <span>{deliveryCost.toLocaleString()} {t('product.priceCurrency')}</span>
                </div>
              )}
              <div className="summary-row total">
                <span>{t('orderForm.summary.total')}</span>
                <span>{totalPrice.toLocaleString()} {t('product.priceCurrency')}</span>
              </div>
            </div>
          )}

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="status-message success">
              {t('orderForm.status.success')}
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="status-message error">
              {t('orderForm.status.error')}
            </div>
          )}

          {/* Inline Total Preview */}
          {inline && formData.wilaya && deliveryCost !== null && (
            <div style={{
              padding: '12px',
              backgroundColor: '#f8f8f8',
              borderRadius: '6px',
              marginBottom: '12px',
              fontSize: '15px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span>{t('orderForm.summary.product')}</span>
                <span>{t('product.priceNew')} {t('product.priceCurrency')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span>{t('orderForm.summary.deliveryLabel')}</span>
                <span>{deliveryCost.toLocaleString()} {t('product.priceCurrency')}</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '8px',
                borderTop: '1px solid #ddd',
                fontWeight: 'bold',
                fontSize: '16px'
              }}>
                <span>{t('orderForm.summary.total')}</span>
                <span>{totalPrice.toLocaleString()} {t('product.priceCurrency')}</span>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
            disabled={isSubmitting || submitStatus === 'success'}
          >
            <span>{isSubmitting ? t('orderForm.submit.sending') : submitStatus === 'success' ? t('orderForm.submit.sent') : t('orderForm.submit.order')}</span>
          </button>
        </form>
    </>
  )

  // Inline mode - no overlay, just the form
  if (inline) {
    return (
      <div className="order-form-container order-form-inline">
        {formContent}
      </div>
    )
  }

  // Modal mode - with overlay and close button
  return (
    <div className="order-form-overlay" onClick={onClose}>
      <div className="order-form-container" onClick={e => e.stopPropagation()}>
        <button className="order-form-close" onClick={onClose}>
          <span></span>
          <span></span>
        </button>
        {formContent}
      </div>
    </div>
  )
}

export default OrderForm
