import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HomeIcon, ChartBarIcon, UserIcon, HeartIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import { signout } from '../lib/Auth/index';

interface SidebarInterface{
  signOutApp: ()=> void
}

const Sidebar: React.FC<SidebarInterface> = ({ signOutApp }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = () =>{
      signout()
      signOutApp()
  }
  
  const menuItems = [
    { title: 'Dashboard', icon: HomeIcon, path: '/dashboard' },
    { title: 'Profile', icon: UserIcon, path: '/profile' },
    { title: 'Health Metrics', icon: ChartBarIcon, path: '/metrics' },
    { title: 'Wellness', icon: HeartIcon, path: '/wellness' },
    { 
      title: 'Sign Out', 
      icon: ArrowLeftOnRectangleIcon, 
      path: '/signin',
      onClick: async () => {
        handleSignOut()
        navigate('/signin');
      }
    }
  ];

  return (
    <div className="w-64 min-h-screen bg-gradient-to-b from-blue-600 via-blue-700 to-blue-800">
      <div className="p-6">
        <h1 className="text-xl font-bold text-white">Health Manager</h1>
      </div>
      <nav className="mt-6">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return item.onClick ? (
            <button
              key={item.path}
              onClick={item.onClick}
              className={`font-bold text-white bg-inherit rounded-none w-full flex items-center px-6 py-2.5 text-sm transition-colors duration-200  hover:bg-white/5`}
            >
              <item.icon className="w-3.5 h-3.5 mr-3" />
              <span className="font-medium">{item.title}</span>
            </button>
          ) : (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-6 py-2.5 text-sm transition-colors duration-200 font-bold  ${
                isActive 
                  ? 'bg-white/10 text-white border-r-4 border-white' 
                  : 'text-blue-100 hover:bg-white/5'
              }`}
            >
              <item.icon className="w-3.5 h-3.5 mr-3" />
              <span className="font-heavy">{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
export default Sidebar;