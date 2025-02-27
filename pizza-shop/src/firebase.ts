import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Replace with your Firebase configuration
  apiKey: "AIzaSyBjheODOTTXz9yOMCddHUxlOiHMeByfdWo",
  authDomain: "pizza-shop-a3260.firebaseapp.com",
  projectId: "pizza-shop-a3260",
  storageBucket: "pizza-shop-a3260.firebasestorage.app",
  messagingSenderId: "62967695834",
  appId: "1:62967695834:web:cd4b291073e571e52bd8e3"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 