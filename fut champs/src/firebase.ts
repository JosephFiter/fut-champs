import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
 apiKey: "AIzaSyCjjCmcZQbx7zENVtCcCRAXab4Ibh2WGNQ",
  authDomain: "basededatosutchamps.firebaseapp.com",
  projectId: "basededatosutchamps",
  storageBucket: "basededatosutchamps.firebasestorage.app",
  messagingSenderId: "149793268525",
  appId: "1:149793268525:web:390e8bf80c7de5e51ea9a4",
  measurementId: "G-FM2KQ7BD1B"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

