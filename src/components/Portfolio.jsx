import React from 'react';
import { motion } from 'framer-motion';

const Portfolio = ({ theme }) => {
  const projects = [
    { 
      title: "Resep Masakan Indonesia", 
      description: "A website that provides various Indonesian recipes. LINK BROKEN",
      image: "/img/projects1.jpg",
      link: "#"
    },
    { 
      title: "Form Pendaftaran Wifi", 
      description: "A web-based application pendaftaran Wifi.",
      image: "/img/projects2.jpg",
      link: "https://heaven-link.vercel.app/"
    },
    { 
      title: "Web App Manajemen Pembayaran", 
      description: "Web app untuk mendata atau memasukan data client yang sudah membayar wifi bulanan.",
      image: "/img/projects3.jpg",
      link: "https://app-pembayaran-wifi.vercel.app/"
    },
  ];

  return (
    <section className={`p-4 ${theme === 'dark' ? 'bg-gray-900 text-gray-300' : 'bg-gray-300 text-gray-800'}`}>
      <h2 className="text-4xl font-bold mb-6 text-center">Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className={`bg-gray-300 p-4 rounded-lg shadow-lg ${theme === 'dark' ? 'dark:bg-gray-800 dark:text-gray-300' : 'light:bg-white light:text-gray-800'}`}
            whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)' }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-48 object-cover mb-4 rounded-lg"
            />
            <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
            <p className="text-gray-600 mb-4">{project.description}</p>
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`text-blue-600 hover:text-blue-800 transition-colors`}
            >
              View Project
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
