// src/types.ts

export interface Address {
  city: string;
  country: string;
}

export interface Pet {
  id: number;
  name: string;
  type: string;
  sex: string;
  size: string;
  status: string;
  datePost: string;
  address: Address;
  photos: string[];
  distance: number;
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
