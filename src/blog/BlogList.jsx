import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import supabase from '../lib/supabaseClient';
import { FaCalendarAlt, FaUser, FaChevronLeft, FaChevronRight, FaClock } from 'react-icons/fa';

const truncateTitle = (title, maxLength) => 
  !title ? '' : title.length <= maxLength ? title : `${title.substring(0, maxLength)}...`;

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })} ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
};

const PAGE_SIZE = 6;

const BlogPost = ({ post }) => (
  <motion.div
    key={post.id}
    className={`bg-white dark:bg-gray-900 rounded-lg border-2 border-blue-600 dark:border-blue-700 shadow overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg`}
    initial={{ opacity: 0, scale: 0.9, rotateY: -90 }}
    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
    exit={{ opacity: 0, scale: 0.9, rotateY: 90 }}
    whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
    transition={{ type: "spring", stiffness: 260, damping: 20 }}
  >
    {post.image_url && (
      <motion.img
        src={post.image_url}
        alt={post.title}
        className="w-full h-24 sm:h-24 object-cover border-2 rounded-lg p-2"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      />
    )}
    <motion.div 
      className="p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
        {truncateTitle(post.title, 30)}
      </h2>
      <div className="flex items-center text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2">
        <FaUser className="mr-1 text-xs" />
        <span className="font-medium mr-3">{post.author}</span>
        <FaCalendarAlt className="mr-1 text-xs" />
        <span className="mr-3">{formatDate(post.created_at).split(' ').slice(0, 3).join(' ')}</span>
        <FaClock className="mr-1 text-xs" />
        <span>{formatDate(post.created_at).split(' ').slice(3).join(' ')}</span>
      </div>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          to={`/blog-post/${post.id}`}
          className="inline-block px-3 py-1 text-xs sm:text-sm bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Read more
        </Link>
      </motion.div>
    </motion.div>
  </motion.div>
);

const Pagination = ({ currentPage, totalPages, handlePageChange }) => (
  <motion.div 
    className="flex justify-center mt-4 space-x-2 sm:space-x-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5 }}
  >
    <motion.button
      onClick={() => handlePageChange(currentPage - 1)}
      className={`flex items-center px-2 sm:px-3 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium ${
        currentPage === 1
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : 'bg-blue-600 text-white hover:bg-blue-700'
      }`}
      disabled={currentPage === 1}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <FaChevronLeft className="mr-1 text-xs" />
      Prev
    </motion.button>
    <motion.span 
      className="flex items-center text-xs sm:text-sm font-semibold bg-gray-200 dark:bg-gray-700 px-2 sm:px-3 py-1 sm:py-2 rounded-full"
      whileHover={{ scale: 1.05 }}
    >
      Page {currentPage} of {totalPages}
    </motion.span>
    <motion.button
      onClick={() => handlePageChange(currentPage + 1)}
      className={`flex items-center px-2 sm:px-3 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium ${
        currentPage === totalPages
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : 'bg-blue-600 text-white hover:bg-blue-700'
      }`}
      disabled={currentPage === totalPages}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Next
      <FaChevronRight className="ml-1 text-xs" />
    </motion.button>
  </motion.div>
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
        .range((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE - 1);

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
    }
  };

  const pageVariants = useMemo(() => ({
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  }), []);

  return (
    <motion.div 
      className="text-gray-800 dark:text-gray-200 font-sans bg-gray-100 dark:bg-gray-900 rounded-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-2 py-2 sm:py-4">
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          My Blog
        </motion.h1>
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loader"
              className="flex justify-center items-center h-48 sm:h-64"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.5 }}
            >
              <div className="loader ease-linear rounded-full border-4 sm:border-8 border-t-4 sm:border-t-8 border-gray-200 h-12 w-12 sm:h-16 sm:w-16 animate-spin"></div>
            </motion.div>
          ) : (
            <motion.div
              key={currentPage}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5, staggerChildren: 0.1 }}
            >
              {posts.map((post) => (
                <BlogPost key={post.id} post={post} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
    </motion.div>
  );
};

export default BlogList;
