/**
 * Main Layout Wrapper
 */

import React from 'react';
import Navbar from './Navbar';
import BottomNav from './BottomNav';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      <main className="pt-20 pb-24 md:pb-0">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
