import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import supabase from '../lib/supabaseClient';
import DOMPurify from 'dompurify';
import { FaPlus, FaEdit, FaTrash, FaCalendarAlt, FaUser, FaChevronUp, FaEye, FaTerminal, FaDatabase } from 'react-icons/fa';

const BlogHome = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) {
        console.error('Error fetching posts:', error);
      } else {
        setPosts(data);
      }
      setIsLoading(false);
    };
    fetchPosts();

    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDelete = async (id, imageUrl) => {
    try {
      if (imageUrl) {
        const { error: deleteError } = await supabase.storage
          .from('blog_posts')
          .remove([imageUrl.split('/').pop()]);
        if (deleteError) {
          console.error('Error deleting image:', deleteError);
          return;
        }
      }

      const { error } = await supabase.from('blog_posts').delete().eq('id', id);
      if (error) {
        console.error('Error deleting post:', error);
      } else {
        setPosts(posts.filter(post => post.id !== id));
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };

  const confirmDelete = (id, imageUrl) => {
    const confirmed = window.confirm('ALERT: Data purge requested. Confirm deletion of record?');
    if (confirmed) {
      handleDelete(id, imageUrl);
    }
  };

  const truncateText = (text, length) => {
    const plainText = text.replace(/<\/?[^>]+>/gi, '');
    return plainText.length > length ? plainText.substring(0, length) + '...' : plainText;
  };

  const truncateTitle = (title, length) => {
    return title.length > length ? title.substring(0, length) + '...' : title;
  };

  const cleanContent = (content) => DOMPurify.sanitize(content);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <motion.div 
      className="min-h-screen bg-black text-white font-mono pb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center py-12 border-b border-white/5"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="mb-8 md:mb-0">
            <div className="flex items-center space-x-3 mb-2">
              <FaTerminal className="text-cyber-primary" />
              <h1 className="text-4xl font-black tracking-tighter uppercase italic">CONTENT_MGMT</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-[10px] text-gray-500 uppercase tracking-[0.4em]">Database_Active</span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>

          <Link to="/blog-form">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-transparent border border-cyber-primary text-cyber-primary font-bold uppercase tracking-widest hover:bg-cyber-primary hover:text-black transition-all duration-300 flex items-center group overflow-hidden relative"
            >
              <span className="relative z-10 flex items-center">
                <FaPlus className="mr-3" /> Create_New_Record
              </span>
              <div className="absolute inset-0 bg-cyber-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </motion.button>
          </Link>
        </motion.div>

        {/* Dashboard Stats (Optional/Visual) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-12">
          <div className="glassmorphism p-6 border border-white/5">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Total_Records</p>
            <div className="flex items-end space-x-3">
              <span className="text-3xl font-black text-white">{posts.length.toString().padStart(2, '0')}</span>
              <FaDatabase className="text-cyber-primary mb-1" size={12} />
            </div>
          </div>
          <div className="glassmorphism p-6 border border-white/5">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">System_Status</p>
            <span className="text-xs font-bold text-green-500 uppercase">Stable_v1.0.4</span>
          </div>
          <div className="glassmorphism p-6 border border-white/5">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Last_Access</p>
            <span className="text-xs font-bold text-cyber-primary uppercase">{new Date().toLocaleTimeString()}</span>
          </div>
        </div>

        {/* Records Grid */}
        <AnimatePresence>
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col justify-center items-center h-64 space-y-4"
            >
              <div className="w-12 h-12 border-2 border-cyber-primary border-t-transparent rounded-full animate-spin"></div>
              <span className="text-[10px] text-cyber-primary uppercase tracking-[0.5em]">Synchronizing...</span>
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  className="group relative glassmorphism border border-white/5 overflow-hidden transition-all duration-500 hover:border-cyber-primary/30"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image_url || 'https://via.placeholder.com/600x400'}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500"></div>
                    <div className="absolute top-4 right-4 z-20">
                      <span className="px-3 py-1 bg-black/60 border border-white/10 text-[8px] text-white uppercase tracking-widest">
                        Node_{index.toString().padStart(2, '0')}
                      </span>
                    </div>
                  </div>

                  <div className="p-8">
                    <h2 className="text-xl font-bold text-white mb-4 tracking-tighter uppercase line-clamp-1 group-hover:text-cyber-primary transition-colors">
                      {post.title}
                    </h2>
                    
                    <div className="flex items-center text-[10px] text-gray-500 mb-6 space-x-6">
                      <div className="flex items-center">
                        <FaUser className="mr-2 text-cyber-primary" size={10} />
                        <span>{post.author || 'ROOT'}</span>
                      </div>
                      <div className="flex items-center">
                        <FaCalendarAlt className="mr-2 text-cyber-primary" size={10} />
                        <span>{formatDate(post.created_at)}</span>
                      </div>
                    </div>

                    <p className="text-gray-400 text-xs leading-relaxed mb-8 line-clamp-2 font-light">
                      {cleanContent(truncateText(post.description || '', 100))}
                    </p>

                    <div className="flex justify-between items-center border-t border-white/5 pt-6">
                      <Link
                        to={`/blog-post/${post.id}`}
                        className="text-[10px] font-bold text-cyber-primary uppercase tracking-widest hover:text-white transition-colors flex items-center"
                      >
                        <FaEye className="mr-2" /> View_Data
                      </Link>
                      
                      <div className="flex space-x-4">
                        <button
                          onClick={() => navigate(`/blog-form?id=${post.id}`)}
                          className="p-2 text-gray-500 hover:text-cyber-primary transition-colors"
                        >
                          <FaEdit size={14} />
                        </button>
                        <button
                          onClick={() => confirmDelete(post.id, post.image_url)}
                          className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            className="fixed bottom-12 right-12 p-4 bg-cyber-primary text-black rounded-none shadow-[0_0_20px_rgba(0,102,255,0.3)] z-50"
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.1 }}
          >
            <FaChevronUp />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default BlogHome;
