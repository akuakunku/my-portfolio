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
      title: "web app manajement pembayaran", 
      description: "web app untuk mendata atau memasukan data client yang sudah membayar wifi bulanan.",
      image: "/img/projects3.jpg",
      link: "https://app-pembayaran-wifi.vercel.app/"
    },
  ];

  return (
    <section className="mx-auto p-4 bg-gray-300">
      <h2 className="text-3xl font-bold mb-4">Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-gray-300">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className={`bg-gray-300 p-4 rounded shadow ${theme === 'dark' ? 'dark:bg-gray-900 dark:text-gray-300' : 'light:bg-white light:text-gray-700'}`}
            whileHover={{ scale: 1.05, rotate: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-48 object-cover mb-2 rounded-lg"
            />
            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
            <p>{project.description}</p>
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`text-blue-500 mt-2 block ${theme === 'dark' ? 'dark:text-blue-300' : 'light:text-blue-500'}`}
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
