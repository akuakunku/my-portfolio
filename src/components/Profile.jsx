import React from 'react';
import { FaGithub, FaInstagram, FaTiktok } from 'react-icons/fa';
import { FaThreads } from 'react-icons/fa6';

const Profile = ({ theme }) => {
  return (
    <section
      className={`container mx-auto p-4 md:p-8 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-900'}`}
      aria-label="Profile Section"
    >
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
        <img
          src="/img/aku.jpg"
          alt="Chesko Profile"
          className={`rounded-full w-32 h-32 md:w-44 md:h-44 object-cover border-4 border-blue-400 md:border-gray-900 shadow-lg transform transition-transform duration-300 hover:scale-110`}
          aria-label="Profile Image"
        />
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-4xl font-extrabold mb-2 transition-transform duration-300 hover:scale-105">
            Chesko
          </h3>
          <p className="text-xl font-medium text-blue-500 mb-4">@chesko_oneOnly</p>
          <p className="text-base md:text-lg mb-6 leading-relaxed transform transition-transform duration-300 hover:scale-105">
            As a passionate web developer, I specialize in crafting dynamic user experiences with modern technologies. With expertise in JavaScript, Tailwind CSS, and SQL DATABASE, I am committed to delivering high-quality solutions that not only meet but exceed expectations. Driven by an unwavering dedication to innovation and lifelong learning, I continually seek to transform ideas into impactful digital experiences.
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center mt-8">
        <h2 className={`text-2xl font-semibold mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>
          Connect with Me
        </h2>
        <div className="flex space-x-6 justify-center">
          <a
            href="https://github.com/chesko21"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-gray-700 hover:text-gray-500 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} transform transition-transform duration-300 hover:scale-110`}
            aria-label="GitHub Profile"
          >
            <FaGithub size={30} />
          </a>
          <a
            href="https://www.threads.net/@chesko_afiq"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-blue-400 hover:text-blue-600 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-400'} transform transition-transform duration-300 hover:scale-110`}
            aria-label="Threads Profile"
          >
            <FaThreads size={30} />
          </a>
          <a
            href="https://www.instagram.com/chesko_afiq/"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-pink-600 hover:text-pink-700 ${theme === 'dark' ? 'text-pink-500' : 'text-pink-600'} transform transition-transform duration-300 hover:scale-110`}
            aria-label="Instagram Profile"
          >
            <FaInstagram size={30} />
          </a>
          <a
            href="https://www.tiktok.com/@afiq_chesko1"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-black hover:text-gray-600 ${theme === 'dark' ? 'text-gray-300' : 'text-black'} transform transition-transform duration-300 hover:scale-110`}
            aria-label="TikTok Profile"
          >
            <FaTiktok size={30} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Profile;
