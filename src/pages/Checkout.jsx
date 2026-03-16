import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { CreditCard, Truck, CheckCircle, Smartphone } from 'lucide-react'
import DiscountCodeInput from '../components/DiscountCodeInput'
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
    paymentMethod: 'contraentrega'
  })

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const orderData = {
      user_id: user?.id,
      total: cartTotal,
      payment_method: formData.paymentMethod,
      shipping_address: {
        fullName: formData.fullName,
        address: formData.address,
        phone: formData.phone
      },
      status: 'pending'
    }

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert(orderData)
      .select()
      .single()

    if (!orderError) {
      const orderItems = cart.map(item => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        price_at_purchase: item.price
      }))

      await supabase.from('order_items').insert(orderItems)
      setSuccess(true)
      clearCart()
    }

    setLoading(false)
  }

  if (success) {
    return (
      <div className="checkout-success glass">
        <CheckCircle size={64} className="success-icon" />
        <h2>¡Pedido realizado con éxito!</h2>
        <p>Gracias por tu compra. Nos pondremos en contacto contigo pronto.</p>
        <button onClick={() => navigate('/')} className="btn-primary">Volver a la tienda</button>
      </div>
    )
  }

  return (
    <div className="checkout-page">
      <h1>Finalizar Compra</h1>
      
      <div className="checkout-grid">
        <form onSubmit={handleSubmit} className="checkout-form glass">
          <section>
            <h3><Truck size={20} /> Información de Envío</h3>
            <div className="form-group">
              <input 
                name="fullName" 
                placeholder="Nombre completo" 
                onChange={handleInputChange} 
                required 
              />
              <input 
                name="address" 
                placeholder="Dirección de envío" 
                onChange={handleInputChange} 
                required 
              />
              <input 
                name="phone" 
                placeholder="Teléfono móvil" 
                onChange={handleInputChange} 
                required 
              />
            </div>
          </section>

          <section>
            <h3><CreditCard size={20} /> Método de Pago</h3>
            <div className="payment-options">
              <label className={`payment-option glass ${formData.paymentMethod === 'nequi' ? 'active' : ''}`}>
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="nequi" 
                  onChange={handleInputChange} 
                />
                <Smartphone size={24} />
                <span>Nequi</span>
              </label>
              <label className={`payment-option glass ${formData.paymentMethod === 'bancolombia' ? 'active' : ''}`}>
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="bancolombia" 
                  onChange={handleInputChange} 
                />
                <CreditCard size={24} />
                <span>Bancolombia</span>
              </label>
              <label className={`payment-option glass ${formData.paymentMethod === 'contraentrega' ? 'active' : ''}`}>
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="contraentrega" 
                  defaultChecked 
                  onChange={handleInputChange} 
                />
                <Truck size={24} />
                <span>Contraentrega</span>
              </label>
            </div>
          </section>

          <button type="submit" className="btn-primary w-full btn-large" disabled={loading}>
            {loading ? 'Procesando...' : `Pagar $${cartTotal}`}
          </button>
        </form>

        <aside className="order-summary glass">
          <h3>Resumen del Pedido</h3>
          <div className="summary-items">
            {cart.map(item => (
              <div key={item.id} className="summary-item">
                <span>{item.name} x {item.quantity}</span>
                <span>${item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="summary-total">
            <span>Total:</span>
            <span>${cartTotal}</span>
          </div>

          <DiscountCodeInput />
        </aside>
      </div>
    </div>
  )
}
