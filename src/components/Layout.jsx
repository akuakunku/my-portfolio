import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, toggleTheme, theme, isAuthenticated, handleLogout }) => {
  return (
    <div className={`flex flex-col min-h-screen ${theme === 'light' ? 'bg-light-bg text-light-text' : 'bg-dark-bg text-dark-text'}`}>
      <Header toggleTheme={toggleTheme} theme={theme} isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      <main className="flex-grow container mx-auto">
        {children}
      </main>
      <Footer className='justify-center text-center' />
    </div>
  );
};

export default Layout;
