import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { ArrowLeft, ShoppingCart, Truck, ShieldCheck } from 'lucide-react'
import { products } from '../data/products'
import './ProductDetail.css'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [activeImage, setActiveImage] = useState('')
  const [selectedVariant, setSelectedVariant] = useState(null)

  useEffect(() => {
    const foundProduct = products.find(p => p.id === id)
    if (foundProduct) {
      setProduct(foundProduct)
      if (foundProduct.variants && foundProduct.variants.length > 0) {
        setSelectedVariant(foundProduct.variants[0])
        if (foundProduct.variants[0].images) {
          setActiveImage(foundProduct.variants[0].images[0])
        } else {
          setActiveImage(foundProduct.images[0])
        }
      } else {
        setSelectedVariant(null)
        setActiveImage(foundProduct.images[0])
      }
    }
  }, [id])

  useEffect(() => {
    if (selectedVariant?.images?.length > 0) {
      setActiveImage(selectedVariant.images[0])
    }
  }, [selectedVariant])

  if (!product) return <div className="container error-msg">Producto no encontrado</div>

  const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 2)

  return (
    <div className="product-detail-page container">
      <button onClick={() => navigate(-1)} className="btn-back">
        <ArrowLeft size={18} /> VOLVER
      </button>

      <div className="product-main-block">
        {/* GALLERY */}
        <div className="product-gallery">
          <div className="main-image-container" style={{ opacity: selectedVariant?.stock === 0 ? 0.5 : 1, position: 'relative' }}>
            <img src={activeImage} alt={product.name} className="main-image" />
            {selectedVariant?.stock === 0 && <span className="tag tag-agotado" style={{ position: 'absolute', top: '15px', left: '15px', background: 'black', color: 'white', padding: '5px 10px', fontWeight: 'bold', zIndex: 10 }}>AGOTADO</span>}
          </div>
          <div className="thumbnail-list">
            {(selectedVariant?.images || product.images).map((img, idx) => (
              <div 
                key={idx} 
                className={`thumbnail ${activeImage === img ? 'active' : ''}`}
                onClick={() => setActiveImage(img)}
              >
                <img src={img} alt={`${product.name} ${idx}`} />
              </div>
            ))}
          </div>
        </div>

        {/* INFO */}
        <div className="product-info-column">
          <div className="info-header">
            {product.isNew && <span className="tag tag-new">NUEVO</span>}
            <h1 className="detail-title">{product.name}</h1>
            <p className="detail-price">
              ${selectedVariant ? selectedVariant.price.toLocaleString() : product.price.toLocaleString()}
            </p>
          </div>

          <div className="detail-description">
            <p>{product.description}</p>
          </div>

          <div className="product-specs">
            <div className="spec-item"><strong>Marca:</strong> {product.brand}</div>
            <div className="spec-item"><strong>Material:</strong> {product.material}</div>
            <div className="spec-item"><strong>Categoría:</strong> {product.category}</div>
          </div>

          {product.variants && product.variants.length > 0 && (
            <div className="product-variants" style={{ marginBottom: '20px' }}>
              <h4 style={{ marginBottom: '10px' }}>Selecciona modelo/opción:</h4>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {product.variants.map(variant => (
                  <button 
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className="btn-secondary"
                    style={{ 
                      padding: '8px 16px',
                      opacity: selectedVariant?.id === variant.id ? 1 : 0.6,
                      border: selectedVariant?.id === variant.id ? '2px solid var(--primary-color)' : '1px solid #ccc'
                    }}
                  >
                    {variant.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button 
            onClick={() => {
              if (selectedVariant?.stock === 0) return;
              const itemToAdd = selectedVariant 
                ? { 
                    ...product, 
                    id: `${product.id}-${selectedVariant.id}`, 
                    name: `${product.name} - ${selectedVariant.name}`, 
                    price: selectedVariant.price,
                    stock: selectedVariant.stock,
                    images: selectedVariant.images?.length > 0 ? selectedVariant.images : product.images
                  }
                : product;
              addToCart(itemToAdd);
            }} 
            className={`btn-secondary buy-now-btn ${selectedVariant?.stock === 0 ? 'disabled' : ''}`}
            disabled={selectedVariant?.stock === 0}
            style={{ opacity: selectedVariant?.stock === 0 ? 0.5 : 1, cursor: selectedVariant?.stock === 0 ? 'not-allowed' : 'pointer' }}
          >
            {selectedVariant?.stock === 0 ? 'AGOTADO' : 'AGREGAR AL CARRITO'}
          </button>

          {selectedVariant && selectedVariant.stock > 0 && (
             <p className="stock-info" style={{ color: 'var(--primary-color)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
               Disponibles: {selectedVariant.stock}
             </p>
          )}

          <div className="trust-badges">
            <div className="trust-item"><Truck size={18} /> Envío a todo el país</div>
            <div className="trust-item"><ShieldCheck size={18} /> Compra segura</div>
          </div>
        </div>
      </div>

      {/* DETALLES EXTENDIDOS */}
      <section className="extended-details">
        <h2 className="detail-section-title">CARACTERÍSTICAS</h2>
        <p className="details-text">{product.details}</p>
      </section>

      {/* PRODUCTOS RELACIONADOS */}
      <section className="related-section">
        <h2 className="detail-section-title">PRODUCTOS RELACIONADOS</h2>
        <div className="product-grid">
          {relatedProducts.map(p => (
            <div key={p.id} className="product-card">
              <Link to={`/product/${p.id}`} className="product-image-link">
                <div className="image-container">
                  <img src={p.images[0]} alt={p.name} />
                </div>
              </Link>
              <div className="product-info">
                <h3 className="product-name">{p.name}</h3>
                <p className="product-price">${p.price.toLocaleString()}</p>
                <button onClick={() => addToCart(p)} className="btn-primary product-add-btn">
                  AGREGAR
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

// Necesitamos importar Link para los relacionados
import { Link } from 'react-router-dom'
