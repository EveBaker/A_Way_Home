// src/app/lost-pets/page.jsx
import React from 'react';
import dynamic from 'next/dynamic';

const LostPets = dynamic(() => import('../../components/LostPets'), {
  ssr: false,
});

const LostPetsPage = () => {
  return <LostPets />;
};

export default LostPetsPage;
