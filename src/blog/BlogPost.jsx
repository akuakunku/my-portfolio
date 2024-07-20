import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import supabase from '../lib/supabaseClient';
import { motion } from 'framer-motion';
import DOMPurify from 'dompurify';
import { formatDate } from '../utils/formatDate';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single();
      if (error) console.error('Error fetching post:', error);
      else setPost(data);
    };
    fetchPost();
  }, [id]);

  if (!post) return <p className="text-center text-gray-700 dark:text-gray-300">Loading...</p>;

  // Clean the content to prevent XSS attacks
  const cleanContent = DOMPurify.sanitize(post.content);

  // Check if the post has been updated
  const hasBeenEdited = post.updated_at && new Date(post.updated_at).getTime() > new Date(post.created_at).getTime();

  return (
    <div className="relative mt-8 py-4 px-4 max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <header className="mb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span className="font-semibold">{post.author}</span> | {formatDate(post.created_at)}
            {hasBeenEdited && (
              <span className="ml-4 text-gray-500 dark:text-gray-400">
                (Last edited on {formatDate(post.updated_at)})
              </span>
            )}
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-yellow-500 mb-4">{post.title}</h1>
          <div className="border-t border-gray-300 dark:border-gray-700 mb-6"></div>
          {post.image_url && (
            <motion.img
              src={post.image_url}
              alt={post.title}
              className="w-full max-w-md mx-auto h-auto object-cover rounded-lg shadow-md mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          )}
          <p className="text-gray-600 dark:text-gray-300 text-base mb-6">
            {post.description}
          </p>
          <div className="border-t border-gray-300 dark:border-gray-700 mb-8"></div>
        </motion.div>
      </header>

      <motion.article
        className="prose prose-lg dark:prose-invert mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div
          dangerouslySetInnerHTML={{ __html: cleanContent }}
        />
      </motion.article>

      <footer className="border-t border-gray-200 dark:border-gray-700 pt-4 text-gray-600 dark:text-gray-300 text-sm text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Published on {formatDate(post.created_at)}
          {hasBeenEdited && (
            <span className="ml-4">
              (Last edited on {formatDate(post.updated_at)})
            </span>
          )}
        </motion.p>
      </footer>

      <button
        onClick={() => navigate(-1)}
        className="fixed bottom-4 left-4 bg-blue-500 text-white rounded-full px-4 py-2 shadow-lg hover:bg-blue-600 transition-colors duration-300"
      >
        Back
      </button>
    </div>
  );
};

export default BlogPost;
