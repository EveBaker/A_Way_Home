// pages/resources/veterinarians.tsx
import React from 'react';
import dynamic from 'next/dynamic';

const NearbyResources = dynamic(
  () => import('../../../components/NearbyResources'),
  {
    ssr: false,
  },
);

const Veterinarians = () => {
  return (
    <div>
      <main className="p-4 mx-auto">
        <NearbyResources type="veterinary_care" />
      </main>
    </div>
  );
};

export default Veterinarians;
