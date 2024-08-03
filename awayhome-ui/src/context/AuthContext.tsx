// src/context/AuthContext.tsx
'use client';
import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { auth, db } from '../config/firebaseClient';
import { User, getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc } from 'firebase/firestore';

interface AuthContextProps {
  user: User | null;
  userData: { username: string } | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  userData: null,
  loading: true,
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, loading, error] = useAuthState(auth);
  const [userData, setUserData] = useState<{ username: string } | null>(null);

  useEffect(() => {
    console.log('Auth state changed:', user);
    const fetchUserData = async () => {
      if (user) {
        console.log(`Fetching Firestore document for UID: ${user.uid}`);
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          console.log('Firestore document found:', userSnap.data());
          setUserData(userSnap.data() as { username: string });
        } else {
          console.error('User data not found');
        }
      } else {
        setUserData(null);
      }
    };

    fetchUserData();
  }, [error, user]);

  const logout = async () => {
    await getAuth().signOut();
  };

  return (
    <AuthContext.Provider
      value={{ user: user ?? null, userData, loading, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
