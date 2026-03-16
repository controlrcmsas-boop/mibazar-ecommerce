import { Link } from 'react-router-dom'
import { ShoppingCart, Heart, User, Search, Store } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import './Navbar.css'

export default function Navbar({ onCartClick }) {
  const { user } = useAuth()
  const { cartCount } = useCart()

  return (
    <nav className="navbar glass">
      <div className="container nav-content">
        <Link to="/" className="logo">
          <Store className="logo-icon" />
          <span className="gradient-text">MiBazar</span>
        </Link>

        <div className="search-bar glass">
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Buscar productos..." />
        </div>

        <div className="nav-actions">
          <Link to="/favorites" className="nav-link">
            <Heart size={24} />
          </Link>
          <button onClick={onCartClick} className="nav-link cart-link">
            <ShoppingCart size={24} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
          <Link to={user ? "/profile" : "/login"} className="nav-link">
            <User size={24} />
          </Link>
        </div>
      </div>
    </nav>
  )
}
