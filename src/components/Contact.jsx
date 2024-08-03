import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from 'emailjs-com';
import { FaEnvelope, FaTimes, FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showText, setShowText] = useState(true);
  const [formStatus, setFormStatus] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();
    setFormStatus('sending');

    emailjs.sendForm('service_ovz66xg', 'template_3dhvh0j', e.target, 'twXbYizQcqegiXwB0')
      .then((result) => {
        console.log(result.text);
        setFormStatus('success');
        setTimeout(() => {
          setIsOpen(false);
          setFormStatus('');
        }, 2000);
      }, (error) => {
        console.log(error.text);
        setFormStatus('error');
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
      <div className="fixed bottom-4 right-4 flex flex-col items-center z-50">
        <motion.button
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaEnvelope size={16} />
        </motion.button>
        <AnimatePresence>
          {showText && (
            <motion.span
              className="bg-gray-800 text-white text-xs py-1 px-2 rounded-md shadow-sm whitespace-nowrap dark:bg-gray-700 dark:text-gray-100 mt-1"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              Contact
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-16 right-4 w-64 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50"
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-lg font-semibold mb-3 text-center text-gray-900 dark:text-gray-100">Contact Us</h2>
            <form
              className="flex flex-col space-y-2"
              onSubmit={sendEmail}
            >
              <input
                type="text"
                placeholder="Name"
                className="border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-1 rounded-md text-xs text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all"
                name="from_name"
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-1 rounded-md text-xs text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all"
                name="reply_to"
                required
              />
              <textarea
                placeholder="Message"
                className="border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-1 rounded-md h-16 text-xs text-gray-900 dark:text-gray-100 resize-none focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all"
                name="message"
                required
              />
              <motion.button
                type="submit"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-1 px-2 rounded-md text-xs font-medium hover:from-purple-600 hover:to-pink-600 transition-all flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={formStatus === 'sending'}
              >
                {formStatus === 'sending' ? 'Sending...' : (
                  <>
                    <FaPaperPlane className="mr-1" size={10} />
                    Send
                  </>
                )}
              </motion.button>
            </form>
            {formStatus === 'success' && (
              <motion.p
                className="mt-2 text-green-500 text-center text-sm font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Message sent!
              </motion.p>
            )}
            {formStatus === 'error' && (
              <motion.p
                className="mt-2 text-red-500 text-center text-sm font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Failed to send. Try again.
              </motion.p>
            )}
            <motion.button
              className="absolute top-2 right-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              onClick={() => setIsOpen(false)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaTimes size={16} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Contact;
