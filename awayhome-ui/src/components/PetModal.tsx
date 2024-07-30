import React from 'react';

const PetModal = ({ pet, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="relative bg-white rounded-lg overflow-hidden shadow-lg w-3/4 max-w-2xl border-2 border-indigo-500">
        <button className="absolute top-2 right-2 bg-gray-300 rounded-full p-1" onClick={onClose}>
          &times;
        </button>
        <div className="relative h-96 mb-4 border-x-8 border-t-8 border-indigo-500 rounded-md overflow-hidden">
          <img src={pet.photos[0]} alt={pet.name} className="w-full h-full object-cover" />
        </div>
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-2">{pet.name}</h2>
          <p><strong>Type:</strong> {pet.type}</p>
          <p><strong>Breed:</strong> {pet.breed}</p>
          <p><strong>Sex:</strong> {pet.sex}</p>
          <p><strong>Size:</strong> {pet.size}</p>
          <p><strong>Date Posted:</strong> {pet.datePost}</p>
          <p><strong>Location:</strong> {pet.address.city}, {pet.address.country}</p>
          <p><strong>Description:</strong> {pet.description}</p>
        </div>
      </div>
    </div>
  );
};

export default PetModal;
