import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { addOffre, PRIX_MAX, MONTANT_VENDEUR } from '../data/offres'
import './DeposerOffre.css'

const TYPES = ['Jour', 'Hebdo', 'Mois', 'Illimité']

export default function DeposerOffre() {
  const navigate = useNavigate()
  const [sent, setSent] = useState(false)
  const [publishedPrix, setPublishedPrix] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    type: 'Mois',
    duree: '',
    prix: '',
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
    const prix = Number(form.prix)
    if (Number.isNaN(prix) || prix < 0 || prix > PRIX_MAX) {
      setError(`Le prix doit être entre 0 et ${PRIX_MAX.toLocaleString('fr-FR')} FCFA.`)
      return
    }
    setLoading(true)
    setError('')
    try {
      await addOffre({ ...form, prix })
      setPublishedPrix(prix)
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
        <p>Votre offre a bien été enregistrée. Prix affiché : {publishedPrix != null ? publishedPrix.toLocaleString('fr-FR') : form.prix} FCFA. Vous recevrez {MONTANT_VENDEUR.toLocaleString('fr-FR')} FCFA sur votre numéro de dépôt. Maximum 3 acheteurs par groupe. Votre numéro n’est pas affiché aux acheteurs.</p>
        <Link to="/offres">Voir les offres</Link>
      </div>
    )
  }

  return (
    <div className="deposer-page">
      <h1>Déposer une offre (groupe)</h1>
      <p className="intro">
        Créez un groupe Moov Famille. Vous fixez votre prix (maximum <strong>{PRIX_MAX.toLocaleString('fr-FR')} FCFA</strong>). Maximum 3 acheteurs par groupe. Votre numéro est enregistré en base de données uniquement et ne sera jamais affiché aux acheteurs. Aucun contact direct.
      </p>
      <div className="deposer-notice">
        <strong>Paiement vendeur :</strong> vous recevrez <strong>{MONTANT_VENDEUR.toLocaleString('fr-FR')} FCFA</strong> sur votre numéro de dépôt (sur les {PRIX_MAX.toLocaleString('fr-FR')} FCFA max). Indiquez ci-dessous le numéro sur lequel vous souhaitez recevoir le dépôt.
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
          <label htmlFor="prix">Prix (FCFA) — max {PRIX_MAX.toLocaleString('fr-FR')}</label>
          <input
            id="prix"
            name="prix"
            type="number"
            min="0"
            max={PRIX_MAX}
            step="100"
            placeholder="Ex: 6500"
            value={form.prix}
            onChange={handleChange}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="duree">Durée</label>
          <input
            id="duree"
            name="duree"
            type="text"
            placeholder="Ex: 30 jours, 7 jours"
            value={form.duree}
            onChange={handleChange}
            required
          />
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
          <small>C’est sur ce numéro que vous recevrez les {MONTANT_VENDEUR.toLocaleString('fr-FR')} FCFA (sur les {PRIX_MAX.toLocaleString('fr-FR')} FCFA). Enregistré en base de données uniquement.</small>
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
