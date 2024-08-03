// hooks/useUserLocation.ts
import { useEffect, useState } from 'react';

const useUserLocation = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null,
  );

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location', error);
        },
      );
    }
  }, []);

  return location;
};

export default useUserLocation;
