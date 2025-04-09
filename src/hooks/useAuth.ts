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
      // Firebase Authentication ile giriş yap
      const result = await signInWithEmailAndPassword(auth, email, password);
      
      // Firestore'dan kullanıcı bilgilerini al
      const userDoc = await getDoc(doc(db, 'users', result.user.uid));
      if (!userDoc.exists()) {
        await signOut(auth);
        throw new Error('Kullanıcı bilgileri bulunamadı');
      }
      
      // Kullanıcı durumunu kontrol et
      const userData = userDoc.data();
      if (!userData.isActive) {
        await signOut(auth);
        throw new Error('Hesap aktif değil');
      }
      
      // Auth token'ı al ve cookie'ye kaydet
      const token = await result.user.getIdToken(true);
      document.cookie = `session=${token}; path=/; max-age=3600; secure; samesite=strict`;
      
      // State'i güncelle
      setUser(result.user);
      setUserData(userData);
      setLoading(false);
      
      return userData;
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error.message);
    }
  };

  const logout = async () => {
    try {
      // Önce cookie'yi sil
      document.cookie = 'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      
      // Sonra Firebase'den çıkış yap
      await signOut(auth);
      
      // State'i temizle
      setUser(null);
      setUserData(null);
      setLoading(false);
    } catch (error: any) {
      console.error('Logout error:', error);
      throw new Error(error.message);
    }
  };

  return {
    user,
    loading,
    signUp,
    login,
    logout
  };
}
