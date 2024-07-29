import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaBars, FaTimes, FaSignOutAlt, FaHome, FaUserShield } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Header = ({ toggleTheme, theme, isAuthenticated, handleLogout }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
      <motion.div
        className={`container mx-auto flex justify-between items-center p-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold cursor-pointer">
          <Link to="/">C_Portfolio</Link>
        </h1>
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="flex items-center space-x-2 hover:text-purple-600 transition-colors">
            <FaHome className="text-xl" />
            <span>Home</span>
          </Link>
          <Link to="/admin-login" className="flex items-center space-x-2 hover:text-purple-600 transition-colors">
            <FaUserShield className="text-xl" />
            <span>Admin</span>
          </Link>
          <a href="https://github.com/chesko21" className="text-2xl hover:text-purple-600 transition-colors">
            <FaGithub />
          </a>
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="text-2xl hover:text-red-600 transition-colors"
              aria-label="Logout"
            >
              <FaSignOutAlt />
            </button>
          )}
          <button
            onClick={toggleTheme}
            className="text-2xl hover:text-yellow-500 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '🌞' : '🌜'}
          </button>
        </div>
        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="text-2xl hover:text-yellow-500 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '🌞' : '🌜'}
          </button>
          <button
            onClick={handleMenuToggle}
            className="text-2xl focus:outline-none"
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </motion.div>
      {menuOpen && (
        <motion.div
          className={`md:hidden fixed top-3/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2 text-white p-4 rounded-full w-64 h-64 flex flex-col items-center justify-center space-y-4`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.3 }}
        >

          <Link
            to="/"
            className="flex items-center w-40 py-2 px-2 bg-gray-800  border border:bg-yellow-500 text-white rounded-lg text-sm font-medium justify-center gap-2 hover:bg-gray-700 transition-colors"
            onClick={handleMenuToggle}
          >
            <FaHome className="text-lg" />
            <span>Home</span>
          </Link>
          <Link
            to="/admin-login"
            className="flex items-center w-40 py-2 px-2 bg-gray-800  border border:bg-yellow-500 text-white rounded-lg text-sm font-medium justify-center gap-2 hover:bg-gray-700 transition-colors"
            onClick={handleMenuToggle}
          >
            <FaUserShield className="text-lg" />
            <span>Admin</span>
          </Link>
          <a
            href="https://github.com/chesko21"
            className="flex items-center w-40 py-2 px-2 bg-gray-800  border border:bg-yellow-500 text-white rounded-lg text-sm font-medium justify-center gap-2 hover:bg-gray-700 transition-colors"
            >
            <FaGithub className="text-lg" />
            <span>GitHub</span>
          </a>
            {isAuthenticated && (
              <button
                onClick={handleLogout}
              className="flex items-center w-40 py-2 px-2 bg-gray-800  border border:bg-yellow-500 text-white rounded-lg text-sm font-medium justify-center gap-2 hover:bg-red-500 transition-colors"
                aria-label="Logout"
              >
                <FaSignOutAlt className="text-lg" />
                <span>Logout</span>
              </button>
            )}
        </motion.div>
      )}
    </header>
  );
};

export default Header;
