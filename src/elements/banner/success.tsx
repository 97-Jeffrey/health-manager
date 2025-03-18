import React from 'react';

interface SuccessInterface{
  text: string,
  onClose: ()=> void
}

const Success: React.FC<SuccessInterface> = ({ text, onClose }) => {
    return (
      <div className="fixed top-4 right-4 z-50">
        <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center justify-between">
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
          <button
            onClick={onClose}
            className="ml-4 p-1 outline-none bg-green-600 hover:bg-green-600 rounded-full focus:outline-none"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    );
  };


  export default Success