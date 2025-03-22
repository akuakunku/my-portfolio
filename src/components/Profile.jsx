import React from 'react';
import { FaGithub, FaInstagram, FaTiktok } from 'react-icons/fa';
import { FaThreads } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';

// Define enhanced motion variants for animations
const cardVariants = {
  hover: {
    rotateY: 15,
    rotateX: 5,
    scale: 1.05,
    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
    transition: {
      duration: 0.5,
      type: 'spring',
      stiffness: 100,
    },
  },
};

const getTextVariants = (theme) => ({
  hover: {
    color: theme === 'dark'
      ? ['#ffffff', '#1e3a8a', '#c2b90e', '#ffffff']
      : ['#000000', '#041069', '#260105', '#000000'],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
});

const iconVariants = {
  hover: {
    scale: 1.3,
    y: -5,
    rotate: [0, -10, 10, -10, 0],
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)',
    transition: {
      type: 'spring',
      stiffness: 300,
      duration: 0.5,
    },
  },
};

const tooltipVariants = {
  initial: {
    opacity: 0,
    y: 10,
    scale: 0.8,
  },
  hover: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      type: 'spring',
      stiffness: 200,
    },
  },
};

const Profile = ({ theme }) => {
  const isDarkTheme = theme === 'dark';
  const textVariants = getTextVariants(theme);

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={`relative container mx-auto p-4 md:p-8 rounded-lg shadow-lg ${isDarkTheme ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-900'}`}
      aria-label="Profile Section"
    >
      {/* Enhanced Aurora Background */}
      <motion.div 
        className={`rounded-lg absolute inset-0 ${isDarkTheme ? 'bg-gradient-to-r from-slate-800 via-purple-800 to-slate-800' : 'bg-gradient-to-r from-gray-200 via-purple-300 to-slate-300'} opacity-50 pointer-events-none`}
        animate={{
          background: isDarkTheme 
            ? ['linear-gradient(to right, #1a202c, #4a1d96, #1a202c)', 'linear-gradient(to left, #1a202c, #4a1d96, #1a202c)']
            : ['linear-gradient(to right, #f7fafc, #d6bcfa, #e2e8f0)', 'linear-gradient(to left, #f7fafc, #d6bcfa, #e2e8f0)'],
        }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
      ></motion.div>
      {/* Enhanced Glowing Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, index) => (
          <motion.div
            key={index}
            className={`absolute w-1 h-1 rounded-full ${isDarkTheme ? 'bg-blue-400' : 'bg-yellow-400'}`}
            initial={{ opacity: 0.2, scale: 0.8 }}
            animate={{ 
              opacity: [0.2, 1, 0.2], 
              scale: [0.8, 1.5, 0.8],
              x: Math.random() * 200 - 100,
              y: Math.random() * 100 - 50,
            }}
            transition={{ 
              duration: 2 + Math.random() * 3, 
              repeat: Infinity,
              repeatType: 'reverse'
            }}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          ></motion.div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 relative z-10">
        <motion.img
          src="/img/aku.jpg"
          alt="Chesko Profile"
          className={`rounded-full w-32 h-32 md:w-44 md:h-44 object-cover border-4 ${isDarkTheme ? 'border-blue-500' : 'border-blue-400'} shadow-lg`}
          aria-label="Profile Image"
          whileHover="hover"
          variants={cardVariants}
        />
        <div className="flex-1 text-center md:text-left">
          <motion.h3
            className={`text-4xl font-extrabold mb-2 transition-transform duration-300 ${isDarkTheme ? 'text-gray-300' : 'text-gray-900'}`}
            whileHover="hover"
            variants={textVariants}
          >
            Chesko
          </motion.h3>
          <motion.p 
            className={`text-xl font-medium mb-4 ${isDarkTheme ? 'text-blue-300' : 'text-blue-500'}`}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            @chesko_oneOnly
          </motion.p>
          <motion.p
            className={`text-base md:text-lg mb-6 leading-relaxed ${isDarkTheme ? 'text-gray-400' : 'text-gray-800'}`}
            whileHover="hover"
            variants={textVariants}
          >
            As a passionate web developer, I specialize in crafting dynamic user experiences with modern technologies. With expertise in JavaScript, Tailwind CSS, and SQL DATABASE, I am committed to delivering high-quality solutions that not only meet but exceed expectations. Driven by an unwavering dedication to innovation and lifelong learning, I continually seek to transform ideas into impactful digital experiences.
          </motion.p>
        </div>
      </div>

      <motion.div 
        className="flex flex-col items-center mt-8 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <h2 className={`text-2xl font-semibold mb-4 ${isDarkTheme ? 'text-gray-300' : 'text-gray-900'}`}>
          Connect with Me
        </h2>
        <div className="flex space-x-6 justify-center relative">
          {[
            { icon: FaGithub, href: "https://github.com/chesko21", label: "GitHub" },
            { icon: FaThreads, href: "https://www.threads.net/@chesko_afiq", label: "Threads" },
            { icon: FaInstagram, href: "https://www.instagram.com/chesko_afiq/", label: "Instagram" },
            { icon: FaTiktok, href: "https://www.tiktok.com/@afiq_chesko1", label: "TikTok" }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="relative group"
              whileHover="hover"
              variants={tooltipVariants}
            >
              <motion.a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-700 hover:text-gray-500 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}
                aria-label={`${item.label} Profile`}
                variants={iconVariants}
                whileHover="hover"
              >
                <item.icon size={30} />
              </motion.a>
              <motion.span
                className={`absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 text-sm ${isDarkTheme ? 'bg-gray-800 text-white' : 'bg-gray-800 text-white'} rounded opacity-0 group-hover:opacity-100`}
                initial="initial"
                animate="hover"
              >
                {item.label}
              </motion.span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 
      <motion.div 
        className="mt-12 relative z-10 perspective-1000"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <AnimatePresence>
          <motion.div 
            className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {['/img/certificate.png', '/img/certificate.png', '/img/certificate.png'].map((imageUrl, index) => (
              <motion.div
                key={index}
                className={`w-full sm:w-64 md:w-72 lg:w-80 h-32 sm:h-36 md:h-40 ${isDarkTheme ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'} rounded-lg shadow-xl p-2 sm:p-3 md:p-4 cursor-pointer overflow-hidden`}
                style={{
                  transformStyle: "preserve-3d",
                  transform: "rotateX(25deg) rotateY(10deg)",
                  boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.3)",
                }}
                whileHover={{
                  scale: 1.05,
                  rotateY: [-10, 10, -10, 10, -10],
                  rotateX: [25, 30, 20, 30, 25],
                  transition: {
                    duration: 1.5,
                    ease: "easeInOut",
                  },
                }}
                drag
                dragConstraints={{ left: -25, right: 25, top: -15, bottom: 15 }}
                dragElastic={0.05}
                whileTap={{ scale: 0.98, rotateX: 35 }}
                whileDrag={{
                  rotateY: [-15, 15],
                  rotateX: [20, 35],
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
              >
                <motion.img
                  src={imageUrl}
                  alt={`Certificate ${index + 1}`}
                  className="w-full h-full object-cover rounded-md transition-transform duration-300"
                  loading="lazy"
                  style={{
                    transform: "translateZ(20px)",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-transparent to-black opacity-10 rounded-md"
                  style={{ transform: "translateZ(10px)" }}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>
      */}

    </motion.section>
  );
};

export default Profile;
