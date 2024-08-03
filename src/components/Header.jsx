import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaBars, FaTimes, FaSignOutAlt, FaHome, FaUserShield } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Header = ({ toggleTheme, theme, isAuthenticated, handleLogout }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuRef = useRef(null);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 shadow-md">
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
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              ref={menuRef}
              className="bg-slate-800 bg-opacity-90 border-2 border-yellow-500 dark:border-gray-600 rounded-full w-56 h-56 flex items-center justify-center"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 260, damping: 20 }}
            >
              <div className="relative w-full h-full">
                {[
                  { to: "/", icon: FaHome, label: "Home" },
                  { to: "/admin-login", icon: FaUserShield, label: "Admin" },
                  { href: "https://github.com/chesko21", icon: FaGithub, label: "GitHub" },
                  ...(isAuthenticated ? [{ onClick: handleLogout, icon: FaSignOutAlt, label: "Logout" }] : []),
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    className="absolute"
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: '50%',
                      top: '50%',
                      left: '50%',
                      marginLeft: -25,
                      marginTop: -25,
                    }}
                    initial={{ scale: 0, x: 0, y: 0 }}
                    animate={{
                      scale: 1,
                      x: Math.cos(index * (2 * Math.PI / 4) - Math.PI / 2) * 70,
                      y: Math.sin(index * (2 * Math.PI / 4) - Math.PI / 2) * 70,
                    }}
                    transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 260, damping: 20 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {item.to ? (
                      <Link
                        to={item.to}
                        className="w-full h-full flex flex-col items-center justify-center bg-gray-700 rounded-full text-white hover:bg-purple-600 transition-colors duration-300"
                        onClick={() => setMenuOpen(false)}
                      >
                        <motion.div
                          initial={{ rotate: 0 }}
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <item.icon className="text-xl mb-1" />
                        </motion.div>
                        <span className="text-[0.6rem]">{item.label}</span>
                      </Link>
                    ) : item.href ? (
                      <a
                        href={item.href}
                        className="w-full h-full flex flex-col items-center justify-center bg-gray-700 rounded-full text-white hover:bg-green-600 transition-colors duration-300"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setMenuOpen(false)}
                      >
                        <motion.div
                          initial={{ rotate: 0 }}
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <item.icon className="text-xl mb-1" />
                        </motion.div>
                        <span className="text-[0.6rem]">{item.label}</span>
                      </a>
                    ) : (
                      <button
                        onClick={() => {
                          item.onClick();
                          setMenuOpen(false);
                        }}
                        className="w-full h-full flex flex-col items-center justify-center bg-gray-700 rounded-full text-white hover:bg-red-600 transition-colors duration-300"
                        aria-label={item.label}
                      >
                        <motion.div
                          initial={{ rotate: 0 }}
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <item.icon className="text-xl mb-1" />
                        </motion.div>
                        <span className="text-[0.6rem]">{item.label}</span>
                      </button>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
