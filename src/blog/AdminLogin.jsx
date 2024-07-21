import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const AdminLogin = ({ setLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/blog-home');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    const envUsername = import.meta.env.VITE_SUPABASE_USERNAME;
    const envPassword = import.meta.env.VITE_SUPABASE_PASSWORD;

    if (username === envUsername && password === envPassword) {
      localStorage.setItem('isAuthenticated', 'true');
      setIsAuthenticated(true);
      setLoggedIn(true); // Update the parent state
      navigate('/blog-home');
    } else {
      setError('Invalid username or password');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    setLoggedIn(false); // Update the parent state
    navigate('/admin-login');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-dark-bg">
      <motion.div
        className="w-full max-w-md p-8 space-y-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300"
          >
            Logout
          </button>
        ) : (
          <>
            <h1 className="text-3xl font-extrabold text-center text-gray-900 dark:text-yellow-500 mb-4">Admin Login</h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <motion.div
                className="mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
                <input
                  type="text"
                  id="username"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </motion.div>

              <motion.div
                className="relative mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-2 top-4 flex items-center"
                >
                  {showPassword ? <FaEyeSlash className="text-gray-500 dark:text-gray-400" /> : <FaEye className="text-gray-500 dark:text-gray-400" />}
                </button>
              </motion.div>

              {error && (
                <motion.p
                  className="text-red-500 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {error}
                </motion.p>
              )}

              <motion.button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                Login
              </motion.button>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default AdminLogin;
