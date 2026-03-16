import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { ShoppingBag, Star } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'
import './Home.css'

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (!error) setProducts(data || [])
      setLoading(false)
    }
    fetchProducts()
  }, [])

  return (
    <div className="home-page">
      <header className="hero">
        <h1 className="gradient-text">Bienvenidos a MiBazar</h1>
        <p>Encuentra productos únicos y validados para ti.</p>
      </header>

      <section className="product-grid">
        {loading ? (
          <div className="loader">Cargando productos...</div>
        ) : (
          products.map(product => (
            <div key={product.id} className="product-card glass">
              <Link to={`/product/${product.id}`} className="product-image">
                <img src={product.image_url || 'https://via.placeholder.com/300'} alt={product.name} />
                {product.is_experimental && <span className="badge experimental">Nuevo</span>}
              </Link>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="price">${product.price}</p>
                <div className="product-actions">
                  <button onClick={() => addToCart(product)} className="btn-primary">
                    <ShoppingBag size={18} />
                    Agregar
                  </button>
                  <button className="btn-icon">
                    <Star size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
        
        {!loading && products.length === 0 && (
          <div className="empty-state glass">
             <p>No hay productos disponibles en este momento.</p>
          </div>
        )}
      </section>
    </div>
  )
}
