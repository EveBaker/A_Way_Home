'use client';
import React from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Typography,
  Button,
} from '../app/MTailwind';
import MessageForm from './MessageForm';

// Mock Data
const mockPet = {
  id: 1,
  name: 'Buddy',
  type: 'Dog',
  gender: 'Male',
  breed: 'Labrador',
  color: 'Black',
  location: 'Central Park, New York, NY',
  latitude: 40.785091,
  longitude: -73.968285,
  description: 'Friendly dog',
  contact_name: 'Pet Lover',
  contact_phone: '123-456-7890',
  contact_email: 'pets@example.com',
  flyer_image: 'https://picsum.photos/200/200?random=1',
};

const PetDetailsModal = ({ pet = mockPet, onClose }) => {
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    <Modal size="lg" active={true} toggler={onClose}>
      <ModalHeader toggler={onClose}>
        <Typography variant="h5" color="blue-gray">
          {pet.name || 'Pet Details'}
        </Typography>
      </ModalHeader>
      <ModalBody>
        <Typography variant="h6">Type: {pet.type}</Typography>
        <Typography>Gender: {pet.gender}</Typography>
        <Typography>Breed: {pet.breed || 'Unknown'}</Typography>
        <Typography>Color: {pet.color}</Typography>
        <Typography>Description: {pet.description}</Typography>
        <Typography>Location: {pet.location}</Typography>
        <Typography>Contact Name: {pet.contact_name}</Typography>
        <Typography>Contact Phone: {pet.contact_phone}</Typography>
        <Typography>Contact Email: {pet.contact_email}</Typography>
        <div className="mt-4">
          <iframe
            width="100%"
            height="300"
            frameBorder="0"
            src={`https://www.google.com/maps/embed/v1/place?key=${googleMapsApiKey}&q=${pet.latitude},${pet.longitude}`}
            allowFullScreen
          ></iframe>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button variant="gradient" color="red" onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default PetDetailsModal;
