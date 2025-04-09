import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCZjkoQSVe9tCsQn0RGQJUCsHLlUe4_2to",
  authDomain: "dosyatakip.firebaseapp.com",
  projectId: "dosyatakip",
  storageBucket: "dosyatakip.firebasestorage.app",
  messagingSenderId: "75487415300",
  appId: "1:75487415300:web:444f5b798b2603d93ab951",
  measurementId: "G-Z65SSJZX8R"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
