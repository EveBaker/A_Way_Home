// pages/resources/shelters.tsx
import React from 'react';
import dynamic from 'next/dynamic';

const NearbyResources = dynamic(
  () => import('../../../components/NearbyResources'),
  {
    ssr: false,
  },
);

const Shelters = () => {
  return (
    <div>
      <main className="p-4 mx-auto">
        <NearbyResources type="animal_shelter" />
      </main>
    </div>
  );
};

export default Shelters;
