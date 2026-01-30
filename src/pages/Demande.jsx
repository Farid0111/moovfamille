import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { addDemande, getDemandesCountByOffre, peutRejoindre, MAX_ACHETEURS_PAR_GROUPE } from '../data/demandes'
import { getOffreById } from '../data/offres'
import { getNumeroMoovError } from '../utils/numeroMoov'
import './Demande.css'

export default function Demande() {
  const { offreId } = useParams()
  const navigate = useNavigate()
  const [offre, setOffre] = useState(null)
  const [inscrits, setInscrits] = useState(0)
  const [loading, setLoading] = useState(!!offreId)
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    contact: '',
    message: '',
  })
  const [contactError, setContactError] = useState('')

  useEffect(() => {
    if (!offreId) {
      setLoading(false)
      return
    }
    Promise.all([getOffreById(offreId), getDemandesCountByOffre(offreId)])
      .then(([o, count]) => {
        setOffre(o)
        setInscrits(count)
      })
      .catch(() => setOffre(null))
      .finally(() => setLoading(false))
  }, [offreId])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (name === 'contact') setContactError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!offreId) return
    const err = getNumeroMoovError(form.contact)
    if (err) {
      setContactError(err)
      return
    }
    setContactError('')
    setSubmitting(true)
    try {
      const ok = await peutRejoindre(offreId)
      if (!ok) {
        setInscrits(MAX_ACHETEURS_PAR_GROUPE)
        setSubmitting(false)
        return
      }
      await addDemande({ offreId, contact: form.contact.trim(), message: form.message })
      setSent(true)
      setTimeout(() => navigate('/offres'), 2000)
    } catch (err) {
      setSubmitting(false)
    }
  }

  if (!offreId) {
    return (
      <div className="demande-page">
        <h1>Rejoindre un groupe</h1>
        <p>Choisissez une offre depuis la <Link to="/offres">liste des offres</Link> puis cliquez sur « Rejoindre ce groupe ».</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="demande-page">
        <h1>Rejoindre un groupe</h1>
        <p className="intro">Chargement…</p>
      </div>
    )
  }

  if (!offre) {
    return (
      <div className="demande-page">
        <h1>Offre introuvable</h1>
        <Link to="/offres">Retour aux offres</Link>
      </div>
    )
  }

  const complet = inscrits >= MAX_ACHETEURS_PAR_GROUPE

  if (complet) {
    return (
      <div className="demande-page sent">
        <h1>Groupe complet</h1>
        <p>Ce groupe a déjà {MAX_ACHETEURS_PAR_GROUPE} acheteurs. Choisissez une autre offre.</p>
        <Link to="/offres">Voir les offres</Link>
      </div>
    )
  }

  if (sent) {
    return (
      <div className="demande-page sent">
        <h1>Inscription enregistrée</h1>
        <p>Votre inscription au groupe a bien été enregistrée. Votre numéro est stocké en base de données et ne sera pas affiché au vendeur ni aux autres acheteurs.</p>
        <Link to="/offres">Retour aux offres</Link>
      </div>
    )
  }

  return (
    <div className="demande-page">
      <h1>Rejoindre ce groupe</h1>
      <div className="offre-resume">
        <strong>{offre.type}</strong> — {offre.duree} — {(offre.prix ?? 0).toLocaleString('fr-FR')} FCFA
        {offre.description && <p>{offre.description}</p>}
      </div>
      <p className="intro">
        Indiquez votre numéro Moov (Bénin). Il sera enregistré en base de données uniquement et ne sera jamais affiché au vendeur ni aux autres acheteurs. Aucun contact direct. Seuls les numéros Moov sont acceptés (préfixes 96 ou 97).
      </p>
      <form onSubmit={handleSubmit} className="demande-form">
        <div className="field">
          <label htmlFor="contact">Votre numéro Moov (obligatoire)</label>
          <input
            id="contact"
            name="contact"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            placeholder="+229 97 12 34 56 ou 97 12 34 56"
            value={form.contact}
            onChange={handleChange}
            required
            className={contactError ? 'input-error' : ''}
          />
          {contactError && <span className="field-error">{contactError}</span>}
          <small>Numéro Moov Bénin uniquement (96 ou 97). Visible uniquement en base de données.</small>
        </div>
        <div className="field">
          <label htmlFor="message">Message optionnel</label>
          <textarea
            id="message"
            name="message"
            rows="3"
            placeholder="Précisions si besoin"
            value={form.message}
            onChange={handleChange}
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? 'Envoi…' : 'Rejoindre le groupe'}
          </button>
          <Link to="/offres" className="btn btn-secondary">Annuler</Link>
        </div>
      </form>
    </div>
  )
}
