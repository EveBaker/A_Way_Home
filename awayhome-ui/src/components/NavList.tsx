// src/components/NavList.tsx
'use client';
import React from 'react';
import Link from 'next/link';

const NavList: React.FC = () => {
  return (
    <ul className="mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 text-white">
      <li>
        <Link
          href="/"
          className="text-white font-normal hover:text-bright-teal hover:font-bold"
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          href="/flyer"
          className="text-white font-normal hover:text-bright-teal hover:font-bold"
        >
          Post a Pet
        </Link>
      </li>
      <li>
        <Link
          href="/lost-pets"
          className="text-white font-normal hover:text-bright-teal hover:font-bold"
        >
          Lost Pets
        </Link>
      </li>
      <li>
        <Link
          href="/found-pets"
          className="text-white font-normal hover:text-bright-teal hover:font-bold"
        >
          Found Pets
        </Link>
      </li>
      <li className="relative group">
        <span className="cursor-pointer text-white font-normal hover:text-bright-teal hover:font-bold">
          Resources
        </span>
        <ul className="absolute hidden group-hover:block bg-white text-dark-green shadow-lg rounded-lg mt-1">
          <li>
            <Link
              href="/resources/shelters"
              className="block px-4 py-2 hover:bg-primary-green hover:text-white"
            >
              Shelters
            </Link>
          </li>
          <li>
            <Link
              href="/resources/veterinarians"
              className="block px-4 py-2 hover:bg-primary-green hover:text-white"
            >
              Veterinarians
            </Link>
          </li>
        </ul>
      </li>
      <li>
        <Link
          href="/contact"
          className="text-white font-normal hover:text-bright-teal hover:font-bold"
        >
          Contact Us
        </Link>
      </li>
    </ul>
  );
};

export default NavList;
