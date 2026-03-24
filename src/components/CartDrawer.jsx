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
      <div className="cart-drawer" onClick={e => e.stopPropagation()}>
        <div className="cart-header">
          <h2 className="cart-title">MI CARRITO</h2>
          <button onClick={onClose} className="btn-close">
            <X size={24} />
          </button>
        </div>

        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <ShoppingBag size={48} strokeWidth={1} />
              <p>Tu carrito está vacío</p>
              <button onClick={onClose} className="btn-primary">VER PRODUCTOS</button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">
                  <img src={item.images ? item.images[0] : '/images/placeholder.png'} alt={item.name} />
                </div>
                <div className="item-info">
                  <h4 className="item-name">{item.name}</h4>
                  <p className="item-price">${item.price.toLocaleString()}</p>
                  <div className="quantity-controls">
                    <button className="q-btn" onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={14} /></button>
                    <span className="q-val font-bold">{item.quantity}</span>
                    <button 
                      className="q-btn" 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      disabled={item.quantity >= (item.stock ?? Infinity)}
                      style={{ opacity: item.quantity >= (item.stock ?? Infinity) ? 0.3 : 1 }}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="btn-remove">
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="total-row">
              <span className="total-label">Subtotal:</span>
              <span className="total-amount">${cartTotal.toLocaleString()}</span>
            </div>
            <button 
              onClick={() => { navigate('/checkout'); onClose(); }} 
              className="btn-primary checkout-btn"
            >
              FINALIZAR COMPRA
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
