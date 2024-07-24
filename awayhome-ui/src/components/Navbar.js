import React from 'react';

const Navbar = ({ setActiveTab }) => {
  return (
    <nav className="bg-blue-900 p-10 flex justify-between items-center">
      <div className="flex items-center">
        <img src="/path-to-logo.png" alt="Logo" className="h-8 w-8 mr-2" />
        <span className="text-white font-bold">A Way Home</span>
      </div>
      <ul className="flex space-x-4">
        <li><button onClick={() => setActiveTab('home')} className="text-white">Home</button></li>
        <li><button onClick={() => setActiveTab('lostPets')} className="text-white">Lost Pets</button></li>
        <li><button onClick={() => setActiveTab('foundPets')} className="text-white">Found Pets</button></li>
        <li><button onClick={() => setActiveTab('contact')} className="text-white">Contact</button></li>
        <li><button onClick={() => setActiveTab('about')} className="text-white">About Us</button></li>
      </ul>
      <div>
        <button onClick={() => setActiveTab('login')} className="text-white mr-2">Log In</button>
        <button onClick={() => setActiveTab('signup')} className="text-white">Sign Up</button>
      </div>
    </nav>
  );
};

export default Navbar;
