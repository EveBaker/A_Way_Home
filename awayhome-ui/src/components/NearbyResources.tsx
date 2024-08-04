'use client';
import 'dotenv/config';
import React, { useEffect, useState } from 'react';
import useUserLocation from '../hooks/useUserLocation';

const NearbyResources = ({ type }: { type: string }) => {
  const location = useUserLocation();
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const loadPlaces = async () => {
      if (location) {
        const service = new window.google.maps.places.PlacesService(
          document.createElement('div'),
        );
        const request = {
          location: new window.google.maps.LatLng(location.lat, location.lng),
          radius: '5000', // 5 kilometers
          type: type,
          keyword: type === 'animal_shelter' ? 'animal shelter' : undefined,
        };

        const nearbySearchCallback = (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            const detailedPlacesPromises = results.map((place) => {
              return new Promise((resolve) => {
                service.getDetails(
                  {
                    placeId: place.place_id,
                    fields: [
                      'name',
                      'vicinity',
                      'rating',
                      'user_ratings_total',
                      'opening_hours',
                      'formatted_phone_number',
                      'website',
                    ],
                  },
                  (detailedPlace, detailsStatus) => {
                    if (
                      detailsStatus ===
                      window.google.maps.places.PlacesServiceStatus.OK
                    ) {
                      resolve(detailedPlace);
                    } else {
                      resolve(null);
                    }
                  },
                );
              });
            });

            Promise.all(detailedPlacesPromises).then((detailedPlaces) => {
              setPlaces(detailedPlaces.filter(Boolean)); // Remove null results
            });
          } else {
            console.error(
              'PlacesService was not successful for the following reason: ' +
                status,
            );
          }
        };

        service.nearbySearch(request, nearbySearchCallback);
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

  const extractDomain = (url) => {
    try {
      const { hostname } = new URL(url);
      return hostname;
    } catch (error) {
      return url;
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto mb-4 shadow-lg rounded-lg overflow-hidden ">
      <h2 className="text-2xl font-bold mb-4 text-center text-white bg-primary-blue py-2">
        {type === 'veterinary_care' ? 'Veterinarians' : 'Animal Shelters'} Near
        Me
      </h2>
      <ul className="bg-white p-4 text-black">
        {places.map((place) => (
          <li key={place.place_id} className="mb-4 p-4 bg-gray-100 rounded-lg">
            <h3 className="text-lg font-bold mb-2">{place.name}</h3>
            <p className="text-gray-700 mb-1">{place.vicinity}</p>
            {place.rating && (
              <p className="text-gray-700">
                <strong>Rating:</strong> {place.rating} (
                {place.user_ratings_total} reviews)
              </p>
            )}
            {place.opening_hours && (
              <p
                className={`text-gray-700 ${place.opening_hours.open_now ? 'text-green-500' : 'text-red-500'}`}
              >
                {place.opening_hours.open_now ? 'Open Now' : 'Closed'}
              </p>
            )}
            {place.formatted_phone_number && (
              <p className="text-gray-700">
                <strong>Phone:</strong> {place.formatted_phone_number}
              </p>
            )}
            {place.website && (
              <p className="text-gray-700">
                <strong>Website:</strong>{' '}
                <a
                  href={place.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {extractDomain(place.website)}
                </a>
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NearbyResources;
