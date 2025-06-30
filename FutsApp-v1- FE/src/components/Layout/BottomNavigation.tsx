
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Users, User, Plus, Bell } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const BottomNavigation: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();

  if (!user) return null;

  const playerNavItems = [
    { icon: Home, label: 'Home', path: '/home/player' },
    { icon: Search, label: 'Tornei', path: '/tournaments/search' },
    { icon: Users, label: 'Squadre', path: '/teams' },
    { icon: User, label: 'Profilo', path: '/profile' }
  ];

  const organizerNavItems = [
    { icon: Home, label: 'Home', path: '/home/organizer' },
    { icon: Plus, label: 'Crea', path: '/organizer/create' },
    { icon: Bell, label: 'Notifiche', path: '/notifications' },
    { icon: User, label: 'Profilo', path: '/profile' }
  ];

  const navItems = user.ruolo === 'PLAYER' ? playerNavItems : organizerNavItems;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center px-2 py-1 transition-colors ${
                isActive
                  ? 'text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon size={20} />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
