import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white p-2 mt-4">
      <div className="container mx-auto text-center sm:text-left">
        <p className="text-sm sm:text-base">&copy; {new Date().getFullYear()} My Portfolio. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
