import React from 'react';
import { FaGithub, FaInstagram, FaTiktok} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { FaThreads } from 'react-icons/fa6';
const Profile = ({ theme }) => {
  return (
    <section className="container bg-gray-300 mx-auto p-4">
      <div className="flex items-center space-x-4">
        <img 
          src="/img/aku.jpg" 
          alt="Profile" 
          className="rounded-full w-24 h-24"
        />
        <div>
          <h3 className="text-xl font-bold mb-2">Chesko</h3>
          <p className="text-gray-600 mb-4">@chesko_one_only</p>
          <p className="text-lg">I am Chesko, a passionate web developer with a flair for creating dynamic and engaging user experiences. With expertise in Javascript, Nextjs, Vite.js, Tailwind CSS, and PostgreSQL, I bring a modern and efficient approach to web development. My journey is driven by a love for technology and a commitment to continuous learning and innovation.</p>
          <div className="flex space-x-4 mt-4">
            <a 
              href="https://github.com/chesko21"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-gray-700 hover:text-gray-900 ${theme === 'dark' ? 'dark:text-gray-300' : 'light:text-gray-700'}`}
            >
              <FaGithub size={24} />
            </a>
            <a 
              href="https://www.threads.net/@chesko_afiq"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-blue-400 hover:text-blue-600 ${theme === 'dark' ? 'dark:text-blue-300' : 'light:text-blue-400'}`}
            >
              <FaThreads size={24} /> {/* Use FaThreads here */}
            </a>
            <a 
              href="https://www.instagram.com/chesko_afiq/"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-pink-600 hover:text-pink-700 ${theme === 'dark' ? 'dark:text-pink-500' : 'light:text-pink-600'}`}
            >
              <FaInstagram size={24} />
            </a>
            <a 
              href="https://www.tiktok.com/@afiq_chesko1"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-black hover:text-gray-800 ${theme === 'dark' ? 'dark:text-gray-300' : 'light:text-black'}`}
            >
              <FaTiktok size={24} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
