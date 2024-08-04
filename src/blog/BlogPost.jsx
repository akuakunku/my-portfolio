import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import supabase from '../lib/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import DOMPurify from 'dompurify';
import { formatDate } from '../utils/formatDate';
import { FaClock, FaCalendarAlt, FaUser, FaEdit } from 'react-icons/fa';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single();
      if (error) console.error('Error fetching post:', error);
      else setPost(data);
      setIsLoading(false);
    };
    fetchPost();
  }, [id]);

  if (isLoading)
    return (
      <motion.div
        className="flex justify-center items-center h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </motion.div>
    );

  if (!post)
    return (
      <p className="text-center text-gray-700 dark:text-gray-300">
        Post not found
      </p>
    );

  const cleanContent = DOMPurify.sanitize(post.content);

  const hasBeenEdited =
    post.updated_at &&
    new Date(post.updated_at).getTime() > new Date(post.created_at).getTime();

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return `${formatDate(dateString)} at ${date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })}`;
  };

  return (
    <AnimatePresence>
      <motion.div
        className="relative py-8 px-4 md:px-8 lg:px-16 mx-auto bg-gray-300 dark:bg-gray-900 min-h-screen"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <header className="mb-12 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
                <FaUser className="mr-2" />
                <span className="font-semibold">{post.author}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
                <FaCalendarAlt className="mr-2" />
                {formatDateTime(post.created_at)}
              </div>
              {hasBeenEdited && (
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <FaEdit className="mr-2" />
                  Last edited on {formatDateTime(post.updated_at)}
                </div>
              )}
            </div>
            <motion.h1
              className="text-4xl font-extrabold text-gray-900 dark:text-yellow-500 mb-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {post.title}
            </motion.h1>
            <div className="border-t border-gray-300 dark:border-gray-700 mb-6"></div>
            {post.image_url && (
              <motion.img
                src={post.image_url}
                alt={post.title}
                className="w-1/2 h-auto mx-auto object-cover rounded-lg shadow-md mb-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              />
            )}
            <motion.p
              className="text-gray-600 dark:text-gray-300 text-lg mb-6 md:text-base"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              {post.description}
            </motion.p>
            <div className="border-t border-gray-300 dark:border-gray-700 mb-8"></div>
          </motion.div>
        </header>

        <motion.article
          className="prose prose-lg dark:prose-invert mx-auto mb-12 max-w-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <div dangerouslySetInnerHTML={{ __html: cleanContent }} />
        </motion.article>

        <footer className="border-t border-gray-200 dark:border-gray-700 pt-4 text-gray-600 dark:text-gray-300 text-sm text-center max-w-7xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <FaClock className="inline mr-2" />
            Published on {formatDateTime(post.created_at)}
          </motion.p>
        </footer>
        <motion.button
          onClick={() => navigate(-1)}
          className="fixed bottom-4 left-4 bg-blue-500 text-white rounded-full px-3 py-1 text-sm shadow-lg hover:bg-blue-600 transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ scale: 1.05, rotate: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          Back
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
};

export default BlogPost;
