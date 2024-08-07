// src/api/pets.js

import api from '../config/axiosConfig';

export const fetchPets = async () => {
  const response = await api.get('/api/pets');
  return response.data;
};
