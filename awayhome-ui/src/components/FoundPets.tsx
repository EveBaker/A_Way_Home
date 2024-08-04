// src/components/FoundPets.tsx
'use client';

import React, { useState, useEffect } from 'react';
import PetCard from './PetCard';
import PetModal from '../pages/PetModal';
import foundPetsData from '../pets-json/foundPetsData.json';
import { applyFilters } from '../utils/filters';
import { getCoordinates } from '../utils/location';
import { Pet, Filters } from '../types';

interface FoundPetsProps {
  filters: Filters;
}

const FoundPets: React.FC<FoundPetsProps> = ({ filters }) => {
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [filteredPets, setFilteredPets] = useState<Pet[]>(
    foundPetsData as Pet[],
  );

  const handleCardClick = (pet: Pet) => {
    setSelectedPet(pet);
  };

  const closeModal = () => {
    setSelectedPet(null);
  };

  useEffect(() => {
    const filterPets = async () => {
      let updatedFilters = { ...filters };
      let userCoordinates = null;
      if (filters.location) {
        userCoordinates = await getCoordinates(filters.location);
      }
      setFilteredPets(
        applyFilters(foundPetsData as Pet[], updatedFilters, userCoordinates),
      );
    };

    filterPets();
  }, [filters]);

  return (
    <section className="bg-white py-16 flex-grow">
      <div className="flex h-3/4">
        <div className="w-full p-4">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {filteredPets.map((pet) => (
              <PetCard
                key={pet.id}
                pet={pet}
                onClick={() => handleCardClick(pet)}
                onMoreDetails={() => handleCardClick(pet)}
                onContactPoster={() => alert('Contact Poster')}
              />
            ))}
          </div>
        </div>
      </div>
      {selectedPet && <PetModal pet={selectedPet} onClose={closeModal} />}
    </section>
  );
};

export default FoundPets;
