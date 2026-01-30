import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyB7PDKhdoi1qtg4H_fpKwW6lKQoXulcQbI',
  authDomain: 'covoiturage-edc6c.firebaseapp.com',
  databaseURL: 'https://covoiturage-edc6c.firebaseio.com',
  projectId: 'covoiturage-edc6c',
  storageBucket: 'covoiturage-edc6c.appspot.com',
  messagingSenderId: '489049173252',
  appId: '1:489049173252:web:ed24a668d003f90d33b451',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export default app
