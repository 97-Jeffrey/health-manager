import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoIosBody } from "react-icons/io";
import { GiJourney } from "react-icons/gi";
import { RiMentalHealthFill } from "react-icons/ri";
import { IoRestaurant, IoFastFood } from "react-icons/io5";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { TbMessageChatbotFilled } from "react-icons/tb";


import { signout } from '../lib/Auth/index';

import * as ROUTES from '../constants/routes';
import * as MENU_ITEMS from '../constants/menuItems';

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
    { title: MENU_ITEMS.BODY, icon: IoIosBody, path: ROUTES.BODY },
    { title: MENU_ITEMS.HEALTH_JOURNEY, icon: GiJourney, path: ROUTES.HEALTH_JOURNEY },
    { title: MENU_ITEMS.MIND_WELLNESS, icon: RiMentalHealthFill, path: ROUTES.MIND_WELLNESS },
    { title: MENU_ITEMS.RECIPES, icon: IoRestaurant, path: ROUTES.RECIPE},
    { title: MENU_ITEMS.PROFILE, icon: FaUser, path: ROUTES.PROFILE },
    { title: MENU_ITEMS.VITA_BOT, icon: TbMessageChatbotFilled, path: ROUTES.VITA_BOT },
    { 
      title: MENU_ITEMS.SIGN_OUT, 
      icon: FaSignOutAlt, 
      path: ROUTES.SIGN_IN,
      onClick: async () => {
        handleSignOut()
        navigate(ROUTES.SIGN_IN);
      }
    }
  ];

  return (
    <div className={`fixed w-64 min-h-screen bg-white `}>
      <div className="p-4">
        <h1 className="text-[25px] font-bold text-black">Health Manager</h1>
        <h6 className='text-sm font-bold w-fit text-white bg-black px-2 py-1 rounded-lg'>Built For You</h6>
      </div>

      <div className={`p-0 h-[600px] flex flex-col justify-between items-start w-full flex-shrink-0`}>
        <nav className=" w-full">
          {
          menuItems
            .filter((eachItem)=> eachItem.title !==MENU_ITEMS.SIGN_OUT)
            .map((item) => {
            const isActive = location.pathname === item.path;
            return  (
              <Link
                key={item.path}
                to={item.path}
                className={` flex items-center px-6 py-3 text-sm transition-colors duration-200 font-bold  no-underline ${
                  isActive 
                    ? 'bg-[#e3e3e3] text-[#858585] border-r-4 border-white hover:text-black' 
                    : 'text-black hover:text-[#858585]'
                }`}
              >
                <item.icon className="w-[20px] h-[20px] mr-3" />
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
          <FaSignOutAlt className="w-3.5 h-3.5 mr-3" />
          <span className="font-bold text-[20px]">{MENU_ITEMS.SIGN_OUT}</span>
        </button>
      </div>

    </div>
  );
};
export default Sidebar;