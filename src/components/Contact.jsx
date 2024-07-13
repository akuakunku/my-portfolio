// ./src/components/Contact.jsx
import React from 'react';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';

const Contact = () => {
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_ovz66xg', 'template_3dhvh0j', e.target, 'twXbYizQcqegiXwB0')
      .then((result) => {
        console.log(result.text);
        alert('Message sent successfully!');
      }, (error) => {
        console.log(error.text);
        alert('Failed to send message. Please try again later.');
      });

    e.target.reset();
  };

  return (
    <motion.section 
      className="container mx-auto p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-3xl font-bold mb-4 text-center">Contact Me</h2>
      <form 
        className="flex flex-col space-y-4 max-w-lg mx-auto bg-gray-300"
        onSubmit={sendEmail}
      >
        <input 
          type="text" 
          placeholder="Your Name" 
          className="border p-2 rounded"
          name="from_name"
          required
        />
        <input 
          type="email" 
          placeholder="Your Email" 
          className="border p-2 rounded"
          name="reply_to"
          required
        />
        <textarea 
          placeholder="Your Message" 
          className="border p-2 rounded h-32"
          name="message"
          required
        />
        <button 
          type="submit" 
          className="bg-blue-500 text-white p-2 rounded"
        >
          Send Message
        </button>
      </form>
    </motion.section>
  );
};

export default Contact;
