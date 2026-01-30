import { Link, useLocation } from 'react-router-dom'
import './Layout.css'

export default function Layout({ children }) {
  const location = useLocation()

  return (
    <div className="layout">
      <header className="header">
        <Link to="/" className="logo">
          <img src="/logo-matrix.png" alt="Matrix Connect - le future c'est maintenant" className="logo-img" />
        </Link>
        <nav className="nav">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Accueil</Link>
          <Link to="/acheteur" className={location.pathname.startsWith('/acheteur') || location.pathname === '/offres' || location.pathname === '/demande' ? 'active' : ''}>Acheteur</Link>
          <Link to="/vendeur" className={location.pathname.startsWith('/vendeur') || location.pathname === '/deposer-offre' ? 'active' : ''}>Vendeur</Link>
          <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link>
        </nav>
      </header>
      <main className="main">{children}</main>
      <footer className="footer">
        <p>Moov Famille Bénin — Intermédiaire acheteurs & vendeurs. Pour toute question : <Link to="/contact">Contact</Link></p>
      </footer>
    </div>
  )
}
