import React, { useState } from 'react';
import Header from './components/Header';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Profile from './components/Profile';

const App = () => {
  const [theme, setTheme] = useState('light'); // State for theme, default to light

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <div className='bg-gray-300'>
      <Header />
      <main>
        <section id="profile">
          <Profile theme={theme} />
        </section>
        <section id="portfolio">
          <Portfolio theme={theme} />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default App;
