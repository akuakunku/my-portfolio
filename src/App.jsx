import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Profile from './components/Profile';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import BlogHome from './blog/BlogHome';
import BlogPost from './blog/BlogPost';
import BlogForm from './blog/BlogForm';
import BlogList from './blog/BlogList';
import AdminLogin from './blog/AdminLogin';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <Router>
      <Layout toggleTheme={toggleTheme} theme={theme}>
        <Routes>
          <Route path="/" element={
            <>
              <section id="profile" className="py-4">
                <Profile theme={theme} />
              </section>
              <div className="border-t border-gray-300 dark:border-gray-700 mb-4"></div> 
              <section id="portfolio" className="py-8">
                <Portfolio theme={theme} />
              </section>
              <div className="border-t border-gray-300 dark:border-gray-700 mb-4"></div> 
              <section id="contact" className="py-4">
                <Contact />
              </section>
              
              <section id="blog" className="py-4">
                <BlogList />
              </section>
              <div className="border-t border-gray-300 dark:border-gray-700 mb-4"></div> 
            </>
            
          } />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/blog-home" element={<ProtectedRoute><BlogHome /></ProtectedRoute>} />
          <Route path="/blog-post/:id" element={<BlogPost />} />
          <Route path="/blog-form" element={<BlogForm />} />
         
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
