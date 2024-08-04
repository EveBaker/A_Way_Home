// src/app/found-pets/page.jsx
'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const FoundPets = dynamic(() => import('../../components/FoundPets'), {
  ssr: false,
});
const Sidebar = dynamic(() => import('../../components/Sidebar'), {
  ssr: false,
});

const FoundPetsPage = () => {
  const [filters, setFilters] = useState({
    idOrName: '',
    status: 'found',
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
        <h1 className="text-4xl font-bold text-center mt-4">Found Pets</h1>
        <FoundPets filters={filters} />
      </div>
    </div>
  );
};

export default FoundPetsPage;
