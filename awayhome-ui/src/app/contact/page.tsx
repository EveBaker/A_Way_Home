import React from 'react';
import dynamic from 'next/dynamic';

const Contact = dynamic(() => import('../../components/Contact'), {
  ssr: false,
});
const AboutUs = dynamic(() => import('../../components/About'), { ssr: false });
const TeamLinks = dynamic(() => import('../../components/TeamLinks'), {
  ssr: false,
});

const ContactPage = () => {
  return (
    <div>
      <AboutUs />
      <div className="flex flex-wrap justify-center space-x-2 ">
        <TeamLinks />
        <Contact />
      </div>
    </div>
  );
};

export default ContactPage;
