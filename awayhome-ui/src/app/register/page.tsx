// src/app/Register/page.tsx
import React from 'react';
import AuthPage from '../auth/AuthPage';

const RegisterPage: React.FC = () => {
  return <AuthPage initialTab="register" />;
};

export default RegisterPage;
