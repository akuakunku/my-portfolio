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
  const [message, setMessage] = useState('');

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
          toolbar: {
            container: [
              [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              ['bold', 'italic', 'underline', 'strike'],
              [{ 'script': 'sub' }, { 'script': 'super' }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              ['link', 'image'],
              [{ 'align': [] }],
              ['clean']
            ],
            handlers: {
              'image': function () {
                const input = document.createElement('input');
                input.setAttribute('type', 'file');
                input.setAttribute('accept', 'image/*');
                input.click();

                input.onchange = async () => {
                  const file = input.files[0];
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    const imageUrl = reader.result;
                    localStorage.setItem(`image-${Date.now()}`, imageUrl);
                    const range = quillInstance.current.getSelection();
                    const img = document.createElement('img');
                    img.src = imageUrl;
                    img.style.maxWidth = '80%';
                    img.classList.add('resizable-image');
                    quillInstance.current.insertEmbed(range.index, 'image', imageUrl);
                  };
                  reader.readAsDataURL(file);
                };
              }
            }
          }
        }
      });

      quillInstance.current.on('text-change', () => {
        setContent(quillInstance.current.root.innerHTML);
      });

      // Add draggable functionality to the toolbar
      const toolbar = document.querySelector('.ql-toolbar');
      if (toolbar) {
        let isDragging = false;
        let startX, startY, initialX, initialY;

        const dragStart = (e) => {
          isDragging = true;
          startX = e.clientX || e.touches[0].clientX;
          startY = e.clientY || e.touches[0].clientY;
          initialX = toolbar.offsetLeft;
          initialY = toolbar.offsetTop;
          document.addEventListener('mousemove', dragMove);
          document.addEventListener('mouseup', dragEnd);
          document.addEventListener('touchmove', dragMove);
          document.addEventListener('touchend', dragEnd);
        };

        const dragMove = (e) => {
          if (isDragging) {
            const clientX = e.clientX || e.touches[0].clientX;
            const clientY = e.clientY || e.touches[0].clientY;
            const dx = clientX - startX;
            const dy = clientY - startY;
            toolbar.style.left = `${initialX + dx}px`;
            toolbar.style.top = `${initialY + dy}px`;
          }
        };

        const dragEnd = () => {
          isDragging = false;
          document.removeEventListener('mousemove', dragMove);
          document.removeEventListener('mouseup', dragEnd);
          document.removeEventListener('touchmove', dragMove);
          document.removeEventListener('touchend', dragEnd);
        };

        toolbar.addEventListener('mousedown', dragStart);
        toolbar.addEventListener('touchstart', dragStart);
      }
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

    const content = quillInstance.current.root.innerHTML;
    let imageUrl = imagePreview;

    if (image) {
      const fileExt = image.name.split('.').pop();
      const fileName = `${Date.now()}-${image.name}`;
      const filePath = `images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('blog_posts')
        .upload(filePath, image);

      if (uploadError) {
        console.error('Error uploading image:', uploadError);
        setMessage('Error uploading image. Please try again.');
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
      setMessage('Error saving post. Please try again.');
      setIsSubmitting(false);
    } else {
      setMessage('Post saved successfully!');
      setTimeout(() => navigate('/blog-home'), 2000);
    }
  };

  return (
    <div className="relative mt-8 p-6 max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-yellow-500 mb-6">
        {postId ? 'Edit Blog Post' : 'Create a New Blog Post'}
      </h2>
      {message && <p className={`text-sm ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>{message}</p>}
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
            className="mt-1 p-2 block w-full border dark:text-gray-900 dark:bg-gray-300 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
            className="mt-1 p-2 block w-full border dark:text-gray-900 dark:bg-gray-300 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
            className="mt-1 p-2 block w-full border dark:text-gray-900 dark:bg-gray-300 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 resize-y"
            required
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <label className="block text-sm mb-8 font-medium text-gray-800 dark:text-gray-300">Content</label>
          <div className="relative">
            <div ref={quillRef} className="border dark:text-gray-300 border-gray-300 rounded-md" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image Cover</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="mt-1 block w-full border dark:text-gray-300 border-gray-300 rounded-md shadow-sm"
          />
          {imagePreview && (
            <img src={imagePreview} alt="Image preview" className="mt-4 w-40 h-auto rounded-md shadow-sm" />
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
