// src/components/PetCard.tsx
'use client';

import React, { useState } from 'react';
import { Button } from '../app/MTailwind';
import MessageForm from './MessageForm';
import PetModal from './PetModal';
import { Pet } from '../types';

interface PetCardProps {
  pet: Pet;
  onMoreDetails?: (pet: Pet) => void;
  onContactPoster?: (pet: Pet) => void;
}

const PetCard: React.FC<PetCardProps> = ({
  pet,
  onMoreDetails,
  onContactPoster,
}) => {
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [showPetModal, setShowPetModal] = useState(false);

  const handleToggleMessageForm = () => {
    setShowMessageForm(!showMessageForm);
  };

  const handleTogglePetModal = () => {
    setShowPetModal(!showPetModal);
  };

  console.log('Pet photos:', pet.photos); // Add this line to debug the photos

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border-8 border-primary-blue cursor-pointer hover:shadow-lg transition-shadow duration-300 m-4">
      <div className="border-t-8 border-l-8 border-r-8 border-bright-teal overflow-hidden h-64">
        {pet.photos && pet.photos.length > 0 ? (
          <img
            src={pet.photos[0]}
            alt={pet.name}
            className="w-full h-full object-cover object-center rounded-t-lg"
            onError={(e) => {
              e.currentTarget.src = '/assets/default-image.png'; // Fallback image path
            }}
          />
        ) : (
          <img
            src="/assets/default-image.png"
            alt="Default"
            className="w-full h-full object-cover object-center rounded-t-lg"
          />
        )}
      </div>
      <h3 className="text-lg font-bold mb-2 bg-bright-teal text-center border-b-4 border-dark-blue">
        {pet.name}
      </h3>
      <p>Type: {pet.type}</p>
      <p>Breed: {pet.breed}</p>
      <p>
        Location: {pet.address.city}, {pet.address.country}
      </p>
      <p>Size: {pet.size}</p>
      <p>Date Posted: {new Date(pet.datePost).toLocaleDateString()}</p>
      <div className="flex flex-col space-y-4 mt-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <Button
          fullWidth
          onClick={handleTogglePetModal}
          variant="gradient"
          size="sm"
          className="bg-primary-blue hover:border hover:border-bright-teal hover:bg-primary-blue hover:text-bright-teal"
        >
          More Details
        </Button>
        <Button
          fullWidth
          onClick={handleToggleMessageForm}
          variant="text"
          size="sm"
          className="bg-dark-blue text-white border-white border hover:border-2 hover:border-primary-blue hover:bg-bright-teal hover:text-primary-blue"
        >
          Contact Poster
        </Button>
      </div>
      {showPetModal && <PetModal pet={pet} onClose={handleTogglePetModal} />}
      {showMessageForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative bg-white rounded-lg overflow-hidden shadow-lg w-3/4 max-w-2xl border-2 border-indigo-500 p-5">
            <MessageForm
              receiverId={pet.userLogin} // Ensure this is securely handled in the MessageForm component
              onClose={handleToggleMessageForm}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PetCard;
