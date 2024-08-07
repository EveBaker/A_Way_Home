// src/utils/filters.ts
import { Pet, Filters } from '../types';

export const applyFilters = (
  pets: Pet[],
  filters: Filters,
  userCoordinates: { lat: number; lng: number } | null,
): Pet[] => {
  return pets
    .filter((pet) => {
      const petCoordinates = {
        lat: pet.address?.latitude || 0,
        lng: pet.address?.longitude || 0,
      };
      const distance = userCoordinates
        ? calculateDistance(userCoordinates, petCoordinates)
        : 0;

      return (
        (filters.idOrName === '' ||
          (pet.name &&
            (pet.name.toLowerCase().includes(filters.idOrName.toLowerCase()) ||
              pet.id?.toString() === filters.idOrName))) &&
        (filters.status === '' ||
          (pet.status &&
            pet.status.toLowerCase() === filters.status.toLowerCase())) &&
        (filters.type === '' ||
          (pet.type &&
            pet.type.toLowerCase() === filters.type.toLowerCase())) &&
        (filters.gender === '' ||
          (pet.gender &&
            pet.gender.toLowerCase() === filters.gender.toLowerCase())) &&
        (filters.size === '' ||
          (pet.size &&
            pet.size.toLowerCase() === filters.size.toLowerCase())) &&
        (filters.location === '' ||
          (pet.address?.city &&
            pet.address.city
              .toLowerCase()
              .includes(filters.location.toLowerCase()))) &&
        (filters.distance === 0 || distance <= filters.distance)
      );
    })
    .sort((a, b) => {
      if (filters.sort === 'datePost') {
        return (
          new Date(b.datePost || 0).getTime() -
          new Date(a.datePost || 0).getTime()
        );
      } else if (filters.sort === 'name') {
        return (a.name || '').localeCompare(b.name || '');
      }
      return 0;
    });
};

const toRadians = (degrees: number) => degrees * (Math.PI / 180);

const calculateDistance = (
  coord1: { lat: number; lng: number },
  coord2: { lat: number; lng: number },
): number => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = toRadians(coord2.lat - coord1.lat);
  const dLng = toRadians(coord2.lng - coord1.lng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(coord1.lat)) *
      Math.cos(toRadians(coord2.lat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
};
