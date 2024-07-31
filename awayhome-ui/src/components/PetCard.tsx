import React from 'react';

const PetCard = ({ pet, onMoreDetails, onContactPoster }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border-8 border-blue-900 cursor-pointer hover:shadow-lg transition-shadow duration-300 m-4">
      <div className="border-4 border-blue-500 rounded-md overflow-hidden h-64">
        <img src={pet.photos[0]} alt={pet.name} className="w-full h-full object-cover" />
      </div>
      <h3 className="text-lg font-bold mb-2">{pet.name}</h3>
      <p>Type: {pet.type}</p>
      <p>Breed: {pet.breed}</p>
      <p>Location: {pet.address.city}, {pet.address.country}</p>
      <p>Size: {pet.size}</p>
      <p>Date Posted: {pet.datePost}</p>
      <div className="flex space-x-4 mt-4">
        <button
          onClick={() => onMoreDetails(pet)}
          className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
        >
          More Details
        </button>
        <button
          onClick={() => onContactPoster(pet)}
          className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors duration-300"
        >
          Contact Poster
        </button>
      </div>
    </div>
  );
};

export default PetCard;
