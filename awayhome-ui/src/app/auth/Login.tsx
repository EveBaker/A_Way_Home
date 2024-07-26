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
import { loginUser } from '../../utils/axiosConfig';

const Login: React.FC<{ setActiveTab?: (tab: string) => void }> = ({
  setActiveTab,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(email, password);
      console.log('User logged in:', data);
      localStorage.setItem('token', data.token);
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
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.875 18.825A9.963 9.963 0 0112 19c-4.478 0-8.268-2.943-9.542-7 1.274-4.057 5.064-7 9.542-7 .898 0 1.766.114 2.594.326M15 12a3 3 0 01-5.995.176M3.855 3.855l16.29 16.29"
                  />
                </svg>
              )}
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
              onClick={() => setActiveTab && setActiveTab('register')}
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
