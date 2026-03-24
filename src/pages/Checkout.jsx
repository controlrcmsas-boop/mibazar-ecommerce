import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { CreditCard, Truck, CheckCircle, Smartphone, Send } from 'lucide-react'
import './Checkout.css'

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    phone: '',
    email: '',
    paymentMethod: 'contraentrega'
  })

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Generamos un número de orden aleatorio temporal
      const orderId = Math.floor(Math.random() * 1000000);
      setSuccess(true)

      let message = `*NUEVO PEDIDO - MIBAZAR* 🛍️ (Orden #${orderId})\n\n`;
      message += `*Datos del Cliente:*\n`;
      message += `Nombre: ${formData.fullName}\n`;
      message += `Celular: ${formData.phone}\n`;
      if (formData.email) message += `Email: ${formData.email}\n`;
      message += `Dirección: ${formData.address}\n\n`;

      message += `*Detalle de la Orden:*\n`;
      cart.forEach(item => {
        message += `- ${item.quantity}x ${item.name} ($${item.price.toLocaleString()} c/u) = $${(item.quantity * item.price).toLocaleString()}\n`;
      });

      message += `\n*Método de Pago:* ${formData.paymentMethod.toUpperCase()}\n`;
      message += `*Total a Pagar:* $${cartTotal.toLocaleString()}\n\n`;
      message += `¡Hola! Acabo de realizar este pedido en la tienda en línea.`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/573005740774?text=${encodedMessage}`;
      window.open(whatsappUrl, '_blank');

      clearCart()
    } catch (err) {
      console.error('Error:', err)
      alert('Error inesperado. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="checkout-success container">
        <CheckCircle size={64} className="success-icon" />
        <h2 className="success-title">¡PEDIDO REALIZADO!</h2>
        <p className="success-msg">Gracias por tu compra. Te contactaremos por WhatsApp para coordinar los detalles de la entrega.</p>
        <button onClick={() => navigate('/')} className="btn-primary">VOLVER AL INICIO</button>
      </div>
    )
  }

  return (
    <div className="checkout-page container">
      <h1 className="checkout-title">FINALIZAR COMPRA</h1>
      
      <div className="checkout-grid">
        <form onSubmit={handleSubmit} className="checkout-form">
          <section className="checkout-section">
            <h3 className="section-label"><Truck size={20} /> DATOS DE ENVÍO</h3>
            <div className="form-group">
              <input 
                name="fullName" 
                placeholder="Nombre completo" 
                onChange={handleInputChange} 
                required 
              />
              <input 
                name="phone" 
                placeholder="Teléfono / WhatsApp" 
                onChange={handleInputChange} 
                required 
              />
              <input 
                name="email" 
                placeholder="Email (opcional)" 
                onChange={handleInputChange} 
              />
              <input 
                name="address" 
                placeholder="Dirección exacta de entrega" 
                onChange={handleInputChange} 
                required 
              />
            </div>
          </section>

          <section className="checkout-section">
            <h3 className="section-label"><CreditCard size={20} /> MÉTODO DE PAGO</h3>
            <div className="payment-options">
              <label className={`payment-option ${formData.paymentMethod === 'nequi' ? 'active' : ''}`}>
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="nequi" 
                  onChange={handleInputChange} 
                />
                <Smartphone size={24} />
                <span>Nequi</span>
              </label>
              <label className={`payment-option ${formData.paymentMethod === 'breb' ? 'active' : ''}`}>
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="breb" 
                  onChange={handleInputChange} 
                />
                <Send size={24} />
                <span>Transf. (BRE-B)</span>
              </label>
              <label className={`payment-option ${formData.paymentMethod === 'contraentrega' ? 'active' : ''}`}>
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="contraentrega" 
                  onChange={handleInputChange} 
                />
                <Truck size={24} />
                <span>Contraentrega</span>
              </label>
            </div>
          </section>

          <button type="submit" className="btn-primary checkout-submit-btn" disabled={loading || cart.length === 0}>
            {loading ? 'PROCESANDO...' : `CONFIRMAR COMPRA - $${cartTotal.toLocaleString()}`}
          </button>
        </form>

        <aside className="order-summary">
          <h3 className="summary-title">RESUMEN</h3>
          <div className="summary-items">
            {cart.map(item => (
              <div key={item.id} className="summary-item">
                <div className="summary-item-left">
                  <div className="summary-img">
                    <img src={item.images ? item.images[0] : ''} alt={item.name} />
                  </div>
                  <span className="summary-name">{item.name} x {item.quantity}</span>
                </div>
                <span className="summary-price">${(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="summary-total">
            <span>TOTAL:</span>
            <span>${cartTotal.toLocaleString()}</span>
          </div>
        </aside>
      </div>
    </div>
  )
}
