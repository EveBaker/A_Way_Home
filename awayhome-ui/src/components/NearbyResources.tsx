'use client';
import 'dotenv/config';
import React, { useEffect, useState } from 'react';
import useUserLocation from '../hooks/useUserLocation';

const NearbyResources = ({ type }: { type: string }) => {
  const location = useUserLocation();
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const loadPlaces = () => {
      if (location) {
        const service = new window.google.maps.places.PlacesService(
          document.createElement('div'),
        );
        const request = {
          location: new window.google.maps.LatLng(location.lat, location.lng),
          radius: '5000', // 5 kilometers
          type,
        };

        service.nearbySearch(request, (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            setPlaces(results);
          } else {
            console.error(
              'PlacesService was not successful for the following reason: ' +
                status,
            );
          }
        });
      }
    };

    if (window.google && window.google.maps && window.google.maps.places) {
      loadPlaces();
    } else {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = loadPlaces;
      document.head.appendChild(script);
    }
  }, [location, type]);

  return (
    <div className="w-full max-w-sm mx-auto mb-4 shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-white bg-primary-blue">
        {type === 'veterinary_care' ? 'Veterinarians' : 'Animal Shelters'} Near
        Me
      </h2>
      <ul>
        {places.map((place) => (
          <li key={place.place_id} className="mb-2">
            <h3 className="text-lg font-bold">{place.name}</h3>
            <p>{place.vicinity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NearbyResources;
