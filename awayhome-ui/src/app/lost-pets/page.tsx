// src/app/lost-pets/page.jsx
'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const LostPets = dynamic(() => import('../../components/LostPets'), {
  ssr: false,
});
const Sidebar = dynamic(() => import('../../components/Sidebar'), {
  ssr: false,
});

const LostPetsPage = () => {
  const [filters, setFilters] = useState({
    idOrName: '',
    status: 'lost',
    type: '',
    gender: '',
    size: '',
    location: '',
    distance: 25,
    sort: 'datePost',
  });

  return (
    <div className="flex min-h-screen">
      <Sidebar filters={filters} setFilters={setFilters} />
      <div className="flex-grow p-4">
        <h1 className="text-4xl font-bold text-center mt-4">Lost Pets</h1>
        <LostPets filters={filters} />
      </div>
    </div>
  );
};

export default LostPetsPage;
