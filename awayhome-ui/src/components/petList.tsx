// src/components/petList.tsx

'use client';

import React, { useEffect, useState } from 'react';
import PetCard from './PetCard';
import { Pet } from '../types';
import { fetchPets } from '../api/pets';

const PetList: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    const getPets = async () => {
      try {
        const petsData = await fetchPets();
        setPets(petsData);
      } catch (error) {
        console.error('Error fetching pets: ', error);
      }
    };

    getPets();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {pets.map((pet) => (
        <PetCard key={pet.id} pet={pet} />
      ))}
    </div>
  );
};

export default PetList;
