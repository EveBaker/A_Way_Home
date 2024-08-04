// src/app/home/page
import React from 'react';
import { Button } from '../app/MTailwind';
import Link from 'next/link';

const Homepage: React.FC = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto flex flex-col items-center md:flex-row gap-8">
        <div className="md:w-3/4 p-4 lg:w-3/4 mr-5 ">
          <h1 className="text-3xl font-bold">
            Providing A Way to bring Lost Pets Home
          </h1>
          <p className="mt-4 text-gray-600">
            At A Way Home, we are dedicated to reuniting lost pets with their
            families. Our platform offers a seamless way to report lost and
            found pets, connect with community resources, and mobilize
            volunteers. Every pet deserves to be home, and we are here to make
            that happen.
          </p>
          <Link href="/flyer">
            <Button
              className="mt-6 px-6 py-4 text-white rounded bg-primary-blue hover:border hover:border-bright-teal hover:bg-primary-blue hover:text-bright-teal focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue"
              type="submit"
            >
              Create Pet Post
            </Button>
          </Link>
        </div>
        <div className="md:w-full grid grid-cols-4 gap-4 p-4 lg:w-full ml-5">
          {/* Column 1 */}
          <div className="col-span-1 flex items-center justify-center">
            <img
              src="/assets/Josie.png"
              alt="Pet 1"
              className="w-full h-48 object-cover rounded-lg transform transition duration-300 hover:scale-105"
            />
          </div>
          {/* Column 2 */}
          <div className="col-span-1 flex flex-col justify-start gap-8 lg:mb-8">
            <img
              src="/assets/Atlas.png"
              alt="Pet 2"
              className="w-full h-48 object-cover rounded-lg transform transition duration-300 hover:scale-105"
            />
            <img
              src="/assets/Gracie.png"
              alt="Pet 3"
              className="w-full h-48 object-cover rounded-lg transform transition duration-300 hover:scale-105"
            />
          </div>
          {/* Column 3 */}
          <div className="col-span-1 flex flex-col justify-end gap-8">
            <img
              src="/assets/Lulu.png"
              alt="Pet 4"
              className="w-full h-48 object-cover rounded-lg transform transition duration-300 hover:scale-105"
            />
            <img
              src="/assets/Timmy.png"
              alt="Pet 5"
              className="w-full h-48 object-cover rounded-lg transform transition duration-300 hover:scale-105"
            />
          </div>
          {/* Column 4 */}
          <div className="col-span-1 flex flex-col justify-center gap-4 lg:mt-6">
            <img
              src="/assets/Lucy.png"
              alt="Pet 6"
              className="w-full h-48 object-cover rounded-lg transform transition duration-300 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Homepage;
