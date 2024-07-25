// src/app/found-pets/page.jsx
import React from 'react';
import dynamic from 'next/dynamic';

const FoundPets = dynamic(() => import('../../components/FoundPets'), { ssr: false });

const FoundPetsPage = () => {
  return <FoundPets />;
};

export default FoundPetsPage;
