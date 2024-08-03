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
import NavList from './NavList';
import { auth } from '../config/firebaseClient';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import CloseIcon from '../assets/CloseIcon';
import MenuIcon from '../assets/MenuIcon';

const Navbar: React.FC = () => {
  const [openNav, setOpenNav] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <MTNavbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-4 lg:px-8 lg:py-4 bg-blue-900 text-white border-none bg-opacity-100">
      <div className="flex items-center justify-between text-white">
        <Link href="/">
          <div className="mr-4 py-1.5 flex items-center cursor-pointer">
            <Image
              src="/assets/logo-mt.png"
              alt="Logo"
              width={140}
              height={60}
              style={{ width: 'auto', height: 'auto' }}
              className="mr-2"
            />
          </div>
        </Link>
        <div className="hidden lg:flex items-center gap-4">
          <NavList />
        </div>
        <div className="flex items-center gap-x-2">
          {loading ? (
            <span>Loading...</span>
          ) : user ? (
            <>
              <span className="hidden lg:inline-block text-size-xl mr-5">
                Hello, {user.displayName || user.email || 'User'}
              </span>
              <Button
                variant="text"
                size="sm"
                className="hidden lg:inline-block text-white border border hover:border-2 hover:border-primary-blue hover:bg-bright-teal hover:text-primary-blue"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
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
            </>
          )}
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </div>
      </div>
      <Collapse open={openNav}>
        <NavList />
        <div className="flex flex-col gap-y-2 lg:hidden">
          {loading ? (
            <span>Loading...</span>
          ) : user ? (
            <>
              <span>Hello, {user.displayName || user.email || 'User'}</span>
              <Button
                fullWidth
                variant="text"
                size="sm"
                className="bg-dark-blue text-white border-white border hover:border-2 hover:border-primary-blue hover:bg-bright-teal hover:text-primary-blue"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </Collapse>
    </MTNavbar>
  );
};

export default Navbar;
