// src/app/home/page
import React from 'react';
import dynamic from 'next/dynamic';

const Homepage = dynamic(() => import('../components/Homepage'), {
  ssr: true,
});

const HomepagePage: React.FC = () => {
  return <Homepage />;
};

export default HomepagePage;
