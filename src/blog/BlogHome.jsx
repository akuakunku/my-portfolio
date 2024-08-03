import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import supabase from '../lib/supabaseClient';
import DOMPurify from 'dompurify';
import { FaPlus, FaEdit, FaTrash, FaCalendarAlt, FaUser, FaChevronUp, FaEye } from 'react-icons/fa';

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
          .from('your-bucket-name')
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
    const confirmed = window.confirm('Are you sure you want to delete this post?');
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
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
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
      className="min-h-screen mb-4 p-2 rounded-lg bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto">
        <motion.div 
          className="flex flex-col sm:flex-row justify-between items-center py-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-4 sm:mb-0">Blog Management</h1>
          <Link to="/blog-form">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgb(167, 139, 250)" }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg shadow-md transition-all duration-300 text-sm flex items-center"
            >
              <FaPlus className="mr-2" /> Create Post
            </motion.button>
          </Link>
        </motion.div>
        <AnimatePresence>
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center h-64"
            >
              <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32 animate-spin"></div>
            </motion.div>
          ) : (
            <motion.ul
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {posts.map((post, index) => (
                <motion.li
                  key={post.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="relative pb-2/3 group">
                    <img
                      src={post.image_url || 'https://via.placeholder.com/300x200'}
                      alt={post.title}
                      className="absolute h-full w-full object-cover transition-transform duration-300 transform group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Link
                        to={`/blog-post/${post.id}`}
                        className="text-white text-lg font-semibold flex items-center"
                      >
                        <FaEye className="mr-2" /> View Post
                      </Link>
                    </div>
                  </div>
                  <div className="p-6">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-yellow-400 mb-3">
                      {truncateTitle(post.title, 50)}
                    </h2>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <FaUser className="mr-2" />
                      <span className="font-medium">{post.author || 'Anonymous'}</span>
                      <FaCalendarAlt className="ml-4 mr-2" />
                      <span>{formatDate(post.created_at)}</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                      {cleanContent(truncateText(post.description, 20))}
                    </p>
                    <div className="flex justify-between items-center mt-4">
                      <Link
                        to={`/blog-post/${post.id}`}
                        className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-200 text-sm font-medium transition-colors duration-300"
                      >
                        Read more
                      </Link>
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1, rotate: 15 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => navigate(`/blog-form?id=${post.id}`)}
                          className="p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors duration-300"
                        >
                          <FaEdit />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1, rotate: -15 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => confirmDelete(post.id, post.image_url)}
                          className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-300"
                        >
                          <FaTrash />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            className="fixed bottom-8 right-8 p-4 bg-purple-600 text-white rounded-full shadow-lg"
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaChevronUp />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default BlogHome;
