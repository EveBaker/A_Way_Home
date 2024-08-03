// src/components/TestAuth.tsx
'use client';

import React from 'react';
import { useAuth } from '../context/AuthContext';

const TestAuth = () => {
  const { user, loading, userData, logout } = useAuth();

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : user ? (
        <div>
          <p>User is logged in: {user.email}</p>
          {userData ? (
            <div>
              <p>Firestore User Info:</p>
              <p>Username: {userData.username}</p>
              <button onClick={logout}>Logout</button>
            </div>
          ) : (
            <p>User not found in Firestore</p>
          )}
        </div>
      ) : (
        <div>No user is logged in</div>
      )}
    </div>
  );
};

export default TestAuth;
