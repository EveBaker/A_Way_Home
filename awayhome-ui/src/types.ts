// src/types.ts

export interface Address {
  street?: string;
  city?: string;
  country?: string;
  state?: string;
  zip?: string;
  latitude?: number;
  longitude?: number;
}

export interface Pet {
  id?: string; // Ensure ID is included if needed for filtering by ID
  name?: string;
  type?: string;
  gender?: string;
  breed?: string;
  photos?: string[];
  address?: Address;
  description?: string;
  status?: string;
  size?: string;
  distance?: number;
  datePost?: string;
  userLogin?: string;
  username?: string;
  avatar?: string;
}

export interface Filters {
  idOrName: string;
  status: string;
  type: string;
  gender: string;
  size: string;
  location: string;
  distance: number;
  sort: 'datePost' | 'name';
}

export interface User {
  username: string;
  avatar: string;
}

export interface UserPet {
  pet: Pet;
  user: User;
}
