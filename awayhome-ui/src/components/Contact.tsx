'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
  Avatar,
} from '../app/MTailwind';

const Contact = () => {
  const router = useRouter();

  const handlePrivacyPolicyClick = () => {
    window.open('https://example.com/privacy-policy', '_blank');
  };

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
          {/* Team Information */}
          <div className="w-full lg:w-1/2 p-4">
            <h2 className="text-2xl font-bold mb-6">
              Get in Touch With The Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {['Casey', 'Eve', 'Crystal'].map((name) => (
                <Card
                  key={name}
                  className="p-4 rounded-lg shadow-md text-center border-3 border-primary-blue"
                >
                  <CardHeader className="flex justify-center">
                    <Avatar
                      src={`https://via.placeholder.com/150`}
                      alt={name}
                      size="xl"
                      className="mb-4"
                    />
                  </CardHeader>
                  <CardBody>
                    <Typography variant="h6" className="mb-2">
                      {name}
                    </Typography>
                    <Typography variant="body2">Spec:</Typography>
                  </CardBody>
                  <CardFooter>
                    <Typography variant="body2">
                      GitHub:{' '}
                      <a href="#" className="text-blue-500">
                        GitHub
                      </a>
                    </Typography>
                    <Typography variant="body2">
                      LinkedIn:{' '}
                      <a href="#" className="text-blue-500">
                        LinkedIn
                      </a>
                    </Typography>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
          {/* Contact Form */}
          <div className="w-full lg:w-1/2 p-4">
            <Card className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <CardHeader className="text-2xl font-bold mb-6">
                Contact Us
              </CardHeader>
              <CardBody>
                <form>
                  <div className="mb-4">
                    <Input
                      label="First Name"
                      type="text"
                      placeholder="First Name"
                      className="w-full mb-4"
                    />
                    <Input
                      label="Last Name"
                      type="text"
                      placeholder="Last Name"
                      className="w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <Input
                      label="Email"
                      type="email"
                      placeholder="Email"
                      className="w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <textarea
                      placeholder="Message"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      rows="4"
                    />
                  </div>
                  <div className="mb-4 flex items-center">
                    <input
                      type="checkbox"
                      id="privacyPolicy"
                      className="mr-2"
                    />
                    <label htmlFor="privacyPolicy" className="text-sm">
                      You agree to our
                      <button
                        type="button"
                        onClick={handlePrivacyPolicyClick}
                        className="text-blue-500 underline ml-1"
                      >
                        Privacy Policy
                      </button>
                      .
                    </label>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-primary-blue text-white font-bold py-2 rounded-md"
                  >
                    SEND MESSAGE
                  </Button>
                </form>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
