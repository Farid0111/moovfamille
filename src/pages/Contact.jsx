import './Contact.css'

export default function Contact() {
  return (
    <div className="contact-page">
      <h1>Contact</h1>
      <p className="intro">
        Pour toute question sur cette plateforme (Moov Famille Bénin), utilisez les moyens ci-dessous. Cette page est réservée au support de la plateforme — pas aux échanges entre acheteurs et vendeurs (aucun contact direct, aucun chat ; les numéros restent en base de données uniquement).
      </p>
      <div className="contact-cards">
        <div className="contact-card">
          <span className="contact-icon">📧</span>
          <h3>Email</h3>
          <p><a href="mailto:faridbio26@gmail.com">faridbio26@gmail.com</a></p>
        </div>
        <div className="contact-card">
          <span className="contact-icon">📱</span>
          <h3>Téléphone / WhatsApp</h3>
          <p><a href="tel:0162434644">0162434644</a></p>
        </div>
      </div>
      <div className="contact-note">
        <strong>Règles de la plateforme :</strong> Le vendeur et l’acheteur ne voient jamais leurs numéros respectifs. Tous les numéros sont visibles uniquement en base de données. Aucun chat. Aucun contact direct. Prix fixé par le vendeur (max 7 500 FCFA). Maximum 3 acheteurs par groupe.
      </div>
    </div>
  )
}
