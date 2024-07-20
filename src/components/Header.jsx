import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaBars, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Header = ({ toggleTheme, theme }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="sticky top-0 z-50">
      <motion.div 
        className={`container mx-auto flex justify-between items-center p-4 ${theme === 'dark' ? 'bg-dark-bg text-dark-text' : 'bg-gray-800 text-white'}`}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-2xl font-bold">C_Portfolio</h1>
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/" className="cursor-pointer hover:underline">Home</Link>
          <Link to="/admin-login" className="cursor-pointer hover:underline">Admin Login</Link>
          <a href="https://github.com/chesko21" className="text-2xl"><FaGithub /></a>
          <button onClick={toggleTheme} className="text-2xl focus:outline-none">
            {theme === 'dark' ? '🌞' : '🌜'}
          </button>
        </div>
        <div className="md:hidden flex items-center space-x-4">
          <button onClick={toggleTheme} className="text-2xl focus:outline-none">
            {theme === 'dark' ? '🌞' : '🌜'}
          </button>
          <button onClick={handleMenuToggle} className="text-2xl focus:outline-none">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </motion.div>
      {menuOpen && (
        <motion.div 
          className={`md:hidden fixed top-18 justify-center text-center right-4 w-40 p-4 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-800 text-dark-text' : 'bg-gray-300 text-gray-900'}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col space-y-2">
            <Link to="/" className="block py-2 text-lg cursor-pointer hover:underline" onClick={handleMenuToggle}>Home</Link>
            <Link to="/admin-login" className="block py-2 text-lg cursor-pointer hover:underline" onClick={handleMenuToggle}>Admin Login</Link>
            <a href="https://github.com/chesko21" className="flex py-2 text-2xl items-center justify-center">
              <FaGithub />
            </a>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
