// src/app/Register/page.tsx
import React from 'react';
import dynamic from 'next/dynamic';

const AuthPage = dynamic(() => import('../auth/AuthPage'), {
  ssr: false,
});

const RegisterPage: React.FC = () => {
  return <AuthPage initialTab="register" />;
};

export default RegisterPage;
