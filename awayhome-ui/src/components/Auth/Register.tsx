// src/componenets/Auth/Register
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from '../../app/MTailwind';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const Register: React.FC<{ setActiveTab: (tab: string) => void }> = ({ setActiveTab }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <Card className="w-96 bg-mid-gray text-dark-text border-2 hover:border-bright-teal">
        <CardHeader
          variant=""
          color="blue-gray"
          className="mb-4 grid h-28 place-items-center bg-light-gray border-4 border-primary-green"
        >
          <Typography variant="h3" color="blue-gray">
            Sign Up
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input label="Email" size="lg" className='hover:bg-light-gray-2' value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input label="Password" size="lg" className='hover:bg-light-gray-2' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" fullWidth type="submit">
            Sign Up
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Already have an account?&nbsp;
            <Typography
              as="a"
              href="#"
              variant="small"
              color="blue"
              className="font-bold"
              onClick={() => setActiveTab('login')}
            >
              Sign in
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
    </form>
  );
};

export default Register;
