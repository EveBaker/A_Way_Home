'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
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
    <section className="bg-white py-8">
      <div className="container mx-auto px-4">
        {/* Contact Form */}
        <div className="w-full p-4">
          <Card className="bg-gray-100 p-2 rounded-lg shadow-lg">
            <CardHeader className="text-3xl py-4 font-bold mb-6 text-center text-white bg-primary-green">
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
                <Link href="">
                  <Button
                    type="submit"
                    className="w-full bg-primary-blue text-white font-bold py-2 rounded-md"
                  >
                    SEND MESSAGE
                  </Button>
                </Link>
              </form>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
