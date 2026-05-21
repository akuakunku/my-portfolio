import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import supabase from '../lib/supabaseClient';
import { FaCalendarAlt, FaUser, FaChevronLeft, FaChevronRight, FaClock, FaEye } from 'react-icons/fa';

const truncateTitle = (title, maxLength) => 
  !title ? '' : title.length <= maxLength ? title : `${title.substring(0, maxLength)}...`;

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })} ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
};

const PAGE_SIZE = 6;

const BlogPost = ({ post, index }) => (
  <motion.div
    key={post.id}
    className="group relative glassmorphism border border-white/5 overflow-hidden transition-all duration-500 hover:border-cyber-primary/30 bg-black/20"
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
    </div>

    <div className="p-8">
      <h2 className="text-xl font-bold text-white mb-4 tracking-tighter uppercase line-clamp-1 group-hover:text-cyber-primary transition-colors font-mono">
        {post.title}
      </h2>
      
      <div className="flex items-center text-[10px] text-gray-500 mb-6 space-x-6 font-mono">
        <div className="flex items-center">
          <FaUser className="mr-2 text-cyber-primary" size={10} />
          <span>{post.author || 'ROOT'}</span>
        </div>
        <div className="flex items-center">
          <FaCalendarAlt className="mr-2 text-cyber-primary" size={10} />
          <span>{formatDate(post.created_at).split(' ').slice(0, 3).join(' ')}</span>
        </div>
      </div>

      <p className="text-gray-400 text-xs leading-relaxed mb-8 line-clamp-2 font-light font-mono">
        {post.description || 'Accessing encrypted data stream...'}
      </p>

      <div className="border-t border-white/5 pt-6">
        <Link
          to={`/blog-post/${post.id}`}
          className="inline-flex items-center text-[10px] font-bold text-cyber-primary uppercase tracking-widest hover:text-white transition-colors group/btn font-mono"
        >
          <FaEye className="mr-2" /> 
          <span className="relative">
            Read_More
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyber-primary transition-all group-hover/btn:w-full"></span>
          </span>
        </Link>
      </div>
    </div>
  </motion.div>
);

const Pagination = ({ currentPage, totalPages, handlePageChange }) => (
  <div className="flex justify-center items-center space-x-8 mt-16 font-mono">
    <button
      onClick={() => handlePageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className={`flex items-center space-x-2 text-[10px] uppercase tracking-[0.3em] transition-colors ${
        currentPage === 1 ? 'text-gray-700 cursor-not-allowed' : 'text-cyber-primary hover:text-white'
      }`}
    >
      <FaChevronLeft size={10} />
      <span>Prev_Sector</span>
    </button>
    
    <span className="text-[10px] text-gray-500 uppercase tracking-widest">
      {currentPage.toString().padStart(2, '0')} / {totalPages.toString().padStart(2, '0')}
    </span>

    <button
      onClick={() => handlePageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className={`flex items-center space-x-2 text-[10px] uppercase tracking-[0.3em] transition-colors ${
        currentPage === totalPages ? 'text-gray-700 cursor-not-allowed' : 'text-cyber-primary hover:text-white'
      }`}
    >
      <span>Next_Sector</span>
      <FaChevronRight size={10} />
    </button>
  </div>
);

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      const { count, data, error } = await supabase
        .from('blog_posts')
        .select('*', { count: 'exact' })
        .range((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE - 1)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error);
      } else {
        setPosts(data);
        setTotalPages(Math.ceil(count / PAGE_SIZE));
      }
      setIsLoading(false);
    };
    fetchPosts();
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h1
            className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            DATA_STREAM
          </motion.h1>
          <div className="flex items-center justify-center space-x-4">
            <div className="w-12 h-px bg-cyber-primary/30"></div>
            <span className="text-[10px] text-gray-500 uppercase tracking-[0.5em]">Archives & Logs</span>
            <div className="w-12 h-px bg-cyber-primary/30"></div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loader"
              className="flex flex-col justify-center items-center h-64 space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="w-12 h-12 border-2 border-cyber-primary border-t-transparent rounded-full animate-spin"></div>
              <span className="text-[10px] text-cyber-primary uppercase tracking-[0.5em]">Fetching_Logs...</span>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <BlogPost key={post.id} post={post} index={index} />
              ))}
            </div>
          )}
        </AnimatePresence>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default BlogList;
