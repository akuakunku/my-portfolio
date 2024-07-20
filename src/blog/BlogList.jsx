import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import supabase from '../lib/supabaseClient';
import DOMPurify from 'dompurify';


// Helper function to truncate text
const truncateText = (text, maxLength) => {
  if (!text) return '';
  const plainText = text.replace(/<\/?[^>]+>/gi, '');
  if (plainText.length <= maxLength) return plainText;
  return plainText.substring(0, maxLength) + '...';
};

const PAGE_SIZE = 6;

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
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
    };
    fetchPosts();
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="py-4 bg-gray-300 dark:bg-dark-bg">
      <div className='text-center font-bold mb-8'>
        <h2 className="text-xl">MY BLOG</h2>
      </div>
      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              className="bg-gray-400 dark:bg-gray-800 border border-gray-500 dark:border-gray-700 p-4 rounded-lg shadow-lg hover:shadow-2xl transition-transform duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
            >
              {post.image_url && (
                <motion.img
                  src={post.image_url}
                  alt={post.title}
                  className="w-full h-32 object-cover mb-4 rounded-lg shadow-md"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                />
              )}
              <div className="mb-4 flex flex-col items-center">
                <h2 className="text-xl font-bold text-gray-900 dark:text-yellow-500 mb-2 text-center">{post.title}</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4 text-center" 
                   dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(truncateText(post.description, 100)) }}>
                </p>
                <Link 
                  to={`/blog-post/${post.id}`} 
                  className="inline-block mt-4 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-lg font-semibold transition-colors duration-300"
                >
                  Read more
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center mt-4 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className={`px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span className="flex items-center text-lg font-semibold">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className={`px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''}`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogList;
