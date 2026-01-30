import { collection, getDocs, addDoc, query, where, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'

const COLLECTION = 'demandes'
const MAX_ACHETEURS_PAR_GROUPE = 3

export function getDemandes() {
  return getDocs(collection(db, COLLECTION)).then((snapshot) => {
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
  })
}

/** Nombre d’acheteurs déjà inscrits pour une offre (groupe). */
export async function getDemandesCountByOffre(offreId) {
  const q = query(
    collection(db, COLLECTION),
    where('offreId', '==', offreId)
  )
  const snapshot = await getDocs(q)
  return snapshot.size
}

/** Vérifie si un groupe peut encore accepter des acheteurs. */
export async function peutRejoindre(offreId) {
  const count = await getDemandesCountByOffre(offreId)
  return count < MAX_ACHETEURS_PAR_GROUPE
}

/** Ajoute une inscription (demande) à un groupe. */
export async function addDemande(demande) {
  const ref = await addDoc(collection(db, COLLECTION), {
    offreId: demande.offreId,
    contact: demande.contact,
    message: demande.message || '',
    date: new Date().toISOString().slice(0, 10),
    createdAt: serverTimestamp(),
  })
  const data = { id: ref.id, ...demande, date: new Date().toISOString().slice(0, 10) }
  return data
}

export { MAX_ACHETEURS_PAR_GROUPE }
