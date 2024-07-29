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
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const checkAuthentication = () => {
      setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
    };
    checkAuthentication();
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Layout toggleTheme={toggleTheme} theme={theme} isAuthenticated={isAuthenticated} handleLogout={handleLogout}>
        <Routes>
          <Route path="/" element={
            <div className="space-y-8">
              <section id="profile" className="py-4">
                <Profile theme={theme} />
              </section>
              <section id="portfolio" className="py-4">
                <Portfolio theme={theme} />
              </section>
              <section id="contact" className="py-4">
                <Contact />
              </section>
              <section id="blog" className="py-4">
                <BlogList />
              </section>
            </div>
          } />
          <Route path="/admin-login" element={<AdminLogin setLoggedIn={setIsAuthenticated} />} />
          <Route path="/blog-home" element={<ProtectedRoute><BlogHome /></ProtectedRoute>} />
          <Route path="/blog-post/:id" element={<BlogPost />} />
          <Route path="/blog-form" element={<BlogForm />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
