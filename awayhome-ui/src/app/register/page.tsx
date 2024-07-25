// src/app/Register/page.tsx
import React from 'react';
import dynamic from 'next/dynamic';

// import path to use relative path
const Register = dynamic(() => import('../../components/Auth/Register'), { ssr: false });

const RegisterPage: React.FC = () => {
  return <Register />;
};

export default RegisterPage;

