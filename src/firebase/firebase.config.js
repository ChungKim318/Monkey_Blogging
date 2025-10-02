import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCEo2CPkE5g4qG-lbUSz0xmLqvi8a6WBr0',
  authDomain: 'monkey-blogging-db5e7.firebaseapp.com',
  projectId: 'monkey-blogging-db5e7',
  storageBucket: 'monkey-blogging-db5e7.firebasestorage.app',
  messagingSenderId: '284065196177',
  appId: '1:284065196177:web:16df818e538faa544c7730',
  measurementId: 'G-2CMRZ7V38V',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app)
