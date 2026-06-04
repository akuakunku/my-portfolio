import React, { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Profile from './components/Profile';
import TechMarquee from './components/sections/TechMarquee';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import { SectionDivider } from './components/layout/SectionDivider';
import AdminLogin from './blog/AdminLogin';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './components/NotFound';
import AppSkeleton from './components/AppSkeleton';
import { SmoothScrollProvider, scrollToTop } from './components/providers/smooth-scroll';

const BlogHome = lazy(() => import('./blog/BlogHome'));
const BlogPost = lazy(() => import('./blog/BlogPost'));
const BlogForm = lazy(() => import('./blog/BlogForm'));

const HomePage = () => (
  <>
    <section id="home">
      <Profile />
    </section>
    <SectionDivider />
    <TechMarquee />
    <SectionDivider />
    <section id="portfolio">
      <Portfolio />
    </section>
    <SectionDivider />
    <section id="contact" className="relative min-h-[1px]">
      <Contact />
    </section>
  </>
);

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      setIsLoading(false);
      requestAnimationFrame(() => scrollToTop(true));
    }, 1200);
    return () => clearTimeout(t);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return <AppSkeleton />;
  }

  return (
    <SmoothScrollProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Layout isAuthenticated={isAuthenticated} handleLogout={handleLogout}>
          <Suspense fallback={<div className="p-8 font-mono text-cyber-blue">Loading...</div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/admin-login" element={<AdminLogin setLoggedIn={setIsAuthenticated} />} />
              <Route
                path="/blog-home"
                element={
                  <ProtectedRoute>
                    <BlogHome />
                  </ProtectedRoute>
                }
              />
              <Route path="/blog-post/:id" element={<BlogPost />} />
              <Route
                path="/blog-form"
                element={
                  <ProtectedRoute>
                    <BlogForm />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </SmoothScrollProvider>
  );
};

export default App;
