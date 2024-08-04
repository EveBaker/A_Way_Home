import React from 'react';
import { Button } from '../app/MTailwind';

const PetCard = ({ pet, onMoreDetails, onContactPoster }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border-8 border-primary-blue cursor-pointer hover:shadow-lg transition-shadow duration-300 m-4">
      <div className="border-t-8 border-l-8 border-r-8 border-bright-teal overflow-hidden h-64">
        <img
          src={pet.photos[0]}
          alt={pet.name}
          className="w-full h-full object-cover object-center rounded-t-lg"
        />
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
      <p>Date Posted: {pet.datePost}</p>
      <div className="flex flex-col space-y-4 mt-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <Button
          fullWidth
          onClick={() => onMoreDetails(pet)}
          variant="gradient"
          size="sm"
          className="bg-primary-blue hover:border hover:border-bright-teal hover:bg-primary-blue hover:text-bright-teal"
        >
          More Details
        </Button>

        <Button
          fullWidth
          onClick={() => onContactPoster(pet)}
          variant="text"
          size="sm"
          className="bg-dark-blue text-white border-white border hover:border-2 hover:border-primary-blue hover:bg-bright-teal hover:text-primary-blue"
        >
          Contact Poster
        </Button>
      </div>
    </div>
  );
};

export default PetCard;
