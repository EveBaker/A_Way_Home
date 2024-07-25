// src/app/home/page
import React from 'react';

const Homepage: React.FC = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto flex flex-col items-center md:flex-row">
        <div className="md:w-1/2 p-4">
          <h1 className="text-3xl font-bold">Providing a way to bring lost pets home</h1>
          <p className="mt-4 text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel eros ac nisl pharetra auctor nec a urna. Mauris hendrerit diam dolor, ut euismod sapien accumsan in.</p>
          <button className="mt-6 px-6 py-2 bg-blue-900 text-white rounded">Contact Us</button>
        </div>
        <div className="md:w-1/2 flex flex-wrap p-4 gap-4 justify-center">
          <img src="https://picsum.photos/200/300" alt="Pet 1" className="w-1/3 h-48 object-cover rounded-lg" />
          <img src="https://picsum.photos/201/300" alt="Pet 2" className="w-1/3 h-48 object-cover rounded-lg" />
          <img src="https://picsum.photos/202/300" alt="Pet 3" className="w-1/3 h-48 object-cover rounded-lg" />
          <img src="https://picsum.photos/203/300" alt="Pet 4" className="w-1/3 h-48 object-cover rounded-lg" />
          <img src="https://picsum.photos/204/300" alt="Pet 5" className="w-1/3 h-48 object-cover rounded-lg" />
          <img src="https://picsum.photos/205/300" alt="Pet 6" className="w-1/3 h-48 object-cover rounded-lg" />
        </div>
      </div>
    </section>
  );
};

export default Homepage;
