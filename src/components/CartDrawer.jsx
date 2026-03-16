import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'
import './CartDrawer.css'

export default function CartDrawer({ isOpen, onClose }) {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart()
  const navigate = useNavigate()

  if (!isOpen) return null

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-drawer glass" onClick={e => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Tu Carrito</h2>
          <button onClick={onClose} className="btn-close">
            <X size={24} />
          </button>
        </div>

        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <ShoppingBag size={48} />
              <p>Tu carrito está vacío</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image_url || 'https://via.placeholder.com/80'} alt={item.name} />
                <div className="item-info">
                  <h4>{item.name}</h4>
                  <p className="item-price">${item.price}</p>
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={16} /></button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={16} /></button>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="btn-remove">
                  <Trash2 size={20} />
                </button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="total-row">
              <span>Total:</span>
              <span className="total-amount">${cartTotal}</span>
            </div>
            <button 
              onClick={() => { navigate('/checkout'); onClose(); }} 
              className="btn-primary w-full btn-large"
            >
              Finalizar Compra
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
