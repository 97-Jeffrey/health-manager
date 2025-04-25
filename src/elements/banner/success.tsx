import React from 'react';
import { CiCircleRemove } from "react-icons/ci";

interface SuccessInterface{
  text: string,
  onClose: ()=> void
}

const Success: React.FC<SuccessInterface> = ({ text, onClose }) => {
    return (
      <div className="fixed top-4 right-4 z-50">
        <div className="bg-black text-white px-6 py-4 rounded-lg shadow-lg flex items-center justify-between">
          <div className="flex items-center">
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            <span>{text}</span>
          </div>

          <CiCircleRemove 
            onClick={onClose}
            className='cursor-pointer text-[30px] ml-[10px]'
          />
        </div>
      </div>
    );
  };


  export default Success