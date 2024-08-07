import React from 'react';
import dynamic from 'next/dynamic';
import { Filters } from '../../types';

// Dynamically import the FlyerForm component
const FlyerForm = dynamic(() => import('../../components/FlyerForm'), {
  ssr: false,
});

const FlyerFormPage = () => {
  const filters = {
    idOrName: '',
    status: 'lost', // or 'found'
    type: '',
    gender: '',
    size: '',
    location: '',
    distance: 25,
    sort: 'datePost',
  };

  return <FlyerForm filters={filters} />;
};

export default FlyerFormPage;
