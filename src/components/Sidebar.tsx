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
    { title: MENU_ITEMS.MIND_WELLNESS, icon: HeartIcon, path: ROUTES.MIND_WELLNESS },
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
    <div className={`fixed w-64 min-h-screen bg-white `}>
      <div className="p-6">
        <h1 className="text-xl font-bold text-black">Health Manager</h1>
      </div>

      <div className={`h-[600px] flex flex-col justify-between items-start w-full flex-shrink-0`}>
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
                className={`flex items-center px-6 py-3 text-sm transition-colors duration-200 font-bold  no-underline ${
                  isActive 
                    ? 'bg-grey text-[#A2A1A1] border-r-4 border-white hover:text-black' 
                    : 'text-black hover:bg-white/10'
                }`}
              >
                <item.icon className="w-3.5 h-3.5 mr-3" />
                <span className="font-heavy text-[20px]">{item.title}</span>
              </Link>
            );
          })}
        </nav>

        <button
          onClick={()=>{
            handleSignOut()
            navigate(ROUTES.SIGN_IN);
          }}
          className={`text-black bg-inherit rounded-none w-full flex items-center px-6 py-2.5 text-sm transition-colors duration-200 hover:no-underline`}
        >
          <ArrowLeftOnRectangleIcon className="w-3.5 h-3.5 mr-3" />
          <span className="font-bold text-[20px]">{MENU_ITEMS.SIGN_OUT}</span>
        </button>
      </div>

    </div>
  );
};
export default Sidebar;