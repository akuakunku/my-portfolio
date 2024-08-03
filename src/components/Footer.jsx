import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-center items-center h-full">
        <p className="text-xs sm:text-sm text-center">&copy; {new Date().getFullYear()} My Portfolio. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
