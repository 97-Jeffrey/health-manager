import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {  HomeIcon, ChartBarIcon, UserIcon, HeartIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import { signout } from '../lib/Auth/index';

import * as ROUTES from '../constants/routes';
import * as MENU_ITEMS from '../constants/menuItems';
import * as COLORS from '../constants/color'

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
    { title: MENU_ITEMS.BODY, icon: HomeIcon, path: ROUTES.BODY },
    { title: MENU_ITEMS.HEALTH_JOURNEY, icon: ChartBarIcon, path: ROUTES.HEALTH_JOURNEY },
    { title: MENU_ITEMS.WELLNESS, icon: HeartIcon, path: ROUTES.WELLNESS },
    { title: MENU_ITEMS.RECIPES, icon: HeartIcon, path: ROUTES.RECIPE},
    { title: MENU_ITEMS.PROFILE, icon: UserIcon, path: ROUTES.PROFILE },
    { 
      title: MENU_ITEMS.SIGN_OUT, 
      icon: ArrowLeftOnRectangleIcon, 
      path: ROUTES.SIGN_IN,
      onClick: async () => {
        handleSignOut()
        navigate(ROUTES.SIGN_IN);
      }
    }
  ];

  return (
    <div className={`w-64 min-h-screen bg-gradient-to-b ${COLORS.ACTIONS_COLOR} via-blue-700 to-blue-800`}>
      <div className="p-6">
        <h1 className="text-xl font-bold text-white">Health Manager</h1>
      </div>

      <div className={` min-h-96 flex flex-col justify-between items-start w-full flex-shrink-0`}>
        <nav className="mt-6 w-full">
          {
          menuItems
            .filter((eachItem)=> eachItem.title !==MENU_ITEMS.SIGN_OUT)
            .map((item) => {
            const isActive = location.pathname === item.path;
            return  (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-6 py-2.5 text-sm transition-colors duration-200 font-bold  no-underline ${
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

        <button
          onClick={()=>{
            handleSignOut()
            navigate(ROUTES.SIGN_IN);
          }}
          className={`font-bold text-white bg-inherit rounded-none w-full flex items-center px-6 py-2.5 text-sm transition-colors duration-200  hover:bg-white/5`}
        >
          <ArrowLeftOnRectangleIcon className="w-3.5 h-3.5 mr-3" />
          <span className="font-medium">{MENU_ITEMS.SIGN_OUT}</span>
        </button>
      </div>

    </div>
  );
};
export default Sidebar;