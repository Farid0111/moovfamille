import { Link } from 'react-router-dom'
import './Home.css'
import avis1 from '../assets/avis/avis-1.png'
import avis2 from '../assets/avis/avis-2.png'
import avis3 from '../assets/avis/avis-3.png'
import avis4 from '../assets/avis/avis-4.png'
import avis5 from '../assets/avis/avis-5.png'
import avis6 from '../assets/avis/avis-6.png'
import avis7 from '../assets/avis/avis-7.png'

const avisPhotos = [avis1, avis2, avis3, avis4, avis5, avis6, avis7]

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <h1>Votre intermédiaire Moov Famille au Bénin</h1>
        <p>
          Trouvez des groupes Moov Famille (forfaits jour, hebdo, mois, illimités) ou créez les vôtres.
          Le montant à payer est fixé à 250 FCFA par jour restant (max 7 500 FCFA pour 30 jours). Maximum 3 acheteurs par groupe. Aucun contact direct — les numéros restent en base de données.
        </p>
        <div className="hero-actions">
          <Link to="/offres" className="btn btn-primary">Voir les offres</Link>
          <Link to="/deposer-offre" className="btn btn-secondary">Déposer une offre</Link>
        </div>
      </section>

      <section className="roles">
        <h2>Vous êtes</h2>
        <div className="cards">
          <Link to="/acheteur" className="card card-acheteur">
            <span className="card-icon">🛒</span>
            <h3>Acheteur</h3>
            <p>Parcourez les offres et rejoignez un groupe (max 3 acheteurs). Votre numéro n’est jamais affiché au vendeur ni aux autres.</p>
            <span className="card-link">Accéder à l’espace acheteur →</span>
          </Link>
          <Link to="/vendeur" className="card card-vendeur">
            <span className="card-icon">📦</span>
            <h3>Vendeur</h3>
            <p>Créez un groupe et choisissez la durée (7 à 30 jours). Le montant payé par les acheteurs est fixé à 250 FCFA par jour restant. Votre numéro n’est jamais affiché aux acheteurs. Aucun chat ni contact direct.</p>
            <span className="card-link">Accéder à l’espace vendeur →</span>
          </Link>
        </div>
      </section>

      <section className="avis">
        <h2>Avis des utilisateurs</h2>
        <p className="avis-intro">Ce que disent les utilisateurs de Moov Famille au Bénin.</p>
        <div className="avis-photos">
          {avisPhotos.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Avis Moov Famille ${i + 1}`}
              className="avis-photo"
            />
          ))}
        </div>
      </section>

      <section className="info">
        <h2>Comment ça marche ?</h2>
        <ol className="steps">
          <li><strong>Acheteur :</strong> Consultez les offres, puis cliquez sur « Rejoindre ce groupe » (max 3 acheteurs par groupe). Indiquez votre contact — il est enregistré en base de données uniquement.</li>
          <li><strong>Vendeur :</strong> Déposez une offre (type, durée 7 à 30 jours). Le montant payé par les acheteurs = 250 FCFA × jours restants (max 7 500 FCFA). La plateforme prélève 10 % de commission ; vous recevez 90 % du montant. Votre contact est enregistré en base de données uniquement.</li>
          <li><strong>Aucun contact direct :</strong> Vendeur et acheteurs ne voient jamais les numéros respectifs. Tous les numéros sont visibles uniquement en base de données. Aucun chat.</li>
        </ol>
        <p className="info-note">
          Les transactions (paiement, livraison) sont gérées hors plateforme. Cette plateforme ne fait pas de mise en contact directe.
        </p>
      </section>
    </div>
  )
}
