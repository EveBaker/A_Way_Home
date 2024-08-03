// src/components/Auth/Logout.tsx
'use client';

import React from 'react';
import { auth } from '../../config/firebaseClient';
import { signOut } from 'firebase/auth';

const Logout: React.FC = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User logged out');
      alert('Logout successful');
    } catch (error) {
      console.error('Error logging out:', error);
      alert('Logout failed');
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
