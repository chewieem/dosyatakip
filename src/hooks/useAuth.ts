import { useState, useEffect } from 'react';
import { User, signInWithEmailAndPassword, signOut, onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        // Firestore'dan kullanıcı verilerini al
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      } else {
        setUserData(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Firestore'a kullanıcı bilgilerini kaydet
      await setDoc(doc(db, 'users', user.uid), {
        email,
        name,
        role: 'user',
        createdAt: serverTimestamp(),
        isActive: true
      });

      return user;
    } catch (error) {
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, 'users', result.user.uid));
      
      if (!userDoc.exists()) {
        // Kullanıcı Firestore'da yoksa oluştur
        await setDoc(doc(db, 'users', result.user.uid), {
          email: result.user.email,
          name: result.user.displayName || 'Kullanıcı',
          role: 'user',
          isActive: true,
          createdAt: serverTimestamp(),
        });
        
        // Yeni oluşturulan kullanıcıyı getir
        const newUserDoc = await getDoc(doc(db, 'users', result.user.uid));
        setUserData(newUserDoc.data());
      } else {
        setUserData(userDoc.data());
      }
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error.message);
    }
  };

  const logout = () => {
    return signOut(auth);
  };

  return {
    user,
    loading,
    signUp,
    login,
    logout
  };
}
