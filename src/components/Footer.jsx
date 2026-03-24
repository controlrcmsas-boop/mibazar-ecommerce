import { Send } from 'lucide-react'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <img src="/images/Logo MiBazar.png" alt="MiBazar Logo" className="footer-logo" />
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
