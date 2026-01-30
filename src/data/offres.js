import { collection, doc, getDocs, getDoc, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'

const COLLECTION = 'offres'
export const PRIX_MAX = 7500
/** Montant que le vendeur reçoit sur son numéro de dépôt (sur le prix max 7500). */
export const MONTANT_VENDEUR = 7000

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
  const prix = Number(offre.prix)
  if (Number.isNaN(prix) || prix < 0 || prix > PRIX_MAX) {
    throw new Error(`Le prix doit être entre 0 et ${PRIX_MAX} FCFA.`)
  }
  const date = new Date().toISOString().slice(0, 10)
  const ref = await addDoc(collection(db, COLLECTION), {
    type: offre.type,
    duree: offre.duree,
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
    duree: offre.duree,
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
