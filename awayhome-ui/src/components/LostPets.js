import React from 'react';
import Sidebar from './Sidebar';

const LostPets = () => {
  return (
    <section className="bg-white py-16">
      <div className="flex">
        {/* Sidebar Container */}
        <div className="w-1/4 p-4 bg-gray-200">
          <Sidebar />
        </div>
        
        {/* Main Content */}
        <div className="w-3/4 p-4">
          <div className="grid grid-cols-3 gap-4">
            {[...Array(12)].map((_, index) => (
              <div key={index} className="bg-gray-200 p-4 rounded-lg shadow-md">
                <img src={`https://picsum.photos/200/200?random=${index}`} alt={`Lost pet ${index + 1}`} className="w-full h-32 object-cover rounded-md mb-4" />
                <h3 className="text-lg font-bold mb-2">Lost {`{type}`}!</h3>
                <p>Type: Cat</p>
                <p>Gender: Female</p>
                <p>Breed: Unknown</p>
                <p>Color: Black</p>
                <p>Location: City</p>
                <p>Distance: 5 miles</p>
                <div className="mt-4 flex justify-between">
                  <button className="bg-red-500 text-white px-4 py-2 rounded-md">Learn more</button>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Contact</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LostPets;
