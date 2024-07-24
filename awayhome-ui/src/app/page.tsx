// src/app/page.tsx
'use client'
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Homepage from '../components/Homepage';
import LostPets from '../components/LostPets';
import FoundPets from '../components/FoundPets';
import Contact from '../components/Contact';
import AboutUs from '../components/AboutUs';
import Footer from '../components/Footer';



const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Homepage />;
      case 'lostPets':
        return <LostPets />;
      case 'foundPets':
        return <FoundPets />;
      case 'contact':
        return <Contact />;
      case 'about':
        return <AboutUs />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="App min-h-screen flex flex-col">
      <Navbar setActiveTab={setActiveTab} />
      <div className="flex-grow w-full flex flex-col">
        <div className="bg-[#61988E] h-12 flex-shrink-0"></div>
        <div className="flex-grow p-4">
          {renderContent()}
        </div>
        <div className="bg-[#61988E] h-12 flex-shrink-0"></div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
