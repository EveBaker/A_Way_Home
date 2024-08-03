// src/components/TestAuth.tsx
'use client';

import React from 'react';
import { useAuth } from '../context/AuthContext';

const TestAuth = () => {
  const { user, userData, loading } = useAuth();

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
              <p>Email: {userData.email}</p>
            </div>
          ) : (
            <p>User data not found in Firestore</p>
          )}
        </div>
      ) : (
        <div>No user is logged in</div>
      )}
    </div>
  );
};

export default TestAuth;
