import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ProductDetail from './pages/ProductDetail'
import Checkout from './pages/Checkout'
import AdminDashboard from './pages/AdminDashboard'
import './index.css'

console.log("🚀 MiBazar App: Iniciando modo ultra-rápido...")

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false)

  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="app">
            <Navbar onCartClick={() => setIsCartOpen(true)} />
            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
            <main className="container">
              <Routes>
                <Route path="/" element={<Home onOpenCart={() => setIsCartOpen(true)} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/admin" element={<AdminDashboard />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
