import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from 'emailjs-com';
import { FaEnvelope, FaTimes, FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  return (
    <div className="relative z-50 font-mono">
      <div className="fixed bottom-32 md:bottom-6 right-6 flex flex-col items-center z-50">
        <motion.button
          className="bg-cyber-dark border border-cyber-blue/50 text-cyber-blue p-4 rounded-full shadow-[0_0_15px_rgba(0,243,255,0.3)] hover:shadow-[0_0_25px_rgba(0,243,255,0.5)] transition-all duration-300 group"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? <FaTimes size={20} /> : <FaEnvelope size={20} />}
          <div className="absolute inset-0 rounded-full border border-cyber-blue animate-ping opacity-20 group-hover:opacity-40"></div>
        </motion.button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-52 md:bottom-24 right-6 w-64 md:w-64 glassmorphism p-4 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] z-50 border border-cyber-blue/30"
            initial={{ opacity: 0, scale: 0.8, y: 50, rotateX: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50, rotateX: -20 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyber-blue"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyber-purple"></div>

            <h2 className="text-base font-black mb-4 text-white tracking-widest uppercase italic flex items-center">
              <span className="w-2 h-2 bg-cyber-blue mr-2 animate-pulse"></span>
              COMMS_CHANNEL
            </h2>
            <form
              className="flex flex-col space-y-3"
              onSubmit={sendEmail}
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="ID_IDENTIFIER"
                  className="w-full bg-cyber-dark/50 border border-cyber-blue/20 p-2 rounded-lg text-[10px] text-white transition-premium focus:outline-none focus:border-cyber-blue focus:ring-2 focus:ring-cyber-blue/30 placeholder:text-gray-600"
                  name="from_name"
                  required
                />
              </div>
              <div className="relative">
                <input
                  type="email"
                  placeholder="SIGNAL_ADDR"
                  className="w-full bg-cyber-dark/50 border border-cyber-blue/20 p-2 rounded-lg text-[10px] text-white transition-premium focus:outline-none focus:border-cyber-blue focus:ring-2 focus:ring-cyber-blue/30 placeholder:text-gray-600"
                  name="reply_to"
                  required
                />
              </div>
              <div className="relative">
                <textarea
                  placeholder="ENCODED_MESSAGE"
                  className="w-full bg-cyber-dark/50 border border-cyber-blue/20 p-2 rounded-lg h-24 text-[10px] text-white resize-none focus:outline-none focus:border-cyber-blue focus:ring-1 focus:ring-cyber-blue/50 transition-all placeholder:text-gray-600"
                  name="message"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={formStatus === 'sending'}
                className="group relative overflow-hidden bg-transparent border border-cyber-blue text-cyber-blue py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-cyber-blue hover:text-black transition-all duration-300 disabled:opacity-50"
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  {formStatus === 'sending' ? (
                    'TRANSMITTING...'
                  ) : (
                    <>
                      <span>SEND_SIGNAL</span>
                      <FaPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </span>
              </button>
              {formStatus === 'success' && (
                <p className="text-[10px] text-green-400 text-center animate-pulse">SIGNAL_RECEIVED_SUCCESSFULLY</p>
              )}
              {formStatus === 'error' && (
                <p className="text-[10px] text-red-400 text-center animate-pulse">TRANSMISSION_FAILED_RETRY</p>
              )}
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Contact;
