import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  X, 
  LayoutDashboard,
  ShoppingBag,
  Users,
  ShoppingCart,
  Truck,
  BarChart3,
  Settings,
  HelpCircle,
  Scissors
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { logout } = useApp();

  const navigationItems = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Inventory', href: '/inventory', icon: ShoppingBag },
    { name: 'Customers', href: '/customers', icon: Users },
    { name: 'Sales', href: '/sales', icon: ShoppingCart },
    { name: 'Suppliers', href: '/suppliers', icon: Truck },
    { name: 'Reports', href: '/reports', icon: BarChart3 },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];
  
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-neutral-900/50 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-primary-500 text-white transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-primary-600">
            <div className="flex items-center space-x-2">
              <Scissors className="h-8 w-8" />
              <h1 className="text-xl font-bold">Cloth Store</h1>
            </div>
            <button 
              onClick={onClose} 
              className="lg:hidden p-2 rounded-md hover:bg-primary-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-4 px-3 overflow-y-auto">
            <ul className="space-y-1">
              {navigationItems.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.href}
                    className={({ isActive }) => 
                      `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                        isActive 
                          ? 'bg-primary-600 text-white' 
                          : 'text-primary-100 hover:bg-primary-600 hover:text-white'
                      }`
                    }
                    end={item.href === '/'}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    <span>{item.name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="mt-8 border-t border-primary-600 pt-4">
              <NavLink
                to="/help"
                className="flex items-center gap-3 px-3 py-2 rounded-md text-primary-100 hover:bg-primary-600 hover:text-white transition-colors"
              >
                <HelpCircle className="h-5 w-5 flex-shrink-0" />
                <span>Help & Support</span>
              </NavLink>
              
              <button
                onClick={logout}
                className="w-full flex items-center gap-3 px-3 py-2 mt-2 rounded-md text-primary-100 hover:bg-primary-600 hover:text-white transition-colors"
              >
                <svg className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Logout</span>
              </button>
            </div>
          </nav>
          
          {/* Footer */}
          <div className="p-4 border-t border-primary-600">
            <p className="text-sm text-primary-200">
              Cloth Store v1.0.0
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;