'use client';
import React, { useState, ChangeEvent } from 'react';
import { db } from '../config/firebaseClient';
import { collection, addDoc } from 'firebase/firestore';
import {
  Input,
  Button,
  Select,
  Option,
  Typography,
  Card,
  CardHeader,
  CardBody,
} from '../app/MTailwind';

interface Pet {
  name?: string;
  type?: string;
  sex?: string;
  breed?: string;
  photos?: string[];
  address?: {
    country?: string;
    state?: string;
    city?: string;
    zip?: string;
  };
  description?: string;
  status?: string;
  size?: string;
  distance?: number;
  datePost?: string;
  userLogin?: string;
  username?: string;
  avatar?: string;
}

interface Filters {
  status?: string;
  distance?: number;
}

interface FlyerFormProps {
  pet?: Pet;
  filters: Filters;
}

const states = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
];

const FlyerForm: React.FC<FlyerFormProps> = ({ pet = {}, filters }) => {
  const [formData, setFormData] = useState<Pet>({
    name: pet.name || '',
    type: pet.type || '',
    sex: pet.sex || '',
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

  const [selectedPhoto, setSelectedPhoto] = useState<string>(
    formData.photos[0] || '',
  );

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
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setSelectedPhoto(reader.result as string);
          setFormData((prevFormData) => ({
            ...prevFormData,
            photos: [reader.result as string],
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeletePhoto = () => {
    setSelectedPhoto('');
    setFormData((prevFormData) => ({
      ...prevFormData,
      photos: [],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'pets'), formData);
      alert('Flyer created successfully!');
    } catch (error) {
      console.error('Error creating flyer: ', error);
      alert('Error creating flyer.');
    }
  };

  return (
    <div className="py-4 flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-lg mx-auto shadow-lg">
        <CardHeader className="mt-5 bg-primary-blue text-white text-center py-4">
          <Typography variant="h4" className="font-bold">
            Create Pet Flyer
          </Typography>
        </CardHeader>
        <CardBody className="p-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="mb-4"
            />
            <Select
              label="Type"
              name="type"
              value={formData.type}
              onChange={(value) =>
                handleChange({
                  target: { name: 'type', value },
                } as ChangeEvent<HTMLSelectElement>)
              }
              className="mb-4"
            >
              <Option value="">Select Type</Option>
              <Option value="Dog">Dog</Option>
              <Option value="Cat">Cat</Option>
              <Option value="Other">Other</Option>
            </Select>
            <Select
              label="Sex"
              name="sex"
              value={formData.sex}
              onChange={(value) =>
                handleChange({
                  target: { name: 'sex', value },
                } as ChangeEvent<HTMLSelectElement>)
              }
              className="mb-4"
            >
              <Option value="">Select Sex</Option>
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
            </Select>
            <Input
              label="Breed"
              name="breed"
              type="text"
              value={formData.breed}
              onChange={handleChange}
              className="mb-4"
            />
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Upload Photo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mb-4"
              />
              {selectedPhoto && (
                <div className="mt-4 relative">
                  <img
                    src={selectedPhoto}
                    alt="Selected"
                    className="w-full h-48 object-cover"
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
            <Select
              label="Country"
              name="country"
              value={formData.address?.country}
              onChange={(value) =>
                handleChange({
                  target: { name: 'country', value },
                } as ChangeEvent<HTMLSelectElement>)
              }
              className="mb-4"
            >
              <Option value="United States">United States</Option>
              <Option value="Canada">Canada</Option>
              <Option value="Mexico">Mexico</Option>
              <Option value="United Kingdom">United Kingdom</Option>
              {/* Add more countries as needed */}
            </Select>
            <Select
              label="State"
              name="state"
              value={formData.address?.state}
              onChange={(value) =>
                handleChange({
                  target: { name: 'state', value },
                } as ChangeEvent<HTMLSelectElement>)
              }
              className="mb-4"
            >
              <Option value="">Select State</Option>
              {states.map((state) => (
                <Option key={state} value={state}>
                  {state}
                </Option>
              ))}
            </Select>
            <Input
              label="City"
              name="city"
              type="text"
              value={formData.address?.city}
              onChange={handleChange}
              className="mb-4"
            />
            <Input
              label="ZIP Code"
              name="zip"
              type="text"
              value={formData.address?.zip}
              onChange={handleChange}
              className="mb-4"
            />
            <Input
              label="Description"
              name="description"
              type="text"
              value={formData.description}
              onChange={handleChange}
              className="mb-4"
            />
            <Select
              label="Status"
              name="status"
              value={formData.status}
              onChange={(value) =>
                handleChange({
                  target: { name: 'status', value },
                } as ChangeEvent<HTMLSelectElement>)
              }
              className="mb-4"
            >
              <Option value="lost">Lost</Option>
              <Option value="found">Found</Option>
            </Select>
            <Select
              label="Size"
              name="size"
              value={formData.size}
              onChange={(value) =>
                handleChange({
                  target: { name: 'size', value },
                } as ChangeEvent<HTMLSelectElement>)
              }
              className="mb-4"
            >
              <Option value="">Select Size</Option>
              <Option value="Small">Small</Option>
              <Option value="Medium">Medium</Option>
              <Option value="Large">Large</Option>
            </Select>

            <Button
              type="submit"
              variant="gradient"
              className="bg-indigo-500 text-white w-full"
            >
              Create Flyer
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default FlyerForm;
