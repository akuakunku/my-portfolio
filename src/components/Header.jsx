import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';

const Header = ({ toggleTheme, theme }) => {
  return (
    <header className="sticky top-0 z-50">
      <motion.div 
        className={`container mx-auto flex justify-between items-center p-4 ${theme === 'dark' ? 'bg-dark-bg text-dark-text' : 'bg-gray-800 text-white'}`}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-2xl font-bold">Chesko Portfolio</h1>
        <div className="flex space-x-4">
          <Link to="profile" spy={true} smooth={true} duration={500} className="cursor-pointer">Profile</Link>
          <Link to="portfolio" spy={true} smooth={true} duration={500} className="cursor-pointer">Portfolio</Link>
          <Link to="contact" spy={true} smooth={true} duration={500} className="cursor-pointer">Contact</Link>
          <a href="https://github.com/chesko21" className="text-2xl"><FaGithub /></a>
        </div>

      </motion.div>
    </header>
  );
};

export default Header;
