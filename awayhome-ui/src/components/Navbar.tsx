// src/components/Navbar.tsx

'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Navbar as MTNavbar,
  Collapse,
  Button,
  IconButton,
} from '../app/MTailwind';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Navbar: React.FC = () => {
  const [openNav, setOpenNav] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) setOpenNav(false);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const navList = (
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

  return (
    <MTNavbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-4 lg:px-8 lg:py-4 bg-blue-900 text-white border-none bg-opacity-100 ">
      <div className="flex items-center justify-between text-white">
        <Link href="/">
          <div className="mr-4 py-1.5 flex items-center cursor-pointer">
            <Image
              src="/assets/logo-mt.png"
              alt="Logo"
              width={140}
              height={60}
              className="mr-2"
            />
          </div>
        </Link>
        <div className="hidden lg:flex items-center gap-4">{navList}</div>
        <div className="flex items-center gap-x-2">
          <Link href="/register">
            <Button
              variant="text"
              size="sm"
              className="hidden lg:inline-block text-white border border hover:border-2 hover:border-primary-blue hover:bg-bright-teal hover:text-primary-blue"
            >
              Register
            </Button>
          </Link>
          <Link href="/login">
            <Button
              variant="gradient"
              size="md"
              className="hidden lg:inline-block bg-primary-blue hover:border hover:border-bright-teal hover:bg-primary-blue hover:text-bright-teal"
            >
              Sign In
            </Button>
          </Link>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>
      <Collapse open={openNav}>
        {navList}
        <div className="flex flex-col gap-y-2 lg:hidden">
          <Link href="/register">
            <Button
              fullWidth
              variant="text"
              size="sm"
              className="bg-dark-blue text-white border-white border hover:border-2 hover:border-primary-blue hover:bg-bright-teal hover:text-primary-blue"
            >
              Register
            </Button>
          </Link>
          <Link href="/login">
            <Button
              fullWidth
              variant="gradient"
              size="sm"
              className="bg-primary-blue hover:border hover:border-bright-teal hover:bg-primary-blue hover:text-bright-teal"
            >
              Sign In
            </Button>
          </Link>
        </div>
      </Collapse>
    </MTNavbar>
  );
};

export default Navbar;
