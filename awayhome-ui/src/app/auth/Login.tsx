// src/components/Auth/Login.tsx
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
  Checkbox,
  Button,
  IconButton,
} from '../../app/MTailwind';
import { loginUser } from '../../api/auth';
import EyeOpen from '../../assets/EyeOpen';
import EyeClosed from '../../assets/EyeClosed';

interface LoginProps {
  setActiveTab: (tab: 'login' | 'register') => void;
}

const Login: React.FC<LoginProps> = ({ setActiveTab }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { idToken } = await loginUser(email, password);
      console.log('User logged in:', idToken);
      localStorage.setItem('accessToken', idToken); // Save the token in localStorage
      router.push('/');
    } catch (error) {
      console.error('Error logging in:', error);
      alert(error.response?.data?.error || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleLogin} className="w-full max-w-md mx-auto">
      <Card className="bg-mid-gray text-dark-text border-2 hover:border-bright-teal">
        <CardHeader
          variant="primary"
          color="blue-gray"
          className="mb-4 grid h-28 place-items-center bg-light-gray border-4 border-primary-green"
        >
          <Typography variant="h3" color="blue-gray">
            Sign In
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input
            label="Email"
            size="lg"
            className="hover:bg-light-gray-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="relative">
            <Input
              label="Password"
              size="lg"
              className="hover:bg-light-gray-2"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <IconButton
              variant="text"
              className="absolute inset-y-0 right-0 mr-2 pr-1 flex items-center text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOpen /> : <EyeClosed />}
            </IconButton>
          </div>
          <div className="-ml-2.5">
            <Checkbox label="Remember Me" />
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            variant="text"
            className="text-white bg-primary-green border-2 border-primary-blue hover:border-2 hover:border-primary-blue hover:bg-bright-teal hover:text-primary-blue"
            fullWidth
            type="submit"
          >
            Sign In
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Don&apos;t have an account?
            <Typography
              as="a"
              href="#signup"
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold"
              onClick={() => setActiveTab('register')}
            >
              Sign up
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
    </form>
  );
};

export default Login;
