import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

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
let app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Get Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

// Initialize Analytics
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { auth, db, analytics };
