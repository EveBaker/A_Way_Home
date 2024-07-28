// src/components/LostPets.tsx
'use client';

import React, { useState, useEffect } from 'react';
// import api from '../utils/axiosConfig';
import Sidebar from './Sidebar';
import PetDetailsModal from './PetDetailsModal';
import MessageForm from './MessageForm';

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '../app/MTailwind';

// Mock Data
const mockLostPets = [
  {
    id: 1,
    name: 'Buddy',
    type: 'Dog',
    gender: 'Male',
    breed: 'Labrador',
    color: 'Black',
    location: 'Central Park, New York, NY',
    distance: 5,
    flyer_image: 'https://picsum.photos/200/200?random=1',
    latitude: 40.785091,
    longitude: -73.968285,
    description: 'Friendly dog',
    contact_name: 'Pet Lover',
    contact_phone: '123-456-7890',
    contact_email: 'pets@example.com',
  },
  {
    id: 2,
    name: 'Whiskers',
    type: 'Cat',
    gender: 'Female',
    breed: 'Siamese',
    color: 'Cream',
    location: 'Brooklyn, NY',
    distance: 3,
    flyer_image: 'https://picsum.photos/200/200?random=2',
    latitude: 40.6782,
    longitude: -73.9442,
    description: 'Sweet cat',
    contact_name: 'Pet Lover',
    contact_phone: '123-456-7890',
    contact_email: 'pets@example.com',
  },
  {
    id: 3,
    name: 'Max',
    type: 'Dog',
    gender: 'Male',
    breed: 'Bulldog',
    color: 'Brown',
    location: 'Queens, NY',
    distance: 7,
    flyer_image: 'https://picsum.photos/200/200?random=3',
    latitude: 40.7282,
    longitude: -73.7949,
    description: 'Calm and friendly',
    contact_name: 'Pet Lover',
    contact_phone: '123-456-7890',
    contact_email: 'pets@example.com',
  },
  // Add more mock pets as needed
];

const LostPets = () => {
  const [lostPets, setLostPets] = useState(mockLostPets);
  const [selectedPet, setSelectedPet] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMessageFormOpen, setIsMessageFormOpen] = useState(false);

  useEffect(() => {
    // Commented out API call for now
    // api.get('/pet-flyers?status=lost')
    //   .then((response) => {
    //     setLostPets(response.data);
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching Lost Pets: ', error);
    //   });
  }, []);

  const handleMoreDetails = (pet) => {
    setSelectedPet(pet);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPet(null);
  };

  const handleContactPoster = (pet) => {
    setSelectedPet(pet);
    setIsMessageFormOpen(true);
  };

  const handleCloseMessageForm = () => {
    setIsMessageFormOpen(false);
    setSelectedPet(null);
  };

  return (
    <section className="bg-white py-16 flex-grow">
      <div className="flex">
        <Sidebar />
        <div className="flex-grow p-4">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
            {lostPets.map((pet) => (
              <Card key={pet.id} className="border-8 border-indigo-500">
                <CardHeader
                  floated={false}
                  color="blue-gray"
                  className="relative h-56 border-x-8 border-t-8 border-indigo-500"
                >
                  <img
                    src={pet.flyer_image || 'https://via.placeholder.com/200'}
                    alt={`Lost pet ${pet.name}`}
                    className="w-full h-full object-cover"
                  />
                </CardHeader>
                <CardBody>
                  <Typography variant="h5" color="blue-gray" className="mb-2">
                    {pet.name || 'Unknown'}
                  </Typography>
                  <Typography>Type: {pet.type}</Typography>
                  <Typography>Gender: {pet.gender}</Typography>
                  <Typography>Breed: {pet.breed || 'Unknown'}</Typography>
                  <Typography>Color: {pet.color}</Typography>
                  <Typography>Location: {pet.location}</Typography>
                  <Typography>
                    Distance: {pet.distance || 'Unknown'} miles
                  </Typography>
                </CardBody>
                <CardFooter
                  divider
                  className="flex items-center justify-between py-3"
                >
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      fullWidth
                      variant="text"
                      size="sm"
                      className="bg-dark-blue text-white border-white border hover:border-2 hover:border-primary-blue hover:bg-bright-teal hover:text-primary-blue"
                      onClick={() => handleMoreDetails(pet)}
                    >
                      More Details
                    </Button>
                    <Button
                      fullWidth
                      variant="gradient"
                      size="sm"
                      className="bg-primary-blue hover:border hover:border-bright-teal hover:bg-primary-blue hover:text-bright-teal"
                      onClick={() => handleContactPoster(pet)}
                    >
                      Contact Poster
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <PetDetailsModal pet={selectedPet} onClose={handleCloseModal} />
      )}

      {isMessageFormOpen && (
        <Modal size="lg" active={true} toggler={handleCloseMessageForm}>
          <ModalHeader toggler={handleCloseMessageForm}>
            <Typography variant="h5" color="blue-gray">
              Contact Poster
            </Typography>
          </ModalHeader>
          <ModalBody>
            <MessageForm
              receiverId={selectedPet.user_id}
              onClose={handleCloseMessageForm}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              variant="gradient"
              color="blue-gray"
              onClick={handleCloseMessageForm}
            >
              Close
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </section>
  );
};

export default LostPets;
