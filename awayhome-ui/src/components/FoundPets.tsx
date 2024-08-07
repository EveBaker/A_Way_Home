// src/components/FoundPets.tsx

'use client';

import React, { useState, useEffect } from 'react';
import PetCard from './PetCard';
import PetModal from './PetModal';
import { applyFilters } from '../utils/filters';
import { getCoordinates } from '../utils/location';
import { Pet, Filters } from '../types';
import { db } from '../config/firebaseClient';
import { collection, getDocs, query, where } from 'firebase/firestore';

interface FoundPetsProps {
  filters: Filters;
}

const FoundPets: React.FC<FoundPetsProps> = ({ filters }) => {
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [filteredPets, setFilteredPets] = useState<Pet[]>([]);

  const handleCardClick = (pet: Pet) => {
    setSelectedPet(pet);
  };

  const closeModal = () => {
    setSelectedPet(null);
  };

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const q = query(
          collection(db, 'pets'),
          where('status', '==', 'found'), // Adjust the field and value according to your Firestore structure
        );
        const querySnapshot = await getDocs(q);
        const petsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Pet[];

        console.log('Fetched pets data:', petsData); // Log the data

        let updatedFilters = { ...filters };
        let userCoordinates = null;
        if (filters.location) {
          userCoordinates = await getCoordinates(filters.location);
        }
        setFilteredPets(
          applyFilters(petsData, updatedFilters, userCoordinates),
        );
      } catch (error) {
        console.error('Error fetching pets: ', error);
      }
    };

    fetchPets();
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
