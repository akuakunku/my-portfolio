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
        setPosts(data);
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = async (id, imageUrl) => {
    try {
      if (imageUrl) {
        const { data, error: deleteError } = await supabase.storage
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

  return (
    <div className="py-8 bg-gray-200 dark:bg-dark-bg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-blue-900 dark:text-yellow-500">Blog</h1>
          <Link to="/blog-form">
            <button className="px-6 py-3 bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600 transition-colors duration-300">
              Create Blog Post
            </button>
          </Link>
        </div>
        <ul className="space-y-6">
          {posts.map((post) => (
            <motion.li
              key={post.id}
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start gap-4">
                {post.image_url && (
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                )}
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-yellow-500 mb-2">
                    {truncateTitle(post.title, 20)}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {cleanContent(truncateText(post.description, 50))}
                  </p>
                  <Link to={`/blog-post/${post.id}`} className="text-blue-500 hover:underline dark:text-blue-400">
                    Read more
                  </Link>
                </div>
              </div>
              <div className="flex justify-end gap-4 mt-4">
                <button
                  onClick={() => navigate(`/blog-form?id=${post.id}`)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => confirmDelete(post.id, post.image_url)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
                >
                  Delete
                </button>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BlogHome;
