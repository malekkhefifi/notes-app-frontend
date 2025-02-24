import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation

const Hello = () => {
  const navigate = useNavigate(); // Create navigate function

  const handleLoginClick = () => {
    navigate('/login'); // Navigate to the login page
  };

  return (
    <div className="relative h-screen flex flex-col items-center justify-between"> {/* Full height and center content */}
      <img
        src="https://play-lh.googleusercontent.com/hNCm_AdEm61Bc9Ai7wcIN-IkP3TVgAymi-IhpkHV11lnyGEZePxxgzcGLq98IgnZMA"
        alt="Hello"
        className="w-160 h-160 object-cover mt-10" // Adjust the margin-top to control the vertical position of the image
      />
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2">
        <button
          onClick={handleLoginClick}
          className="bg-blue-500 text-white py-3 px-6 text-lg rounded-full shadow-lg"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Hello;















