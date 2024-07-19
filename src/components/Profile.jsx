import React from 'react';
import { FaGithub, FaInstagram, FaTiktok } from 'react-icons/fa';
import { FaThreads } from 'react-icons/fa6';

const Profile = ({ theme }) => {
  return (
    <section className={`container mx-auto p-4 md:p-8 ${theme === 'dark' ? 'bg-gray-900 text-gray-200' : 'bg-gray-300 text-gray-900'}`}>
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
        <img 
          src="/img/aku.jpg" 
          alt="Profile" 
          className="rounded-full w-32 h-32 md:w-40 md:h-40 object-cover border-4 border-gray-300 md:border-gray-900"
        />
        <div className="flex-1">
          <h3 className="text-3xl font-bold mb-2">Chesko</h3>
          <p className="text-lg mb-4">@chesko_one_only</p>
          <p className="text-base md:text-lg mb-6">
            I am Chesko, a passionate web developer with a flair for creating dynamic and engaging user experiences. With expertise in JavaScript, Next.js, Vite.js, Tailwind CSS, and PostgreSQL, I bring a modern and efficient approach to web development. My journey is driven by a love for technology and a commitment to continuous learning and innovation.
          </p>
          <div className="flex space-x-4">
            <a 
              href="https://github.com/chesko21"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-gray-700 hover:text-gray-900 ${theme === 'dark' ? 'dark:text-gray-300' : 'light:text-gray-700'} transition-colors`}
            >
              <FaGithub size={28} />
            </a>
            <a 
              href="https://www.threads.net/@chesko_afiq"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-blue-400 hover:text-blue-600 ${theme === 'dark' ? 'dark:text-blue-300' : 'light:text-blue-400'} transition-colors`}
            >
              <FaThreads size={28} />
            </a>
            <a 
              href="https://www.instagram.com/chesko_afiq/"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-pink-600 hover:text-pink-700 ${theme === 'dark' ? 'dark:text-pink-500' : 'light:text-pink-600'} transition-colors`}
            >
              <FaInstagram size={28} />
            </a>
            <a 
              href="https://www.tiktok.com/@afiq_chesko1"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-black hover:text-gray-800 ${theme === 'dark' ? 'dark:text-gray-300' : 'light:text-black'} transition-colors`}
            >
              <FaTiktok size={28} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
