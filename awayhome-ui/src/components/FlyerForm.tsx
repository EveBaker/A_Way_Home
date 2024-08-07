// src/components/flyerForm.tsx

'use client';
import React, { useState, ChangeEvent, useEffect } from 'react';
import { db, storage, auth } from '../config/firebaseClient';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { onAuthStateChanged } from 'firebase/auth';
import {
  Button,
  Typography,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from '../app/MTailwind';
import { Pet, Filters } from '../types';
import { states } from '../utils/states';

interface FlyerFormProps {
  pet?: Pet;
  filters: Filters;
}

const FlyerForm: React.FC<FlyerFormProps> = ({ pet = {}, filters }) => {
  const [formData, setFormData] = useState<Pet>({
    name: pet.name || '',
    type: pet.type || '',
    gender: pet.gender || '',
    breed: pet.breed || '',
    photos: pet.photos || [],
    address: pet.address || {
      country: 'United States',
      state: '',
      city: '',
      zip: '',
    },
    description: pet.description || '',
    status: pet.status || filters.status || '',
    size: pet.size || '',
    distance: pet.distance || filters.distance || 0,
    datePost: pet.datePost || new Date().toISOString(),
    userLogin: pet.userLogin || '',
    username: pet.username || '',
    avatar: pet.avatar || '',
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewPhoto, setPreviewPhoto] = useState<string>('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          userLogin: user.uid,
          username: user.displayName || '',
          avatar: user.photoURL || '',
        }));
      }
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    if (
      name === 'country' ||
      name === 'state' ||
      name === 'city' ||
      name === 'zip'
    ) {
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [name]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setPreviewPhoto(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeletePhoto = () => {
    setPreviewPhoto('');
    setSelectedFile(null);
    setFormData((prevFormData) => ({
      ...prevFormData,
      photos: [],
    }));
  };

  const getCoordinates = async (address: string) => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`,
    );
    const data = await response.json();
    if (data.results.length > 0) {
      const location = data.results[0].geometry.location;
      return location;
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fullAddress = `${formData.address.city}, ${formData.address.state}, ${formData.address.country}`;
    const location = await getCoordinates(fullAddress);

    if (location) {
      formData.address.latitude = location.lat;
      formData.address.longitude = location.lng;
    }

    try {
      let photoURL = '';
      if (selectedFile) {
        const photoRef = ref(storage, `pets/${formData.name}_${Date.now()}`);
        await uploadBytes(photoRef, selectedFile);
        photoURL = await getDownloadURL(photoRef);
        console.log('Photo URL:', photoURL); // Debug log
      }

      const newFormData = {
        ...formData,
        photos: photoURL ? [photoURL] : [],
      };

      await addDoc(collection(db, 'pets'), newFormData);
      alert('Flyer created successfully!');
    } catch (error) {
      console.error('Error creating flyer: ', error);
      alert('Error creating flyer.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto py-16">
      <Card className="bg-mid-gray text-dark-text border-2 hover:border-bright-teal">
        <CardHeader
          variant=""
          color="blue-gray"
          className="mb-4 grid h-28 place-items-center bg-light-gray border-4 border-primary-green"
        >
          <Typography variant="h3" color="blue-gray">
            Create Pet Poster
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-bold mb-2">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="w-full p-2 rounded-md border border-gray-300"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="type" className="block text-sm font-bold mb-2">
              Type
            </label>
            <select
              id="type"
              name="type"
              className="w-full p-2 rounded-md border border-gray-300"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="">Select Type</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="gender" className="block text-sm font-bold mb-2">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              className="w-full p-2 rounded-md border border-gray-300"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="breed" className="block text-sm font-bold mb-2">
              Breed
            </label>
            <input
              id="breed"
              name="breed"
              type="text"
              className="w-full p-2 rounded-md border border-gray-300"
              value={formData.breed}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="photo" className="block text-sm font-bold mb-2">
              Upload Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-gray-700"
            />
            {previewPhoto && (
              <div className="mt-4 relative">
                <img
                  src={previewPhoto}
                  alt="Selected"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={handleDeletePhoto}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="country" className="block text-sm font-bold mb-2">
              Country
            </label>
            <select
              id="country"
              name="country"
              className="w-full p-2 rounded-md border border-gray-300"
              value={formData.address?.country}
              onChange={handleChange}
              required
            >
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="Mexico">Mexico</option>
              <option value="United Kingdom">United Kingdom</option>
              {/* Add more countries as needed */}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="state" className="block text-sm font-bold mb-2">
              State
            </label>
            <select
              id="state"
              name="state"
              className="w-full p-2 rounded-md border border-gray-300"
              value={formData.address?.state}
              onChange={handleChange}
              required
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="city" className="block text-sm font-bold mb-2">
              City
            </label>
            <input
              id="city"
              name="city"
              type="text"
              className="w-full p-2 rounded-md border border-gray-300"
              value={formData.address?.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="zip" className="block text-sm font-bold mb-2">
              ZIP Code
            </label>
            <input
              id="zip"
              name="zip"
              type="text"
              className="w-full p-2 rounded-md border border-gray-300"
              value={formData.address?.zip}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-bold mb-2"
            >
              Description
            </label>
            <input
              id="description"
              name="description"
              type="text"
              className="w-full p-2 rounded-md border border-gray-300"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="status" className="block text-sm font-bold mb-2">
              Status
            </label>
            <select
              id="status"
              name="status"
              className="w-full p-2 rounded-md border border-gray-300"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="lost">Lost</option>
              <option value="found">Found</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="size" className="block text-sm font-bold mb-2">
              Size
            </label>
            <select
              id="size"
              name="size"
              className="w-full p-2 rounded-md border border-gray-300"
              value={formData.size}
              onChange={handleChange}
              required
            >
              <option value="">Select Size</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            variant="text"
            className="text-white bg-primary-green border-2 border-primary-blue hover:border-2 hover:border-primary-blue hover:bg-bright-teal hover:text-primary-blue"
            fullWidth
            type="submit"
          >
            Post A Pet
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default FlyerForm;
