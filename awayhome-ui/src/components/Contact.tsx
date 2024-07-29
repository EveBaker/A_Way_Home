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
} from '../app/MTailwind';

const Contact = () => {
  const router = useRouter();

  const handlePrivacyPolicyClick = () => {
    window.open('https://example.com/privacy-policy', '_blank');
  };

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex">
          {/* Contact Form */}
          <div className="w-1/2 p-4">
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
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
                <div className="mb-4">
                  <input type="checkbox" id="privacyPolicy" className="mr-2" />
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
                  className="w-full bg-black text-white font-bold py-2 rounded-md"
                >
                  SEND MESSAGE
                </Button>
              </form>
            </div>
          </div>

          {/* Team Information */}
          <div className="w-1/2 p-4">
            <h2 className="text-2xl font-bold mb-6">
              Get in Touch With The Team
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {['Crystal', 'Jamie', 'Casey', 'Eve'].map((name) => (
                <div
                  key={name}
                  className="bg-gray-200 p-4 rounded-lg shadow-md text-center"
                >
                  <div className="bg-gray-300 h-40 w-full mb-4"></div>
                  <p className="text-sm font-bold mb-2">{name}</p>
                  <p className="text-sm">Spec:</p>
                  <p className="text-sm">
                    GitHub:{' '}
                    <a href="#" className="text-blue-500">
                      GitHub
                    </a>
                  </p>
                  <p className="text-sm">
                    LinkedIn:{' '}
                    <a href="#" className="text-blue-500">
                      LinkedIn
                    </a>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
