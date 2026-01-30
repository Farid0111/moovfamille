import { Link } from 'react-router-dom'
import './Vendeur.css'

export default function Vendeur() {
  return (
    <div className="vendeur-page">
      <h1>Espace Vendeur</h1>
      <p className="intro">
        Créez un groupe Moov Famille. Le montant payé par les acheteurs est fixé à <strong>250 FCFA par jour restant</strong> (max 7 500 FCFA pour 30 jours). Vous choisissez la durée (7 à 30 jours). Maximum 3 acheteurs par groupe. Votre numéro est enregistré en base de données uniquement et n’est jamais affiché aux acheteurs. Aucun chat ni contact direct.
      </p>
      <div className="vendeur-commission">
        <strong>Commission plateforme :</strong> la plateforme prélève <strong>10 %</strong> de commission sur le montant payé par l'acheteur. Vous recevez <strong>90 %</strong> du montant sur le numéro de dépôt que vous indiquez (ex. pour 7 500 FCFA payés par l'acheteur, vous recevez 6 750 FCFA).
      </div>
      <div className="vendeur-actions">
        <Link to="/deposer-offre" className="action-card">
          <span className="action-icon">➕</span>
          <h2>Déposer une offre (groupe)</h2>
          <p>Publiez un groupe : type, durée (7 à 30 jours) et numéro pour recevoir le dépôt. Le montant payé par les acheteurs = 250 FCFA × jours restants. Vous recevez <strong>90 %</strong> du montant (10 % de commission plateforme). Votre contact est stocké en base de données uniquement.</p>
          <span className="action-link">Déposer une offre →</span>
        </Link>
      </div>
      <div className="vendeur-tips">
        <h3>Rappel</h3>
        <ul>
          <li>Montant payé par l'acheteur : 250 FCFA par jour restant (max 7 500 FCFA pour 30 jours).</li>
          <li><strong>Commission :</strong> la plateforme prélève 10 % ; vous recevez 90 % sur le numéro de dépôt que vous indiquez.</li>
          <li>Maximum 3 acheteurs par groupe.</li>
          <li>Votre numéro n’est jamais affiché aux acheteurs.</li>
        </ul>
      </div>
    </div>
  )
}
