import { useState } from 'react'
import './OrderForm.css'

// 69 Wilayas of Algeria
const wilayas = [
  { code: '01', name: 'Adrar' },
  { code: '02', name: 'Chlef' },
  { code: '03', name: 'Laghouat' },
  { code: '04', name: 'Oum El Bouaghi' },
  { code: '05', name: 'Batna' },
  { code: '06', name: 'Béjaïa' },
  { code: '07', name: 'Biskra' },
  { code: '08', name: 'Béchar' },
  { code: '09', name: 'Blida' },
  { code: '10', name: 'Bouira' },
  { code: '11', name: 'Tamanrasset' },
  { code: '12', name: 'Tébessa' },
  { code: '13', name: 'Tlemcen' },
  { code: '14', name: 'Tiaret' },
  { code: '15', name: 'Tizi Ouzou' },
  { code: '16', name: 'Alger' },
  { code: '17', name: 'Djelfa' },
  { code: '18', name: 'Jijel' },
  { code: '19', name: 'Sétif' },
  { code: '20', name: 'Saïda' },
  { code: '21', name: 'Skikda' },
  { code: '22', name: 'Sidi Bel Abbès' },
  { code: '23', name: 'Annaba' },
  { code: '24', name: 'Guelma' },
  { code: '25', name: 'Constantine' },
  { code: '26', name: 'Médéa' },
  { code: '27', name: 'Mostaganem' },
  { code: '28', name: "M'Sila" },
  { code: '29', name: 'Mascara' },
  { code: '30', name: 'Ouargla' },
  { code: '31', name: 'Oran' },
  { code: '32', name: 'El Bayadh' },
  { code: '33', name: 'Illizi' },
  { code: '34', name: 'Bordj Bou Arréridj' },
  { code: '35', name: 'Boumerdès' },
  { code: '36', name: 'El Tarf' },
  { code: '37', name: 'Tindouf' },
  { code: '38', name: 'Tissemsilt' },
  { code: '39', name: 'El Oued' },
  { code: '40', name: 'Khenchela' },
  { code: '41', name: 'Souk Ahras' },
  { code: '42', name: 'Tipaza' },
  { code: '43', name: 'Mila' },
  { code: '44', name: 'Aïn Defla' },
  { code: '45', name: 'Naâma' },
  { code: '46', name: 'Aïn Témouchent' },
  { code: '47', name: 'Ghardaïa' },
  { code: '48', name: 'Relizane' },
  { code: '49', name: 'El M\'Ghair' },
  { code: '50', name: 'El Meniaa' },
  { code: '51', name: 'Ouled Djellal' },
  { code: '52', name: 'Bordj Baji Mokhtar' },
  { code: '53', name: 'Béni Abbès' },
  { code: '54', name: 'Timimoun' },
  { code: '55', name: 'Touggourt' },
  { code: '56', name: 'Djanet' },
  { code: '57', name: 'In Salah' },
  { code: '58', name: 'In Guezzam' },
  { code: '59', name: 'Aflou' },
  { code: '60', name: 'Aïn Oussera' },
  { code: '61', name: 'Barika' },
  { code: '62', name: 'Bir el-Ater' },
  { code: '63', name: 'Bou Saâda' },
  { code: '64', name: 'El Abiodh Sidi Cheikh' },
  { code: '65', name: 'El Aricha' },
  { code: '66', name: 'El Kantara' },
  { code: '67', name: 'Ksar Chellala' },
  { code: '68', name: 'Ksar El Boukhari' },
  { code: '69', name: 'Messaad' },
]

// Product colors
const productColors = [
  { id: 'black', name: 'Black', hex: '#1a1a1a' },
  { id: 'grey', name: 'Grey', hex: '#6b6b6b' },
  { id: 'blue', name: 'Navy Blue', hex: '#1e3a5f' },
]

// Web3Forms configuration
const WEB3FORMS_KEY = 'f9ce567a-2baa-4857-90c4-e8750b9f18cd'

