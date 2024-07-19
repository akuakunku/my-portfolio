import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';
import { FaEnvelope } from 'react-icons/fa';

const Contact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showText, setShowText] = useState(true);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_ovz66xg', 'template_3dhvh0j', e.target, 'twXbYizQcqegiXwB0')
      .then((result) => {
        console.log(result.text);
        alert('Message sent successfully!');
        setIsOpen(false); // Close form after sending
      }, (error) => {
        console.log(error.text);
        alert('Failed to send message. Please try again later.');
      });

    e.target.reset();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setShowText((prev) => !prev);
    }, 5000); // Toggle every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="relative">
      {/* Floating Button and Tooltip */}
      <div className="fixed bottom-4 right-4 flex flex-col items-center">
        {/* Floating Button */}
        <button 
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105 animate-bounce"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaEnvelope size={24} />
        </button>
        {/* Tooltip */}
        {showText && (
          <span className=" bg-gray-800 text-white text-xs p-1 rounded-lg shadow-lg whitespace-nowrap">
            Contact Me
          </span>
        )}
      </div>

      {/* Form Popup */}
      {isOpen && (
        <motion.div 
          className="fixed bottom-16 right-4 w-72 md:w-80 bg-white p-4 rounded-lg shadow-lg border border-gray-300"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-xl font-semibold mb-3 text-center text-gray-900">Contact Me</h2>
          <form 
            className="flex flex-col space-y-3"
            onSubmit={sendEmail}
          >
            <input 
              type="text" 
              placeholder="Your Name" 
              className="border border-gray-300 bg-gray-50 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
              name="from_name"
              required
            />
            <input 
              type="email" 
              placeholder="Your Email" 
              className="border border-gray-300 bg-gray-50 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
              name="reply_to"
              required
            />
            <textarea 
              placeholder="Your Message" 
              className="border border-gray-300 bg-gray-50 p-2 rounded-lg h-24 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
              name="message"
              required
            />
            <button 
              type="submit" 
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors"
            >
              Send
            </button>
          </form>
          <button 
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            onClick={() => setIsOpen(false)}
          >
            &times;
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Contact;
