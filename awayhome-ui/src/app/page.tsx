// src/app/page.tsx
import React from 'react';

import Header from '../components/General/Header';
import Footer from '../components/General/Footer';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';


const Home: React.FC = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-primary-blue">
      <div className="container mx-auto">
        <Header/>
        <div className='container my-8'>
        <Login/>
        </div>


        <Register/>
        {/* <SideBar/> */}
        <Footer/>
      </div>
    </main>
  );
};

export default Home;
