import { Link } from 'react-router-dom'
import './NotFound.css'

export default function NotFound() {
  return (
    <div className="not-found">
      <h1>Page introuvable</h1>
      <p>
        Il semblerait que vous ayez suivi un lien brisé ou saisi une URL qui n'existe pas sur ce site.
      </p>
      <Link to="/" className="btn btn-primary">
        Retour à l'accueil
      </Link>
    </div>
  )
}
