import { Send } from 'lucide-react'
import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src="/images/Logo UGO.png" alt="UGO Logo" className="footer-logo" />
          </Link>
          <p className="footer-tagline">Calidad y diversión en un solo lugar.</p>
        </div>
        
        <div className="footer-contact">
          <h4 className="footer-title">CONTACTO</h4>
          <a href="https://wa.me/573005740774" target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
            <Send size={18} /> ESCRIBIR POR WHATSAPP
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} MiBazar - Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
