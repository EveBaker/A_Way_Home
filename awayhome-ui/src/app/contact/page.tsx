import React from 'react';
import dynamic from 'next/dynamic';

const AboutUs = dynamic(() => import('../../components/About'), { ssr: false });
const TeamLinks = dynamic(() => import('../../components/TeamLinks'), {
  ssr: false,
});

const ContactPage = () => {
  return (
    <div>
      <div className="flex flex-wrap justify-center space-x-2 ">
        <TeamLinks />
        <AboutUs />
      </div>
    </div>
  );
};

export default ContactPage;
