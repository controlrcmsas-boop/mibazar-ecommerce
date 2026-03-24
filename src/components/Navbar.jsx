import { Link } from 'react-router-dom'
import { ShoppingCart, Heart, User, Search, Store } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import './Navbar.css'

export default function Navbar({ onCartClick }) {
  const { user } = useAuth()
  const { cartCount } = useCart()

  return (
    <nav className="navbar sticky-header">
      <div className="container nav-content">
        <Link to="/" className="logo">
          <img src="/images/Logo MiBazar.png" alt="MiBazar Logo" className="logo-img" />
        </Link>

        <div className="nav-actions">
          <button onClick={onCartClick} className="nav-link cart-link">
            <span className="cart-text">CARRITO</span>
            <div className="cart-icon-wrapper">
              <ShoppingCart size={24} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </div>
          </button>
          {/* {!user && (
            <Link to="/login" className="nav-link login-btn">
              INGRESAR
            </Link>
          )} */}
          {user?.role === 'admin' && (
            <Link to="/admin" className="nav-link admin-btn">
              ADMIN
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
