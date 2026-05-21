import React from 'react';
import Header from './Header';
import Footer from './Footer';
import CustomCursor from './CustomCursor';
import { motion } from 'framer-motion';

const Layout = ({ children, isAuthenticated, handleLogout }) => {
  return (
    <motion.div 
      className="flex flex-col min-h-screen bg-[#050505] text-white cyber-grid"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <CustomCursor />
      <Header isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
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
