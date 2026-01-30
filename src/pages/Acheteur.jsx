import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getOffres, PRIX_MAX } from '../data/offres'
import { getDemandesCountByOffre, MAX_ACHETEURS_PAR_GROUPE } from '../data/demandes'
import './Acheteur.css'

export default function Acheteur() {
  const [offres, setOffres] = useState([])
  const [counts, setCounts] = useState({})
  const [loading, setLoading] = useState(true)
  const [filtre, setFiltre] = useState('')

  useEffect(() => {
    getOffres()
      .then((list) => {
        setOffres(list)
        return Promise.all(list.map((o) => getDemandesCountByOffre(o.id))).then(
          (countList) => ({ list, countList })
        )
      })
      .then(({ list, countList }) => {
        const byId = {}
        list.forEach((o, i) => { byId[o.id] = countList[i] })
        setCounts(byId)
      })
      .catch(() => setOffres([]))
      .finally(() => setLoading(false))
  }, [])

  const types = [...new Set(offres.map((o) => o.type))]
  const filtrees = filtre
    ? offres.filter((o) => o.type === filtre)
    : offres

  if (loading) {
    return (
      <div className="acheteur-page">
        <h1>Espace Acheteur</h1>
        <p className="intro">Chargement des offres…</p>
      </div>
    )
  }

  return (
    <div className="acheteur-page">
      <h1>Espace Acheteur</h1>
      <p className="intro">
        Parcourez les offres Moov Famille ci-dessous. Chaque vendeur fixe son prix (max <strong>{PRIX_MAX.toLocaleString('fr-FR')} FCFA</strong>). Maximum {MAX_ACHETEURS_PAR_GROUPE} acheteurs par groupe. Rejoignez un groupe — votre numéro est enregistré en base de données uniquement. Aucun contact direct.
      </p>

      <div className="acheteur-filtre">
        <label htmlFor="type">Type de forfait :</label>
        <select id="type" value={filtre} onChange={(e) => setFiltre(e.target.value)}>
          <option value="">Tous</option>
          {types.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {filtrees.length === 0 ? (
        <div className="acheteur-empty">
          <p>Aucune offre disponible pour le moment.</p>
        </div>
      ) : (
        <ul className="acheteur-offres-list">
          {filtrees.map((offre) => {
            const inscrits = counts[offre.id] ?? 0
            const complet = inscrits >= MAX_ACHETEURS_PAR_GROUPE
            return (
              <li key={offre.id} className="offre-card">
                <div className="offre-type">{offre.type}</div>
                <div className="offre-prix">{(offre.prix ?? 0).toLocaleString('fr-FR')} FCFA</div>
                <div className="offre-duree">{offre.duree}</div>
                {offre.description && <p className="offre-desc">{offre.description}</p>}
                <div className="offre-places">
                  <span className={complet ? 'complet' : ''}>
                    {inscrits} / {MAX_ACHETEURS_PAR_GROUPE} acheteurs
                  </span>
                  {complet && <span className="badge-complet">Complet</span>}
                </div>
                {!complet && (
                  <Link to={`/demande/${offre.id}`} className="btn btn-primary btn-rejoindre">
                    Rejoindre ce groupe
                  </Link>
                )}
                <div className="offre-date">Publié le {offre.date}</div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
