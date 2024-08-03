'use client';

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import PetCard from './PetCard';
import PetModal from './PetModal';

import lostPetsData from '../pets-json/lostPetsData.json'; // Include for LostPets

const FoundPets = () => {
  // and LostPets
  const [selectedPet, setSelectedPet] = useState(null);
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

  const handleCardClick = (pet) => {
    setSelectedPet(pet);
  };

  const closeModal = () => {
    console.log('closeModal called');
    setSelectedPet(null);
  };

  const applyFilters = (pets) => {
    return pets
      .filter((pet) => {
        return (
          (filters.idOrName === '' ||
            (pet.name &&
              (pet.name
                .toLowerCase()
                .includes(filters.idOrName.toLowerCase()) ||
                pet.id.toString() === filters.idOrName))) &&
          (filters.status === '' ||
            (pet.status &&
              pet.status.toLowerCase() === filters.status.toLowerCase())) &&
          (filters.type === '' ||
            (pet.type &&
              pet.type.toLowerCase() === filters.type.toLowerCase())) &&
          (filters.gender === '' ||
            (pet.sex &&
              pet.sex.toLowerCase() === filters.gender.toLowerCase())) &&
          (filters.size === '' ||
            (pet.size &&
              pet.size.toLowerCase() === filters.size.toLowerCase())) &&
          (filters.location === '' ||
            (pet.address &&
              pet.address.city &&
              pet.address.city
                .toLowerCase()
                .includes(filters.location.toLowerCase()))) &&
          pet.distance <= filters.distance
        );
      })
      .sort((a, b) => {
        if (filters.sort === 'datePost') {
          return new Date(b.datePost) - new Date(a.datePost);
        } else if (filters.sort === 'name') {
          return a.name.localeCompare(b.name);
        }
        return 0;
      });
  };

  const filteredPets = applyFilters(lostPetsData);

  return (
    <section className="bg-white py-16">
      <div className="flex h-full">
        <div className="w-1/4 p-4 h-full">
          <Sidebar filters={filters} setFilters={setFilters} />
        </div>
        <div className="w-3/4 p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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

export default FoundPets; // and LostPets
