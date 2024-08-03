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
    const fetchUserData = async () => {
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserData(userSnap.data() as { username: string });
        } else {
          console.error('User data not found');
        }
      } else {
        setUserData(null);
      }
    };

    fetchUserData();
  }, [user]);

  const logout = async () => {
    await getAuth().signOut();
    localStorage.removeItem('authToken');
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
