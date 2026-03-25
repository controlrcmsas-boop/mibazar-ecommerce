import { useRef } from 'react'
import { ShoppingBag, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'
import { products } from '../data/products'
import './Home.css'

export default function Home({ onOpenCart }) {
  const { addToCart } = useCart()
  const carouselRef = useRef(null)

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 300 // aprox 1 card width
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  // Separamos productos por secciones o categorías si es necesario
  const featuredProducts = products.slice(0, 4)
  const remainingProducts = products.slice(4)

  return (
    <div className="home-page">
      {/* SECTION: HERO */}
      <section className="hero-section">
        <div className="hero-background">
          <img src="/images/Hero 3 MiBazar.png" alt="Hero MiBazar" className="hero-bg-image" />
        </div>
        <div className="container hero-container-centered">
          <div className="hero-content-bottom">
            <h1 className="hero-title">
              DESCUBRE EL MUNDO <br />
              <span className="hero-highlight">DE MIBAZAR</span>
            </h1>
            <p className="hero-subtitle">
              Juguetes STEAM, accesorios únicos y mucho más para todas las edades.
            </p>
            <a href="https://wa.me/573005740774" target="_blank" rel="noopener noreferrer" className="btn-secondary hero-btn" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              ¡ESCRÍBENOS! <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* SECTION: CARRUSEL PRODUCTOS (Destacados) */}
      <section className="products-section container">
        <div className="carousel-header">
          <h2 className="section-title" style={{ marginBottom: 0 }}>CATÁLOGO</h2>
          <div className="carousel-controls">
            <button className="carousel-control-btn" onClick={() => scrollCarousel('left')} aria-label="Anterior">
              <ChevronLeft size={24} />
            </button>
            <button className="carousel-control-btn" onClick={() => scrollCarousel('right')} aria-label="Siguiente">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
        <div className="product-carousel" ref={carouselRef}>
          {featuredProducts.map(product => {
            const totalStock = product.variants 
              ? product.variants.reduce((acc, v) => acc + (v.stock ?? Infinity), 0)
              : (product.stock ?? Infinity);
            const isOutOfStock = totalStock === 0;

            return (
            <div key={product.id} className={`product-card ${isOutOfStock ? 'out-of-stock' : ''}`}>
              <Link to={`/product/${product.id}`} className="product-image-link" style={{ pointerEvents: isOutOfStock ? 'none' : 'auto' }}>
                <div className="image-container" style={{ opacity: isOutOfStock ? 0.5 : 1 }}>
                  <img src={product.images[0]} alt={product.name} />
                  {product.isNew && !isOutOfStock && <span className="tag tag-new">NUEVO</span>}
                  {isOutOfStock && <span className="tag tag-agotado" style={{ background: 'black', color: 'white', padding: '5px 10px', fontWeight: 'bold', position: 'absolute', top: '10px', left: '10px' }}>AGOTADO</span>}
                </div>
              </Link>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                {product.variants ? (
                  <p className="product-price">Desde ${Math.min(...product.variants.map(v => v.price)).toLocaleString()}</p>
                ) : (
                  <p className="product-price">${product.price.toLocaleString()}</p>
                )}
                {isOutOfStock ? (
                  <button className="btn-primary product-add-btn disabled" disabled style={{ opacity: 0.5, cursor: 'not-allowed', width: '100%' }}>
                    AGOTADO
                  </button>
                ) : product.variants ? (
                  <Link to={`/product/${product.id}`} className="btn-primary product-add-btn" style={{ textDecoration: 'none', display: 'block', textAlign: 'center' }}>
                    VER OPCIONES
                  </Link>
                ) : (
                  <button onClick={() => addToCart(product)} className="btn-primary product-add-btn">
                    AGREGAR
                  </button>
                )}
              </div>
            </div>
            );
          })}
        </div>
      </section>

      {/* SECTION: BLOQUE PROMOCIONAL */}
      <section className="promo-block">
        <div className="container promo-container">
          <div className="promo-content">
            <h2 className="promo-text">¡OBTÉN UN DESCUENTO ESPECIAL PARA TU PRÓXIMA COMPRA!</h2>
            <button className="btn-white" onClick={onOpenCart}>QUIERO MI DESCUENTO</button>
          </div>
        </div>
      </section>

      {/* SECTION: GRID PRODUCTOS (Resto) */}
      <section className="products-section container">
        {/* <h2 className="section-title">NUESTRO CATÁLOGO</h2> */}
        <div className="product-grid">
          {remainingProducts.map(product => {
            const totalStock = product.variants 
              ? product.variants.reduce((acc, v) => acc + (v.stock ?? Infinity), 0)
              : (product.stock ?? Infinity);
            const isOutOfStock = totalStock === 0;

            return (
            <div key={product.id} className={`product-card ${isOutOfStock ? 'out-of-stock' : ''}`}>
              <Link to={`/product/${product.id}`} className="product-image-link" style={{ pointerEvents: isOutOfStock ? 'none' : 'auto' }}>
                <div className="image-container" style={{ opacity: isOutOfStock ? 0.5 : 1 }}>
                  <img src={product.images[0]} alt={product.name} />
                  {product.isNew && !isOutOfStock && <span className="tag tag-new">NUEVO</span>}
                  {isOutOfStock && <span className="tag tag-agotado" style={{ background: 'black', color: 'white', padding: '5px 10px', fontWeight: 'bold', position: 'absolute', top: '10px', left: '10px' }}>AGOTADO</span>}
                </div>
              </Link>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                {product.variants ? (
                  <p className="product-price">Desde ${Math.min(...product.variants.map(v => v.price)).toLocaleString()}</p>
                ) : (
                  <p className="product-price">${product.price.toLocaleString()}</p>
                )}
                {isOutOfStock ? (
                  <button className="btn-primary product-add-btn disabled" disabled style={{ opacity: 0.5, cursor: 'not-allowed', width: '100%' }}>
                    AGOTADO
                  </button>
                ) : product.variants ? (
                  <Link to={`/product/${product.id}`} className="btn-primary product-add-btn" style={{ textDecoration: 'none', display: 'block', textAlign: 'center' }}>
                    VER OPCIONES
                  </Link>
                ) : (
                  <button onClick={() => addToCart(product)} className="btn-primary product-add-btn">
                    AGREGAR
                  </button>
                )}
              </div>
            </div>
            );
          })}
        </div>
      </section>
    </div>
  )
}
