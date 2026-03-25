import Checkout from './pages/Checkout'
import AdminDashboard from './pages/AdminDashboard'
import './index.css'

console.log("🚀 MiBazar App: Rendereando...")

console.log("🚀 MiBazar App: Iniciando modo ultra-rápido...")

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false)

  return (
    <Router>
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
    </Router>
  )
}

export default App
