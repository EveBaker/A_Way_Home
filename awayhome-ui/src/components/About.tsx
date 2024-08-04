// src/components/About.tsx
'use client';

import React from 'react';
import { Card, CardHeader, CardBody, Typography } from '../app/MTailwind';

const AboutUs: React.FC = () => {
  return (
    <section className=" pt-16 pb-4 flex-grow">
      <div className="container mx-auto px-4">
        <Card className="mb-6 shadow-lg">
          <CardHeader
            color="blue-gray"
            className="relative h-36 flex items-center justify-center bg-primary-blue"
          >
            <Typography variant="h3" color="white" className="font-bold">
              About Us
            </Typography>
          </CardHeader>
          <CardBody className="text-center">
            <Typography variant="h5" className="mb-4 text-primary-green">
              A Way Home is dedicated to reuniting lost pets with their
              families.
            </Typography>
            <Typography className="mb-4 text-gray-700">
              We believe every pet deserves to be home, and we are committed to
              making that happen. Our platform connects pet owners with
              resources, community support, and aims to build a network of
              volunteers to help find and rescue lost pets.
            </Typography>
            <Typography className="mb-4 text-gray-700">
              The inspiration behind A Way Home came from a personal experience.
              One day, Bobbi, a loving cat, showed up at our team member’s front
              door. After taking him to the vet, they discovered he had a
              microchip and managed to contact his original owner. It turned out
              that Bobbi had been rehomed before his owner moved to Dallas, and
              unfortunately, he got lost in the process. Bobbi’s original owner
              drove up from Dallas to bring him back home. This touching reunion
              motivated us to create a platform that would help other lost pets
              find their way back to their families.
            </Typography>
            <Typography className="mb-4 text-gray-700">
              Our mission is to provide a comprehensive, easy-to-use platform
              for reporting lost and found pets. By leveraging technology and
              community efforts, we aim to reduce the number of lost pets and
              ensure that every pet has the chance to be reunited with their
              family.
            </Typography>
            <Typography className="mb-4 text-gray-700">
              Join us in our mission to bring pets home. Whether you are a pet
              owner, a volunteer, or a supporter, your involvement makes a
              difference. Together, we can make a positive impact in the lives
              of pets and their families.
            </Typography>
            <Typography className="mb-4 text-gray-700">
              Thank you for being a part of A Way Home.
            </Typography>
          </CardBody>
        </Card>
      </div>
    </section>
  );
};

export default AboutUs;
