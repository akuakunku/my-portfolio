import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash, FaLock, FaUser } from 'react-icons/fa';

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
      setLoggedIn(true);
      navigate('/blog-home');
    } else {
      setError('ACCESS_DENIED: Invalid Credentials');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    setLoggedIn(false); 
    navigate('/admin-login');
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen px-4 bg-black overflow-hidden font-mono">
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
          alt="Login Background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 cyber-grid opacity-20"></div>
      </div>

      <motion.div
        className="relative z-20 w-full max-w-md p-8 glassmorphism rounded-none border border-cyber-primary/30 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "circOut" }}
      >
        {/* Decorative Corners */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyber-primary"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyber-purple"></div>

        {isAuthenticated ? (
          <div className="text-center space-y-6">
            <h1 className="text-2xl font-black text-white tracking-widest uppercase italic">SESSION_ACTIVE</h1>
            <p className="text-gray-400 text-sm">Identity confirmed. Access granted to core modules.</p>
            <button
              onClick={handleLogout}
              className="w-full py-4 bg-transparent border border-red-500/50 text-red-500 font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all duration-300"
            >
              TERMINATE_SESSION
            </button>
          </div>
        ) : (
          <>
            <div className="text-center mb-10">
              <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic mb-2">ADMIN_SEC</h1>
              <div className="flex items-center justify-center space-x-2">
                <span className="w-2 h-2 bg-cyber-primary animate-pulse"></span>
                <p className="text-[10px] text-gray-500 uppercase tracking-[0.4em]">Restricted Data Access</p>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] text-cyber-primary uppercase tracking-widest ml-1">IDENTIFIER</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-cyber-primary transition-colors">
                    <FaUser size={14} />
                  </div>
                  <input
                    type="text"
                    className="w-full pl-12 pr-4 py-4 bg-black/40 border border-white/10 rounded-none text-white focus:outline-none focus:border-cyber-primary focus:ring-1 focus:ring-cyber-primary/50 transition-all placeholder:text-gray-700"
                    placeholder="ENTER_ID"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] text-cyber-primary uppercase tracking-widest ml-1">SECURITY_CODE</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-cyber-primary transition-colors">
                    <FaLock size={14} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="w-full pl-12 pr-12 py-4 bg-black/40 border border-white/10 rounded-none text-white focus:outline-none focus:border-cyber-primary focus:ring-1 focus:ring-cyber-primary/50 transition-all placeholder:text-gray-700"
                    placeholder="ENTER_PASS"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-500 hover:text-white transition-colors"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {error && (
                <motion.div
                  className="p-3 bg-red-500/10 border border-red-500/50 text-red-500 text-[10px] text-center uppercase tracking-widest animate-pulse"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {error}
                </motion.div>
              )}

              <button
                type="submit"
                className="w-full py-4 bg-transparent border border-cyber-primary text-cyber-primary font-bold uppercase tracking-widest hover:bg-cyber-primary hover:text-black transition-all duration-500 group relative overflow-hidden"
              >
                <span className="relative z-10">INITIALIZE_LOGIN</span>
                <div className="absolute inset-0 bg-cyber-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-[8px] text-gray-600 uppercase tracking-[0.5em]">System_v1.0.4_Protected</p>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default AdminLogin;
