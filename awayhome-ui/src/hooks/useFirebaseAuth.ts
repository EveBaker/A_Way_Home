// src/hooks/useFirebaseAuth.ts
import { useState, useEffect } from 'react';
import { auth, db } from '../config/firebaseClient';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const useFirebaseAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [firestoreUser, setFirestoreUser] = useState<any>(null);

  useEffect(() => {
    console.log('Setting up onAuthStateChanged listener');
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('onAuthStateChanged triggered with user:', user);
      setUser(user);

      if (user) {
        console.log(`Fetching Firestore document for UID: ${user.uid}`);
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          console.log('Firestore document found:', userSnap.data());
          setFirestoreUser(userSnap.data());
        } else {
          console.log('No such document in Firestore!');
        }
      } else {
        console.log('No user authenticated');
        setFirestoreUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading, firestoreUser };
};

export default useFirebaseAuth;
