import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useCart } from '../context/CartContext'
import { ShoppingCart, Heart, ArrowLeft, Star, MessageSquare } from 'lucide-react'
import './ProductDetail.css'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProduct() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single()
      
      if (!error) setProduct(data)
      setLoading(false)
    }
    fetchProduct()
  }, [id])

  if (loading) return <div className="loader">Cargando producto...</div>
  if (!product) return <div className="error">Producto no encontrado</div>

  return (
    <div className="product-detail-page">
      <button onClick={() => navigate(-1)} className="btn-back">
        <ArrowLeft size={20} />
        Volver
      </button>

      <div className="detail-container">
        <div className="image-section glass">
           <img src={product.image_url || 'https://via.placeholder.com/600'} alt={product.name} />
        </div>

        <div className="info-section">
          <div className="info-header">
             {product.is_experimental && <span className="badge experimental">Producto Experimental</span>}
             <h1>{product.name}</h1>
             <p className="price-large">${product.price}</p>
          </div>

          <div className="description glass">
             <h3>Descripción</h3>
             <p>{product.description || 'Sin descripción disponible.'}</p>
          </div>

          <div className="stock-info">
             <span className={product.stock > 0 ? 'in-stock' : 'out-of-stock'}>
               {product.stock > 0 ? `Stock disponible: ${product.stock}` : 'Agotado'}
             </span>
          </div>

          <div className="detail-actions">
             <button onClick={() => addToCart(product)} className="btn-primary btn-large">
               <ShoppingCart size={24} />
               Agregar al carrito
             </button>
             <button className="btn-icon btn-large">
               <Heart size={24} />
             </button>
          </div>
        </div>
      </div>

      <section className="comments-section glass">
         <h2>
            <MessageSquare size={24} />
            Comentarios
         </h2>
         <p className="text-muted">Inicia sesión para dejar un comentario sobre este producto.</p>
         {/* Comment list will go here */}
      </section>
    </div>
  )
}
