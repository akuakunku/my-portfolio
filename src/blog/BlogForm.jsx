import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import supabase from '../lib/supabaseClient';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const BlogForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const postId = searchParams.get('id');
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  const quillRef = useRef(null);
  const quillInstance = useRef(null);

  useEffect(() => {
    if (postId) {
      const fetchPost = async () => {
        const { data, error } = await supabase.from('blog_posts').select('*').eq('id', postId).single();
        if (error) console.error('Error fetching post:', error);
        else {
          setTitle(data.title);
          setContent(data.content);
          setAuthor(data.author);
          setDescription(data.description);
          setImagePreview(data.image_url);

          if (quillInstance.current) {
            quillInstance.current.root.innerHTML = data.content;
          }
        }
      };
      fetchPost();
    }
  }, [postId]);

  useEffect(() => {
    if (!quillInstance.current) {
      quillInstance.current = new Quill(quillRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['bold', 'italic', 'underline'],
            ['link', 'image'],
            [{ 'align': [] }],
            ['clean']
          ]
        }
      });

      // Event listener for content changes
      quillInstance.current.on('text-change', () => {
        setContent(quillInstance.current.root.innerHTML);
      });
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    let imageUrl = imagePreview;
    if (image) {
      const fileExt = image.name.split('.').pop();
      const fileName = `${Date.now()}-${image.name}`;
      const filePath = `${fileName}`;
      
      let { error: uploadError } = await supabase.storage
        .from('blog_posts')
        .upload(filePath, image);

      if (uploadError) {
        console.error('Error uploading image:', uploadError);
        setIsSubmitting(false);
        return;
      }

      imageUrl = `https://wjajpilcrompxkmgjuzp.supabase.co/storage/v1/object/public/blog_posts/${filePath}`;
    }

    const postPayload = { title, content, author, description };
    if (imageUrl) postPayload.image_url = imageUrl;

    const { data, error } = postId 
      ? await supabase.from('blog_posts').update(postPayload).eq('id', postId)
      : await supabase.from('blog_posts').insert([postPayload]);

    if (error) {
      console.error('Error saving post:', error);
      setIsSubmitting(false);
    } else {
      navigate('/blog-home');
    }
  };

  return (
    <div className="relative mt-8 p-6 max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-yellow-500 mb-6">
        {postId ? 'Edit Blog Post' : 'Create a New Blog Post'}
      </h2>
      <motion.form 
        onSubmit={handleSubmit} 
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border dark:text-gray-900 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="mt-1 block w-full border dark:text-gray-900 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border dark:text-gray-900 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 resize-y"
            required
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Content</label>
          <div ref={quillRef} className="w-full h-96 border dark:text-gray-900 border-gray-300 rounded-md" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="mt-1 block w-full border dark:text-gray-900 border-gray-300 rounded-md shadow-sm"
          />
          {imagePreview && (
            <img src={imagePreview} alt="Image preview" className="mt-4 max-w-full h-auto rounded-md shadow-sm" />
          )}
        </motion.div>

        <motion.button 
          type="submit" 
          className={`px-4 py-2 text-white rounded ${isSubmitting ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'}`} 
          disabled={isSubmitting}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {isSubmitting ? 'Submitting...' : (postId ? 'Update Blog Post' : 'Create Blog Post')}
        </motion.button>
      </motion.form>
      <button
        onClick={() => navigate('/blog-home')}
        className="fixed bottom-4 left-4 bg-blue-500 text-white rounded-full px-4 py-2 shadow-lg hover:bg-blue-600 transition-colors duration-300"
      >
        Back
      </button>
    </div>
  );
};

export default BlogForm;
