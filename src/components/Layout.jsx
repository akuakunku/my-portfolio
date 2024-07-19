import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, toggleTheme, theme }) => {
  return (
    <div className={`flex flex-col min-h-screen ${theme === 'light' ? 'bg-light-bg text-light-text' : 'bg-dark-bg text-dark-text'}`}>
      <Header toggleTheme={toggleTheme} theme={theme} />
      <main className="flex-grow container mx-auto px-4">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
