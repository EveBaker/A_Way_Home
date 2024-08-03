import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the FlyerForm component
const FlyerForm = dynamic(() => import('../../components/FlyerForm'), {
  ssr: false,
});

const FlyerFormPage = () => {
  // Example filters, you can replace these with your actual filter values
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
