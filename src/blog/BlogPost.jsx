import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import supabase from '../lib/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import DOMPurify from 'dompurify';
import { formatDate } from '../utils/formatDate';
import { FaClock, FaCalendarAlt, FaUser, FaEdit, FaArrowLeft, FaTerminal } from 'react-icons/fa';

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
      <div className="min-h-screen bg-black flex flex-col justify-center items-center space-y-4 font-mono">
        <div className="w-12 h-12 border-2 border-cyber-primary border-t-transparent rounded-full animate-spin"></div>
        <span className="text-[10px] text-cyber-primary uppercase tracking-[0.5em]">Decrypting_Data...</span>
      </div>
    );

  if (!post)
    return (
      <div className="min-h-screen bg-black flex flex-col justify-center items-center font-mono">
        <h1 className="text-4xl font-black text-red-500 mb-4 tracking-tighter uppercase">ERROR: RECORD_NOT_FOUND</h1>
        <button onClick={() => navigate(-1)} className="text-cyber-primary text-xs uppercase tracking-widest hover:text-white">Return_To_Root</button>
      </div>
    );

  const cleanContent = DOMPurify.sanitize(post.content);

  const hasBeenEdited =
    post.updated_at &&
    new Date(post.updated_at).getTime() > new Date(post.created_at).getTime();

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return `${formatDate(dateString)} | ${date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })}`;
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono py-24">
      <AnimatePresence>
        <motion.div
          className="container mx-auto px-6 max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header Metadata */}
          <header className="mb-16">
            <div className="flex items-center space-x-4 mb-8">
              <FaTerminal className="text-cyber-primary" />
              <span className="text-[10px] text-gray-500 uppercase tracking-[0.5em]">Data_Archive_Node: {post.id.substring(0, 8)}</span>
            </div>

            <motion.h1
              className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter uppercase italic leading-tight"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {post.title}
            </motion.h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-y border-white/5 py-8">
              <div className="flex items-center text-[10px] text-cyber-primary uppercase tracking-widest">
                <FaUser className="mr-3" />
                <span className="text-gray-400">Author:</span>
                <span className="ml-2 text-white">{post.author || 'ROOT'}</span>
              </div>
              <div className="flex items-center text-[10px] text-cyber-primary uppercase tracking-widest">
                <FaCalendarAlt className="mr-3" />
                <span className="text-gray-400">Timestamp:</span>
                <span className="ml-2 text-white">{formatDateTime(post.created_at)}</span>
              </div>
              {hasBeenEdited && (
                <div className="flex items-center text-[10px] text-cyber-purple uppercase tracking-widest md:col-span-2">
                  <FaEdit className="mr-3" />
                  <span className="text-gray-500">Last_Modification:</span>
                  <span className="ml-2 text-white">{formatDateTime(post.updated_at)}</span>
                </div>
              )}
            </div>
          </header>

          {/* Hero Image */}
          {post.image_url && (
            <motion.div 
              className="mb-16 relative aspect-video overflow-hidden border border-white/10"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            </motion.div>
          )}

          {/* Abstract */}
          <motion.p
            className="text-xl text-cyber-primary/80 font-light mb-12 leading-relaxed italic border-l-2 border-cyber-primary pl-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {post.description}
          </motion.p>

          {/* Core Content */}
          <motion.article
            className="prose prose-invert prose-cyber max-w-none mb-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div 
              className="text-gray-300 leading-loose text-sm md:text-base space-y-6"
              dangerouslySetInnerHTML={{ __html: cleanContent }} 
            />
          </motion.article>

          {/* Footer Navigation */}
          <footer className="flex flex-col md:flex-row justify-between items-center border-t border-white/5 pt-12 text-[10px] text-gray-600 uppercase tracking-widest">
            <div className="flex items-center mb-6 md:mb-0">
              <FaClock className="mr-3 text-cyber-primary" />
              Published_On: {formatDate(post.created_at)}
            </div>
            
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-4 group text-cyber-primary hover:text-white transition-colors"
            >
              <FaArrowLeft className="group-hover:-translate-x-2 transition-transform" />
              <span>Return_To_Stream</span>
            </button>
          </footer>
        </motion.div>
      </AnimatePresence>

      <style>{`
        .prose-cyber {
          font-family: 'JetBrains Mono', monospace;
        }
        .prose-cyber h1, .prose-cyber h2, .prose-cyber h3 {
          color: #fff !important;
          text-transform: uppercase;
          letter-spacing: -0.05em;
          font-weight: 900;
          font-style: italic;
        }
        .prose-cyber p {
          color: rgba(255, 255, 255, 0.7);
        }
        .prose-cyber a {
          color: #0066ff !important;
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: all 0.3s;
        }
        .prose-cyber a:hover {
          border-bottom-color: #0066ff;
        }
        .prose-cyber blockquote {
          border-left: 4px solid #0066ff;
          background: rgba(0, 102, 255, 0.05);
          padding: 2rem;
          font-style: italic;
        }
        .prose-cyber code {
          background: rgba(255, 255, 255, 0.05);
          color: #00f3ff;
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default BlogPost;
