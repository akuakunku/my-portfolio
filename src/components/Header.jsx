import React, { useState } from 'react';
import { FaGithub, FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-scroll';
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
        <div className="hidden md:flex space-x-4">
          <Link to="profile" spy={true} smooth={true} duration={500} className="cursor-pointer hover:underline">Profile</Link>
          <Link to="portfolio" spy={true} smooth={true} duration={500} className="cursor-pointer hover:underline">Portfolio</Link>
          <Link to="contact" spy={true} smooth={true} duration={500} className="cursor-pointer hover:underline">Contact</Link>
          <a href="https://github.com/chesko21" className="text-2xl"><FaGithub /></a>
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
          className={`md:hidden bg-gray-800 text-white p-4 absolute top-16 right-0 w-48`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="profile" spy={true} smooth={true} duration={500} className="block py-2 cursor-pointer hover:underline" onClick={handleMenuToggle}>Profile</Link>
          <Link to="portfolio" spy={true} smooth={true} duration={500} className="block py-2 cursor-pointer hover:underline" onClick={handleMenuToggle}>Portfolio</Link>
          <Link to="contact" spy={true} smooth={true} duration={500} className="block py-2 cursor-pointer hover:underline" onClick={handleMenuToggle}>Contact</Link>
          <a href="https://github.com/chesko21" className="block py-2 text-2xl"><FaGithub /></a>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
