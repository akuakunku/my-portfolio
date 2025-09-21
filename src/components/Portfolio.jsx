import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const dynamicTooltip = (content) => ({
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
  transition: { duration: 0.3 },
  content
});

const Portfolio = ({ theme }) => {
  const projects = [
    {
      title: "Form Pendaftaran Wifi",
      description: "A web-based application pendaftaran Wifi.",
      image: "/img/projects2.jpg",
      link: "https://heaven-link.vercel.app/"
    },
    {
      title: "Resep Masakan Indonesia",
      description: "A website that provides various Indonesian recipes.",
      image: "/img/projects1.jpg",
      link: "https://resep-bunda.vercel.app/"
    },
    {
      title: "Web App Manajemen Pembayaran",
      description: "Web app untuk mendata atau memasukan data client yang sudah membayar wifi bulanan.",
      image: "/img/projects3.jpg",
      link: "https://app-pembayaran-wifi.vercel.app/"
    },
    {
      title: "Al Quran digital",
      description: "Aplikasi Al quran digital for android",
      image: "/img/aku.jpg",
      link: "https://github.com/akuakunku/alquran-digital/"
    },
    {
      title: "IPTV_EDITOR",
      description: "Aplikasi m3u editor dengan python",
      image: "/img/aku.jpg",
      link: "https://github.com/chesko21/iptv_edit/"
    },
    {
      title: "Chord Gitar",
      description: "Web untuk chord gitar.",
      image: "/img/projects4.jpg",
      link: "https://chord-gitar.vercel.app/"
    },
    {
      title: "Smart TV",
      description: "A project for smart TV applications.",
      image: "/img/aku.jpg", 
      link: "https://github.com/chesko21/smart_tv"
    },
    {
      title: "M3U Editor",
      description: "A tool for editing M3U playlists.",
      image: "/img/aku.jpg", 
      link: "https://m3u-editor-eta.vercel.app/"
    },
    {
      title: "Chesko TV",
      description: "A project for Chesko TV applications.",
      image: "/img/aku.jpg", 
      link: "https://github.com/chesko21/Chesko_TV"
    },


  ];

  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProjects = projects.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <section className={`p-4 lg:p-6 rounded-lg transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-800'}`}>
      <h2 className="text-3xl font-bold mb-4 text-center">Projects</h2>
      <AnimatePresence>
        <motion.div
          key={currentPage}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
        >
          {currentProjects.map((project, index) => (
            <motion.div
              key={index}
              className={`relative p-4 rounded-lg border border-gray-300 shadow-md overflow-hidden transition-all duration-300 ${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-800'}`}
              whileHover={{ scale: 1.03, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)' }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <motion.div
                className="absolute top-0 right-0 p-1 bg-yellow-400 text-gray-800 rounded-bl-lg text-xs font-semibold transform -rotate-45 translate-x-2 translate-y-2"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                Featured
              </motion.div>

              <motion.img
                src={project.image}
                alt={project.title}
                className="w-full h-20 object-cover mb-3 rounded-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <div className="relative z-10">
                <h3 className="text-lg font-semibold mb-1">{project.title}</h3>
                <p className="text-xs text-gray-600 mb-2 line-clamp-2">{project.description}</p>
                <motion.div
                  className="relative group"
                  whileHover={{ scale: 1.03 }}
                >
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-block text-xs px-2 py-1 rounded-full ${theme === 'dark' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-100 text-blue-600 hover:bg-blue-200'} transition-colors duration-300 relative overflow-hidden`}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className="relative z-10">View Project</span>
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }}></div>
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
      <div className="flex justify-between items-center mt-6">
        <motion.button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`px-3 py-1 text-sm rounded-full shadow-sm ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600 transition-colors duration-300'} ${theme === 'dark' ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white'}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Prev
        </motion.button>
        <span className="text-sm font-medium">{`${currentPage}/${totalPages}`}</span>
        <motion.button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 text-sm rounded-full shadow-sm ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600 transition-colors duration-300'} ${theme === 'dark' ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white'}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Next
        </motion.button>
      </div>
    </section>
  );
};

export default Portfolio;
