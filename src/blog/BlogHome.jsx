import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import supabase from '../lib/supabaseClient';
import DOMPurify from 'dompurify';

const BlogHome = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase.from('blog_posts').select('*');
      if (error) {
        console.error('Error fetching posts:', error);
      } else {
        console.log('Fetched posts:', data);
        setPosts(data);
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    const { error } = await supabase.from('blog_posts').delete().eq('id', id);
    if (error) {
      console.error('Error deleting post:', error);
    } else {
      setPosts(posts.filter(post => post.id !== id));
    }
  };

  const truncateText = (text, length) => {
    const plainText = text.replace(/<\/?[^>]+>/gi, '');
    return plainText.length > length ? plainText.substring(0, length) + '...' : plainText;
  };

  const cleanContent = (content) => DOMPurify.sanitize(content);

  return (
    <div className="py-8 bg-gray-100 dark:bg-dark-bg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-900 dark:text-yellow-500">Blog</h1>
          <Link to="/blog-form">
            <button className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
              Create Blog Post
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-lg shadow-sm transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}
              transition={{ duration: 0.5 }}
            >
              {post.image_url && (
                <motion.img
                  src={post.image_url}
                  alt={post.title}
                  className="w-full h-32 object-cover mb-4 rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />
              )}
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-yellow-500 mb-2 justify-center text-center">{post.title}</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4 justify-center text-center" 
                   dangerouslySetInnerHTML={{ __html: cleanContent(truncateText(post.description, 50)) }}>
                </p>
              </div>
              <div className="border-t border-gray-300 dark:border-gray-700 mb-8"></div>
              <Link to={`/blog-post/${post.id}`} className="text-blue-500 hover:underline dark:text-blue-400">
                Read more
              </Link>
              <div className="flex justify-between mt-4">
                <button 
                  onClick={() => navigate(`/blog-form?id=${post.id}`)} 
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(post.id)} 
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogHome;
