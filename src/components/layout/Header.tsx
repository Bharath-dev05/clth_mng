import React from 'react';
import { Menu, Bell, Search, User as UserIcon } from 'lucide-react';
import { User } from '../../types';

interface HeaderProps {
  onMenuClick: () => void;
  user: User;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, user }) => {
  return (
    <header className="sticky top-0 z-30 bg-white shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            type="button" 
            className="lg:hidden -ml-2 p-2 text-neutral-500 rounded-md hover:bg-neutral-100"
            onClick={onMenuClick}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" />
          </button>

          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-5 h-5 text-neutral-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="w-64 pl-10 pr-4 py-2 bg-neutral-100 border border-neutral-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-neutral-500 rounded-md hover:bg-neutral-100 relative">
            <Bell className="h-6 w-6" />
            <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-error-500"></span>
          </button>
          
          <div className="flex items-center">
            <div className="mr-3 hidden sm:block">
              <p className="text-sm font-medium text-neutral-900">{user.name}</p>
              <p className="text-xs text-neutral-500 capitalize">{user.role}</p>
            </div>
            {user.avatar ? (
              <img 
                src={user.avatar} 
                alt={user.name}
                className="h-9 w-9 rounded-full object-cover"
              />
            ) : (
              <div className="h-9 w-9 rounded-full bg-primary-100 flex items-center justify-center">
                <UserIcon className="h-5 w-5 text-primary-600" />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;