import React from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, toggleTheme, theme, isAuthenticated, handleLogout }) => {
  return (
    <motion.div 
      className={`flex flex-col min-h-screen ${theme === 'light' ? 'bg-light-bg text-light-text' : 'bg-dark-bg text-dark-text'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header toggleTheme={toggleTheme} theme={theme} isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      <motion.main 
        className="flex-grow"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {children}
      </motion.main>
      <Footer />
    </motion.div>
  );
};

export default Layout;
