import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import supabase from '../lib/supabaseClient';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { FaSave, FaArrowLeft, FaImage, FaTerminal } from 'react-icons/fa';

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
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image', 'code-block'],
            ['clean'],
          ],
        },
      });

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
    setMessage('UPLOADING_DATA...');

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
        setMessage('ERROR: Upload failed');
        setIsSubmitting(false);
        return;
      }

      imageUrl = `https://wjajpilcrompxkmgjuzp.supabase.co/storage/v1/object/public/blog_posts/${filePath}`;
    }

    const postPayload = { title, content, author, description };
    if (imageUrl) postPayload.image_url = imageUrl;

    const { error } = postId
      ? await supabase.from('blog_posts').update(postPayload).eq('id', postId)
      : await supabase.from('blog_posts').insert([postPayload]);

    if (error) {
      console.error('Error saving post:', error);
      setMessage('ERROR: Save failed');
      setIsSubmitting(false);
    } else {
      setMessage('SUCCESS: Record saved');
      setTimeout(() => navigate('/blog-home'), 1500);
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-black text-white font-mono py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-12 border-b border-white/5 pb-8">
          <div className="flex items-center space-x-4">
            <FaTerminal className="text-cyber-primary" />
            <h1 className="text-3xl font-black tracking-tighter uppercase italic">
              {postId ? 'EDIT_RECORD' : 'NEW_RECORD'}
            </h1>
          </div>
          <Link to="/blog-home">
            <button className="flex items-center text-[10px] text-gray-500 hover:text-white transition-colors uppercase tracking-widest">
              <FaArrowLeft className="mr-2" /> Back_To_Console
            </button>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column: Metadata */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] text-cyber-primary uppercase tracking-widest">Title_String</label>
                <input
                  type="text"
                  className="w-full bg-black/40 border border-white/10 p-4 text-sm text-white focus:outline-none focus:border-cyber-primary transition-all"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter title..."
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-cyber-primary uppercase tracking-widest">Author_ID</label>
                <input
                  type="text"
                  className="w-full bg-black/40 border border-white/10 p-4 text-sm text-white focus:outline-none focus:border-cyber-primary transition-all"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Enter author name..."
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-cyber-primary uppercase tracking-widest">Abstract_Description</label>
                <textarea
                  className="w-full bg-black/40 border border-white/10 p-4 text-sm text-white h-32 focus:outline-none focus:border-cyber-primary transition-all resize-none"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief summary..."
                  required
                />
              </div>
            </div>

            {/* Right Column: Visuals */}
            <div className="space-y-6">
              <label className="text-[10px] text-cyber-primary uppercase tracking-widest block">Visual_Asset</label>
              <div className="relative group border-2 border-dashed border-white/10 hover:border-cyber-primary/50 transition-all p-4 flex flex-col items-center justify-center h-[280px]">
                {imagePreview ? (
                  <img src={imagePreview} className="w-full h-full object-cover opacity-60" alt="Preview" />
                ) : (
                  <div className="text-center space-y-4">
                    <FaImage className="mx-auto text-gray-700" size={40} />
                    <p className="text-[10px] text-gray-600 uppercase tracking-widest">No_Asset_Loaded</p>
                  </div>
                )}
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  accept="image/*"
                />
                <div className="absolute bottom-4 right-4 bg-black/80 p-2 text-[8px] text-cyber-primary uppercase tracking-widest border border-cyber-primary/20">
                  Click_To_Upload
                </div>
              </div>
            </div>
          </div>

          {/* Editor Section */}
          <div className="space-y-2">
            <label className="text-[10px] text-cyber-primary uppercase tracking-widest">Core_Content_Data</label>
            <div className="bg-white/5 border border-white/10 rounded-none overflow-hidden">
              <div ref={quillRef} className="h-96 text-white border-none" />
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-between border-t border-white/5 pt-12">
            <div className="text-[10px] text-cyber-primary animate-pulse tracking-[0.2em]">
              {message}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-12 py-4 bg-transparent border border-cyber-primary text-cyber-primary font-bold uppercase tracking-widest hover:bg-cyber-primary hover:text-black transition-all duration-500 flex items-center group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                <FaSave className="mr-3" /> Commit_Changes
              </span>
              <div className="absolute inset-0 bg-cyber-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .ql-toolbar.ql-snow {
          background: #111 !important;
          border: 1px solid rgba(255,255,255,0.1) !important;
          border-bottom: none !important;
        }
        .ql-container.ql-snow {
          border: 1px solid rgba(255,255,255,0.1) !important;
          background: rgba(0,0,0,0.4) !important;
        }
        .ql-snow .ql-stroke {
          stroke: #999 !important;
        }
        .ql-snow .ql-fill {
          fill: #999 !important;
        }
        .ql-snow .ql-picker {
          color: #999 !important;
        }
        .ql-editor {
          font-family: 'JetBrains Mono', monospace !important;
          font-size: 14px !important;
          line-height: 1.6 !important;
        }
      `}</style>
    </motion.div>
  );
};

export default BlogForm;
