import React, { useState } from 'react';
import Header from './components/Header';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Profile from './components/Profile';

const App = () => {
  const [theme, setTheme] = useState('light'); 

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-300' : 'bg-gray-900 text-white'}`}>
      <Header />
      <main className="container mx-auto px-4">
        <section id="profile" className="py-8">
          <Profile theme={theme} />
        </section>
        <section id="portfolio" className="py-8">
          <Portfolio theme={theme} />
        </section>
        <section id="contact" className="py-8">
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default App;
