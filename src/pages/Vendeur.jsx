import { Link } from 'react-router-dom'
import './Vendeur.css'

export default function Vendeur() {
  return (
    <div className="vendeur-page">
      <h1>Espace Vendeur</h1>
      <p className="intro">
        Créez un groupe Moov Famille. Vous fixez votre prix (maximum 7 500 FCFA). Maximum 3 acheteurs par groupe. Votre numéro est enregistré en base de données uniquement et n’est jamais affiché aux acheteurs. Aucun chat ni contact direct.
      </p>
      <div className="vendeur-actions">
        <Link to="/deposer-offre" className="action-card">
          <span className="action-icon">➕</span>
          <h2>Déposer une offre (groupe)</h2>
          <p>Publiez un groupe : type, durée, prix (max 7 500 FCFA) et numéro pour recevoir le dépôt. Vous recevrez 7 000 FCFA sur ce numéro. Votre contact est stocké en base de données uniquement.</p>
          <span className="action-link">Déposer une offre →</span>
        </Link>
      </div>
      <div className="vendeur-tips">
        <h3>Rappel</h3>
        <ul>
          <li>Prix fixé par vous, plafonné à 7 500 FCFA.</li>
          <li>Vous recevez 7 000 FCFA sur le numéro de dépôt que vous indiquez.</li>
          <li>Maximum 3 acheteurs par groupe.</li>
          <li>Votre numéro n’est jamais affiché aux acheteurs.</li>
        </ul>
      </div>
    </div>
  )
}
