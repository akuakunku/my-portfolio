import React, { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Profile from './components/Profile';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import BlogList from './blog/BlogList';
import AdminLogin from './blog/AdminLogin';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './components/NotFound';
import AppSkeleton from './components/AppSkeleton';

const BlogHome = lazy(() => import('./blog/BlogHome'));
const BlogPost = lazy(() => import('./blog/BlogPost'));
const BlogForm = lazy(() => import('./blog/BlogForm'));

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const checkAuthentication = () => {
      setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
    };
    checkAuthentication();

    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return <AppSkeleton />;
  }

  return (
    <Router>
      <Layout toggleTheme={toggleTheme} theme={theme} isAuthenticated={isAuthenticated} handleLogout={handleLogout}>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={
              <div>
                <section id="profile">
                  <Profile theme={theme} />
                </section>
                <section id="portfolio">
                  <Portfolio theme={theme} />
                </section>
                <section id="contact">
                  <Contact />
                </section>
                <section id="blog">
                  <BlogList />
                </section>
              </div>
            } />
            <Route path="/admin-login" element={<AdminLogin setLoggedIn={setIsAuthenticated} />} />
            <Route path="/blog-home" element={<ProtectedRoute><BlogHome /></ProtectedRoute>} />
            <Route path="/blog-post/:id" element={<BlogPost />} />
            <Route path="/blog-form" element={<ProtectedRoute><BlogForm /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
};

export default App;