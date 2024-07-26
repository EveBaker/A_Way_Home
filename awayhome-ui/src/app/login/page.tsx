// src/app/Login/page.tsx
import React from 'react';
import AuthPage from '../auth/AuthPage';

const LoginPage: React.FC = () => {
  return <AuthPage initialTab="login" />;
};

export default LoginPage;
