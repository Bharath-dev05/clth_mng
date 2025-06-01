import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useApp } from '../../context/AppContext';

const MainLayout: React.FC = () => {
  const { currentUser } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // If no user is logged in, redirect would happen at router level
  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-neutral-100">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="lg:pl-72">
        <Header 
          onMenuClick={() => setSidebarOpen(true)} 
          user={currentUser}
        />
        
        <main className="p-4 sm:p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;