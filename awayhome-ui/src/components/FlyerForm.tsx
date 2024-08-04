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
  CardFooter,
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
          <Input
            label="Name"
            size="lg"
            className="hover:bg-light-gray-2"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Select
            label="Type"
            size="lg"
            className="hover:bg-light-gray-2"
            value={formData.type}
            onChange={(value) =>
              handleChange({
                target: { name: 'type', value },
              } as ChangeEvent<HTMLSelectElement>)
            }
            required
          >
            <Option value="">Select Type</Option>
            <Option value="Dog">Dog</Option>
            <Option value="Cat">Cat</Option>
            <Option value="Other">Other</Option>
          </Select>
          <Select
            label="Gender"
            size="lg"
            className="hover:bg-light-gray-2"
            value={formData.sex}
            onChange={(value) =>
              handleChange({
                target: { name: 'sex', value },
              } as ChangeEvent<HTMLSelectElement>)
            }
            required
          >
            <Option value="">Select Gender</Option>
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
          </Select>
          <Input
            label="Breed"
            size="lg"
            className="hover:bg-light-gray-2"
            value={formData.breed}
            onChange={handleChange}
            required
          />
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Upload Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-gray-700"
            />
            {selectedPhoto && (
              <div className="mt-4 relative">
                <img
                  src={selectedPhoto}
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
          <Select
            label="Country"
            size="lg"
            className="hover:bg-light-gray-2"
            value={formData.address?.country}
            onChange={(value) =>
              handleChange({
                target: { name: 'country', value },
              } as ChangeEvent<HTMLSelectElement>)
            }
            required
          >
            <Option value="United States">United States</Option>
            <Option value="Canada">Canada</Option>
            <Option value="Mexico">Mexico</Option>
            <Option value="United Kingdom">United Kingdom</Option>
            {/* Add more countries as needed */}
          </Select>
          <Select
            label="State"
            size="lg"
            className="hover:bg-light-gray-2"
            value={formData.address?.state}
            onChange={(value) =>
              handleChange({
                target: { name: 'state', value },
              } as ChangeEvent<HTMLSelectElement>)
            }
            required
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
            size="lg"
            className="hover:bg-light-gray-2"
            value={formData.address?.city}
            onChange={handleChange}
            required
          />
          <Input
            label="ZIP Code"
            size="lg"
            className="hover:bg-light-gray-2"
            value={formData.address?.zip}
            onChange={handleChange}
            required
          />
          <Input
            label="Description"
            size="lg"
            className="hover:bg-light-gray-2"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <Select
            label="Status"
            size="lg"
            className="hover:bg-light-gray-2"
            value={formData.status}
            onChange={(value) =>
              handleChange({
                target: { name: 'status', value },
              } as ChangeEvent<HTMLSelectElement>)
            }
            required
          >
            <Option value="lost">Lost</Option>
            <Option value="found">Found</Option>
          </Select>
          <Select
            label="Size"
            size="lg"
            className="hover:bg-light-gray-2"
            value={formData.size}
            onChange={(value) =>
              handleChange({
                target: { name: 'size', value },
              } as ChangeEvent<HTMLSelectElement>)
            }
            required
          >
            <Option value="">Select Size</Option>
            <Option value="Small">Small</Option>
            <Option value="Medium">Medium</Option>
            <Option value="Large">Large</Option>
          </Select>
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
