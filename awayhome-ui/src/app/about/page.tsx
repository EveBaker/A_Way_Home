import React from 'react';
import dynamic from 'next/dynamic';

const AboutUs = dynamic(() => import('../../components/About'), { ssr: false });

const AboutPage: React.FC = () => {
  return <AboutUs />;
};

export default AboutPage;
