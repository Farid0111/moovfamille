import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { addOffre, PRIX_PAR_JOUR, PRIX_MAX, getMontantVendeur } from '../data/offres'
import './DeposerOffre.css'

const TYPES = ['Jour', 'Hebdo', 'Mois', 'Illimité']

/** Durées possibles : 7 à 30 jours max (24 valeurs). */
const DUREES_JOURS = Array.from({ length: 24 }, (_, i) => {
  const jours = 7 + i
  return { value: jours, label: `${jours} jours` }
})

export default function DeposerOffre() {
  const navigate = useNavigate()
  const [sent, setSent] = useState(false)
  const [publishedPrix, setPublishedPrix] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    type: 'Mois',
    dureeJours: 30,
    description: '',
    contactVendeur: '',
    numeroDepot: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const dureeJours = Number(form.dureeJours)
      const duree = DUREES_JOURS.find((d) => d.value === dureeJours)?.label ?? `${dureeJours} jours`
      await addOffre({ ...form, duree, dureeJours })
      setPublishedPrix(dureeJours * PRIX_PAR_JOUR)
      setSent(true)
      setTimeout(() => navigate('/offres'), 2000)
    } catch (err) {
      setError(err?.message || 'Erreur lors de la publication.')
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="deposer-page sent">
        <h1>Offre publiée</h1>
        <p>Votre offre a bien été enregistrée. Le montant que paieront les acheteurs est fixé à {PRIX_PAR_JOUR.toLocaleString('fr-FR')} FCFA par jour restant (ex. {form.dureeJours} jours au départ = {(form.dureeJours * PRIX_PAR_JOUR).toLocaleString('fr-FR')} FCFA). Vous recevrez <strong>90 % du montant</strong> (10 % de commission plateforme) sur votre numéro de dépôt. Ex. pour {(form.dureeJours * PRIX_PAR_JOUR).toLocaleString('fr-FR')} FCFA payés par l'acheteur, vous recevez {getMontantVendeur(form.dureeJours * PRIX_PAR_JOUR).toLocaleString('fr-FR')} FCFA. Maximum 3 acheteurs par groupe. Votre numéro n’est pas affiché aux acheteurs.</p>
        <Link to="/offres">Voir les offres</Link>
      </div>
    )
  }

  return (
    <div className="deposer-page">
      <h1>Déposer une offre (groupe)</h1>
      <p className="intro">
        Créez un groupe Moov Famille. Le montant payé par les acheteurs est fixé à <strong>{PRIX_PAR_JOUR.toLocaleString('fr-FR')} FCFA par jour restant</strong> (max {PRIX_MAX.toLocaleString('fr-FR')} FCFA pour 30 jours). Vous choisissez la durée de l'offre (7 à 30 jours). Maximum 3 acheteurs par groupe. Votre numéro est enregistré en base de données uniquement et ne sera jamais affiché aux acheteurs. Aucun contact direct.
      </p>
      <div className="deposer-notice">
        <strong>Paiement vendeur :</strong> vous recevrez <strong>90 % du montant payé par l'acheteur</strong> (la plateforme prélève 10 % de commission). Indiquez ci-dessous le numéro sur lequel vous souhaitez recevoir le dépôt.
      </div>
      {error && <p className="deposer-error">{error}</p>}
      <form onSubmit={handleSubmit} className="deposer-form">
        <div className="field">
          <label htmlFor="type">Type de forfait</label>
          <select id="type" name="type" value={form.type} onChange={handleChange} required>
            {TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="dureeJours">Durée de l'offre</label>
          <select
            id="dureeJours"
            name="dureeJours"
            value={form.dureeJours}
            onChange={handleChange}
            required
          >
            {DUREES_JOURS.map((d) => (
              <option key={d.value} value={d.value}>{d.label}</option>
            ))}
          </select>
          <small>L'offre sera visible pendant ce nombre de jours à partir de la date de publication.</small>
        </div>
        <div className="field">
          <label htmlFor="description">Description (optionnel)</label>
          <textarea
            id="description"
            name="description"
            rows="3"
            placeholder="Détails du forfait, 4G, illimité, etc."
            value={form.description}
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label htmlFor="numeroDepot">Numéro pour recevoir le dépôt</label>
          <input
            id="numeroDepot"
            name="numeroDepot"
            type="text"
            placeholder="+229 97 12 34 56 — numéro Moov Money / MTN / etc."
            value={form.numeroDepot}
            onChange={handleChange}
            required
          />
          <small>C’est sur ce numéro que vous recevrez 90 % du montant (après 10 % de commission) Enregistré en base de données uniquement.</small>
        </div>
        <div className="field">
          <label htmlFor="contactVendeur">Votre contact (téléphone / WhatsApp)</label>
          <input
            id="contactVendeur"
            name="contactVendeur"
            type="text"
            placeholder="+229 97 12 34 56"
            value={form.contactVendeur}
            onChange={handleChange}
            required
          />
          <small>Enregistré en base de données uniquement. Jamais affiché aux acheteurs.</small>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Publication…' : 'Publier l’offre'}
          </button>
          <Link to="/vendeur" className="btn btn-secondary">Annuler</Link>
        </div>
      </form>
    </div>
  )
}
