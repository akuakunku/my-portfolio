import React, { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import Layout from './components/Layout';
import Profile from './components/Profile';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import AdminLogin from './blog/AdminLogin';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './components/NotFound';
import AppSkeleton from './components/AppSkeleton';

const BlogHome = lazy(() => import('./blog/BlogHome'));
const BlogPost = lazy(() => import('./blog/BlogPost'));
const BlogForm = lazy(() => import('./blog/BlogForm'));

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }, []);

  useEffect(() => {
    const checkAuthentication = () => {
      setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
    };
    checkAuthentication();

    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return <AppSkeleton />;
  }

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Layout isAuthenticated={isAuthenticated} handleLogout={handleLogout}>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={
              <div>
                <section id="profile">
                  <Profile />
                </section>
                <section id="portfolio">
                  <Portfolio />
                </section>
                <section id="contact">
                  <Contact />
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
