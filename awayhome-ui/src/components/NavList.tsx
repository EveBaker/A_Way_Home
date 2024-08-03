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
      <li>
        <Link
          href="/contact"
          className="text-white font-normal hover:text-bright-teal hover:font-bold"
        >
          Contact
        </Link>
      </li>
      <li>
        <Link
          href="/about"
          className="text-white font-normal hover:text-bright-teal hover:font-bold"
        >
          About Us
        </Link>
      </li>
    </ul>
  );
};

export default NavList;
