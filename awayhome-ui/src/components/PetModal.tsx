import React, { useEffect, useRef } from 'react';

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

interface PetModalProps {
  pet: Pet;
  onClose: () => void;
}

const PetModal: React.FC<PetModalProps> = ({ pet, onClose }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = () => {
      if (mapRef.current && pet.address) {
        const { city, state, zip, country } = pet.address;
        const address = `${city}, ${state} ${zip}, ${country}`;

        const geocoder = new window.google.maps.Geocoder();
        const map = new window.google.maps.Map(mapRef.current, {
          zoom: 12,
          center: { lat: 0, lng: 0 },
        });

        geocoder.geocode({ address }, (results, status) => {
          if (status === 'OK' && results[0]) {
            map.setCenter(results[0].geometry.location);
            new window.google.maps.Marker({
              map,
              position: results[0].geometry.location,
            });
          }
        });
      }
    };

    if (window.google && window.google.maps) {
      initMap();
    } else {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);
    }
  }, [pet.address]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative bg-white rounded-lg overflow-hidden shadow-lg w-3/4 max-w-2xl border-2 border-indigo-500">
        <div className="relative h-96 mb-4 border-x-8 border-t-8 border-indigo-500 rounded-md overflow-hidden">
          <img
            src={pet.photos?.[0] || '/placeholder-image.png'}
            alt={pet.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-2">{pet.name}</h2>
          <p>
            <strong>Type:</strong> {pet.type}
          </p>
          <p>
            <strong>Breed:</strong> {pet.breed}
          </p>
          <p>
            <strong>Sex:</strong> {pet.sex}
          </p>
          <p>
            <strong>Size:</strong> {pet.size}
          </p>
          <p>
            <strong>Date Posted:</strong> {pet.datePost}
          </p>
          <p>
            <strong>Location:</strong> {pet.address?.city}, {pet.address?.state}
            , {pet.address?.zip}, {pet.address?.country}
          </p>
          <p>
            <strong>Description:</strong> {pet.description}
          </p>
          <button
            onClick={onClose}
            className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300"
          >
            Close
          </button>
        </div>
        <div ref={mapRef} className="h-96 w-full"></div>
      </div>
    </div>
  );
};

export default PetModal;
