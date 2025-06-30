// src/components/Layout/Layout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import BottomNavigation from './BottomNavigation';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header fisso in cima */}
      <Header />

      {/* Area principale che renderizza le pagine */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Navigation in basso (solo se l’utente è loggato) */}
      <BottomNavigation />
    </div>
  );
};

export default Layout;
