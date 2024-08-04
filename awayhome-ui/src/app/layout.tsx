import 'dotenv/config';
import type { Metadata } from 'next';
import { Sumana } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from './MTailwind';
import { ReactNode } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AuthProvider } from '../context/AuthContext';

const sumana = Sumana({ weight: ['400', '700'], subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'A Way Home',
  description: 'Connecting Pets and People Online',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`${sumana.className} min-h-screen flex flex-col text-black`}
      >
        <ThemeProvider>
          <AuthProvider>
            <Navbar />
            <div className="flex-grow">
              <div className="bg-[#61988E] h-12 w-full"></div>
              <main className="flex-grow flex items-center justify-center bg-white w-full">
                {children}
              </main>
            </div>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
