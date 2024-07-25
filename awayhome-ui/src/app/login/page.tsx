// src/app/Login/page.tsx
import React from 'react';
import dynamic from 'next/dynamic';

// import path to use relative path
const Login = dynamic(() => import('../../components/Auth/Login'), { ssr: false });

const LoginPage: React.FC = () => {
  return <Login />;
};

export default LoginPage;

