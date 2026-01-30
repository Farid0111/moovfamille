import { collection, doc, getDocs, getDoc, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'

const COLLECTION = 'offres'
/** Prix par jour restant (montant à payer par l'acheteur = jours restants × PRIX_PAR_JOUR). */
export const PRIX_PAR_JOUR = 250
/** Prix max = 30 jours × 250 = 7500 FCFA. */
export const PRIX_MAX = 30 * 250
/** Commission plateforme (10 %). */
export const COMMISSION_PLATEFORME = 0.10
/** Montant que le vendeur reçoit = prix payé par l'acheteur × (1 - commission). */
export function getMontantVendeur(prix) {
  return Math.round(Number(prix) * (1 - COMMISSION_PLATEFORME))
}

/** Retourne les offres pour affichage : sans numéros vendeur (visibles uniquement en base). */
function stripContactVendeur(o) {
  const { contactVendeur, numeroDepot, contact, ...rest } = o
  return { ...rest }
}

/** Liste toutes les offres (sans contact vendeur). */
export async function getOffres() {
  const snapshot = await getDocs(collection(db, COLLECTION))
  const list = snapshot.docs.map((d) => {
    const data = d.data()
    return { id: d.id, ...data }
  })
  return list.map(stripContactVendeur)
}

/** Ajoute une offre. Prix doit être <= PRIX_MAX. Retourne l’offre créée (sans contact vendeur). */
export async function addOffre(offre) {
  const date = new Date().toISOString().slice(0, 10)
  const dureeJours = Math.min(30, Math.max(7, offre.dureeJours != null ? Number(offre.dureeJours) : 30))
  const prix = dureeJours * PRIX_PAR_JOUR
  const ref = await addDoc(collection(db, COLLECTION), {
    type: offre.type,
    duree: offre.duree || `${dureeJours} jours`,
    dureeJours,
    description: offre.description || '',
    contactVendeur: offre.contactVendeur,
    numeroDepot: offre.numeroDepot || '',
    prix,
    date,
    createdAt: serverTimestamp(),
  })
  return stripContactVendeur({
    id: ref.id,
    type: offre.type,
    duree: offre.duree || `${dureeJours} jours`,
    dureeJours,
    description: offre.description || '',
    prix,
    date,
  })
}

/** Retourne une offre par ID (sans numéro vendeur). */
export async function getOffreById(id) {
  const docSnap = await getDoc(doc(db, COLLECTION, id))
  if (!docSnap.exists()) return null
  const data = docSnap.data()
  return stripContactVendeur({ id: docSnap.id, ...data })
}

const DUREE_OFFRE_JOURS_DEFAULT = 30

/**
 * Calcule le nombre de jours restants pour une offre (à partir de sa date + durée choisie par le vendeur).
 * @param {{ date?: string, dureeJours?: number }} offre - offre avec date (YYYY-MM-DD) et optionnellement dureeJours
 * @returns {{ jours: number, libelle: string }} jours restants et libellé affichable
 */
export function getJoursRestants(offre) {
  const dateStr = offre?.date
  if (!dateStr) return { jours: 0, libelle: '—' }
  const dureeJours = offre?.dureeJours != null ? Number(offre.dureeJours) : DUREE_OFFRE_JOURS_DEFAULT
  const [y, m, d] = dateStr.split('-').map(Number)
  const dateDebut = new Date(y, m - 1, d)
  const dateFin = new Date(dateDebut)
  dateFin.setDate(dateFin.getDate() + dureeJours)
  const aujourdhui = new Date()
  aujourdhui.setHours(0, 0, 0, 0)
  dateFin.setHours(0, 0, 0, 0)
  const diffMs = dateFin - aujourdhui
  const jours = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)))
  let libelle
  if (jours === 0) libelle = 'Expiré'
  else if (jours === 1) libelle = '1 jour restant'
  else libelle = `${jours} jours restants`
  return { jours, libelle }
}

/**
 * Montant à payer par l'acheteur = (jours restants) × 250 FCFA.
 * @param {{ date?: string, dureeJours?: number }} offre
 * @returns {number} montant en FCFA
 */
export function getPrixAffiche(offre) {
  const { jours } = getJoursRestants(offre)
  return jours * PRIX_PAR_JOUR
}
