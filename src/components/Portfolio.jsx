import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Portfolio = ({ theme }) => {
  const projects = [
    {
      title: "Resep Masakan Indonesia",
      description: "A website that provides various Indonesian recipes.",
      image: "/img/projects1.jpg",
      link: "http://chesko.wuaze.com/"
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
    {
      title: "Chord Gitar",
      description: "Web untuk chord gitar.",
      image: "/img/projects4.jpg",
      link: "https://chord-gitar.vercel.app/"
    },
    // Tambahkan lebih banyak proyek jika diperlukan
  ];

  const itemsPerPage = 3; // Jumlah item per halaman
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
    <section className={`p-6 lg:p-8 rounded-lg transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-800'}`}>
      <h2 className="text-4xl font-bold mb-8 text-center">Projects</h2>
      <AnimatePresence>
        <motion.div
          key={currentPage} // Triggers animation on page change
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
        >
          {currentProjects.map((project, index) => (
            <motion.div
              key={index}
              className={`relative p-6 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 ${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-800'}`}
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)' }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-56 object-cover mb-4 rounded-lg transition-transform duration-300 ease-in-out hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-30"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-blue-600 hover:text-blue-800 transition-colors duration-300 ${theme === 'dark' ? 'hover:text-blue-400' : 'hover:text-blue-700'}`}
                >
                  View Project
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600 transition-colors duration-300'}`}
        >
          Previous
        </button>
        <span className="text-lg font-medium">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600 transition-colors duration-300'}`}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default Portfolio;
