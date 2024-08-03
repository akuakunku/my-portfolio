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
              [{ 'header': [1, 2, false] }],
              ['bold', 'italic', 'underline'],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
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
        let startX, startY;

        toolbar.style.position = 'fixed';
        toolbar.style.cursor = 'move';
        toolbar.style.zIndex = '1000';
        toolbar.style.backgroundColor = '#9ca3af'; // Changed to gray-400
        toolbar.style.color = '#ffffff'; // Changed to white
        toolbar.style.padding = '5px';
        toolbar.style.borderRadius = '3px';
        toolbar.style.boxShadow = '0 1px 5px rgba(0,0,0,0.1)';
        toolbar.style.fontSize = '10px';

        // Set initial position to center
        toolbar.style.top = '50%';
        toolbar.style.left = '50%';
        toolbar.style.transform = 'translate(-50%, -50%)';

        const updateToolbarPosition = () => {
          const rect = toolbar.getBoundingClientRect();
          const maxX = window.innerWidth - rect.width;
          const maxY = window.innerHeight - rect.height;

          let left = parseInt(toolbar.style.left) || maxX / 2;
          let top = parseInt(toolbar.style.top) || maxY / 2;

          left = Math.max(0, Math.min(left, maxX));
          top = Math.max(0, Math.min(top, maxY));

          toolbar.style.left = `${left}px`;
          toolbar.style.top = `${top}px`;
        };

        const dragStart = (e) => {
          isDragging = true;
          startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
          startY = e.type === 'mousedown' ? e.clientY : e.touches[0].clientY;
          startX -= toolbar.offsetLeft;
          startY -= toolbar.offsetTop;
          e.preventDefault();
        };

        const dragMove = (e) => {
          if (isDragging) {
            const clientX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
            const clientY = e.type === 'mousemove' ? e.clientY : e.touches[0].clientY;
            const newX = clientX - startX;
            const newY = clientY - startY;
            toolbar.style.left = `${newX}px`;
            toolbar.style.top = `${newY}px`;
            toolbar.style.transform = 'none';
            updateToolbarPosition();
          }
        };

        const dragEnd = () => {
          isDragging = false;
        };

        // Mouse events
        toolbar.addEventListener('mousedown', dragStart);
        document.addEventListener('mousemove', dragMove);
        document.addEventListener('mouseup', dragEnd);

        // Touch events
        toolbar.addEventListener('touchstart', dragStart);
        document.addEventListener('touchmove', dragMove);
        document.addEventListener('touchend', dragEnd);

        // Responsive adjustments
        window.addEventListener('resize', updateToolbarPosition);

        // Support for dark/light mode
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const setColorScheme = (isDark) => {
          document.documentElement.style.setProperty('--toolbar-bg-color', '#9ca3af'); // Changed to gray-400
          document.documentElement.style.setProperty('--toolbar-text-color', '#ffffff'); // Changed to white
        };

        setColorScheme(darkModeMediaQuery.matches);
        darkModeMediaQuery.addListener((e) => setColorScheme(e.matches));

        // Reduce size of toolbar buttons
        const buttons = toolbar.querySelectorAll('button');
        buttons.forEach(button => {
          button.style.width = '20px';
          button.style.height = '20px';
          button.style.padding = '2px';
          button.style.minWidth = 'unset';
          button.style.color = '#ffffff'; // Changed icon color to white
        });

        // Reduce size of toolbar dropdowns
        const selects = toolbar.querySelectorAll('select');
        selects.forEach(select => {
          select.style.height = '20px';
          select.style.padding = '0 2px';
          select.style.fontSize = '12px';
          select.style.color = '#ffffff'; // Changed text color to white
        });
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
    <div className="relative mt-4 p-4 max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-gray-900 dark:text-yellow-500 mb-4">
        {postId ? 'Edit Blog Post' : 'Create a New Blog Post'}
      </h2>
      {message && <p className={`text-xs ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>{message}</p>}
      <motion.form
        onSubmit={handleSubmit}
        className="space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-1.5 text-sm block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700"
            required
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="mt-1 p-1.5 text-sm block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700"
            required
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 p-1.5 text-sm block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 resize-y text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700"
            required
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <label className="block text-xs mb-6 font-medium text-gray-700 dark:text-gray-300">Content</label>
          <div className="relative">
            <div 
              ref={quillRef} 
              className="border border-gray-300 rounded-md text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700"
              style={{ maxHeight: '400px', overflowY: 'auto' }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">Image Cover</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="mt-1 text-xs block w-full border border-gray-300 rounded-md shadow-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700"
          />
          {imagePreview && (
            <img src={imagePreview} alt="Image preview" className="mt-3 w-32 h-auto rounded-md shadow-sm" />
          )}
        </motion.div>

        <motion.button
          type="submit"
          className={`px-3 py-1.5 text-sm text-white rounded ${isSubmitting ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'}`}
          disabled={isSubmitting}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {isSubmitting ? 'Submitting...' : (postId ? 'Update Post' : 'Create Post')}
        </motion.button>
      </motion.form>
      <button
        onClick={() => navigate('/blog-home')}
        className="fixed bottom-3 left-3 bg-blue-500 text-white text-xs rounded-full px-3 py-1.5 shadow-lg hover:bg-blue-600 transition-colors duration-300"
      >
        Back
      </button>
    </div>
  );
};

export default BlogForm;