function OrderForm({ onClose }) {
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
      newErrors.name = 'Name is required'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^(0|\+213)[567]\d{8}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Enter a valid Algerian phone number'
    }

    if (!formData.wilaya) {
      newErrors.wilaya = 'Please select your wilaya'
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
    const selectedColor = productColors.find(c => c.id === formData.color)
    const totalPrice = 3900 * formData.quantity
    const deliveryLabel = formData.deliveryType === 'office' ? 'Bureau (Office)' : 'Domicile (Home)'

    const orderDetails = {
      access_key: WEB3FORMS_KEY,
      subject: `New Order - YA VALMODA - ${formData.name}`,
      from_name: 'YA VALMODA Orders',
      name: formData.name,
      phone: formData.phone,
      wilaya: `${selectedWilaya?.code} - ${selectedWilaya?.name}`,
      delivery_type: deliveryLabel,
      product: 'Premium Hoodie + Track Pants Pack',
      color: selectedColor?.name,
      quantity: formData.quantity,
      total_price: `${totalPrice.toLocaleString()} DA`,
      message: `New order received from ${formData.name}`,
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderDetails),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitStatus('success')
        setTimeout(() => {
          if (onClose) onClose()
        }, 2000)
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const selectedColorData = productColors.find(c => c.id === formData.color)
  const totalPrice = 3900 * formData.quantity

  return (
    <div className="order-form-overlay" onClick={onClose}>
      <div className="order-form-container" onClick={e => e.stopPropagation()}>
        <button className="order-form-close" onClick={onClose}>
          <span></span>
          <span></span>
        </button>

        <div className="order-form-header">
          <span className="order-form-tagline">Complete Your Order</span>
          <h2 className="order-form-title">Order <em>Details</em></h2>
        </div>

        <form className="order-form" onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className={`form-group ${errors.name ? 'has-error' : ''}`}>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              autoComplete="name"
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          {/* Phone Field */}
          <div className={`form-group ${errors.phone ? 'has-error' : ''}`}>
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="0555 123 456"
              autoComplete="tel"
            />
            {errors.phone && <span className="error-text">{errors.phone}</span>}
          </div>

          {/* Wilaya Selector */}
          <div className={`form-group ${errors.wilaya ? 'has-error' : ''}`}>
            <label htmlFor="wilaya">Wilaya</label>
            <div className="select-wrapper">
              <select
                id="wilaya"
                name="wilaya"
                value={formData.wilaya}
                onChange={handleChange}
              >
                <option value="">Select your wilaya</option>
                {wilayas.map(w => (
                  <option key={w.code} value={w.code}>
                    {w.code} - {w.name}
                  </option>
                ))}
              </select>
            </div>
            {errors.wilaya && <span className="error-text">{errors.wilaya}</span>}
          </div>

          {/* Delivery Type */}
          <div className="form-group">
            <label>Delivery Type</label>
            <div className="delivery-options">
              <button
                type="button"
                className={`delivery-option ${formData.deliveryType === 'office' ? 'active' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, deliveryType: 'office' }))}
              >
                <span className="delivery-option-title">Bureau</span>
                <span className="delivery-option-desc">Pick up from office</span>
              </button>
              <button
                type="button"
                className={`delivery-option ${formData.deliveryType === 'home' ? 'active' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, deliveryType: 'home' }))}
              >
                <span className="delivery-option-title">Domicile</span>
                <span className="delivery-option-desc">Deliver to your door</span>
              </button>
            </div>
          </div>

          {/* Color Selector */}
          <div className="form-group">
            <label>
              Color: <strong>{selectedColorData?.name}</strong>
            </label>
            <div className="color-selector-row">
              {productColors.map(color => (
                <button
                  key={color.id}
                  type="button"
                  className={`color-option ${formData.color === color.id ? 'active' : ''}`}
                  style={{ backgroundColor: color.hex }}
                  onClick={() => handleColorSelect(color.id)}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="form-group">
            <label>Quantity</label>
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

          {/* Price Summary */}
          <div className="order-summary">
            <div className="summary-row">
              <span>Pack Price</span>
              <span className="price-with-promo">
                <span className="old-price">4,500 DA</span>
                <span>3,900 DA</span>
              </span>
            </div>
            <div className="summary-row">
              <span>Quantity</span>
              <span>× {formData.quantity}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>{totalPrice.toLocaleString()} DA</span>
            </div>
          </div>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="status-message success">
              Order sent successfully! Check your email.
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="status-message error">
              Failed to send order. Please try again.
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
            disabled={isSubmitting || submitStatus === 'success'}
          >
            <span>{isSubmitting ? 'Sending...' : submitStatus === 'success' ? 'Order Sent!' : 'Confirm Order'}</span>
          </button>
        </form>
      </div>
    </div>
  )
}

export default OrderForm
