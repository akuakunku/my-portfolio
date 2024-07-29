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
        setIsOpen(false);
      }, (error) => {
        console.log(error.text);
        alert('Failed to send message. Please try again later.');
      });

    e.target.reset();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setShowText((prev) => !prev);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative z-50">
      {/* Floating Button and Tooltip */}
      <div className="fixed bottom-4 right-4 flex flex-col items-center z-50">
        {/* Floating Button */}
        <button
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-full shadow-md hover:shadow-lg transition-shadow transform hover:scale-95 animate-bounce"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaEnvelope size={20} />
        </button>
        {/* Tooltip */}
        {showText && (
          <motion.span
            className="bg-gray-800 text-white text-xs p-1 rounded-lg shadow-md whitespace-nowrap dark:bg-gray-700 dark:text-gray-100"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            Contact
          </motion.span>
        )}
      </div>
      {isOpen && (
        <motion.div
          className="fixed bottom-16 right-4 w-60 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-300 dark:border-gray-600 z-50"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-lg font-semibold mb-3 text-center text-gray-900 dark:text-gray-100">Contact</h2>
          <form
            className="flex flex-col space-y-3"
            onSubmit={sendEmail}
          >
            <input
              type="text"
              placeholder="Name"
              className="border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-colors"
              name="from_name"
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-colors"
              name="reply_to"
              required
            />
            <textarea
              placeholder="Message"
              className="border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2 rounded-lg h-20 text-sm text-gray-900 dark:text-gray-100 resize-none focus:outline-none focus:ring-1 focus:ring-purple-500 transition-colors"
              name="message"
              required
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 rounded-lg text-sm hover:from-purple-600 hover:to-pink-600 transition-colors"
            >
              Send
            </button>
          </form>
          <button
            className="absolute top-2 right-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 text-lg"
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
