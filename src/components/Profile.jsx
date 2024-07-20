import React from 'react';
import { FaGithub, FaInstagram, FaTiktok } from 'react-icons/fa';
import { FaThreads } from 'react-icons/fa6';

const Profile = ({ theme }) => {
  return (
    <section className={`container mx-auto p-4 md:p-8 rounded ${theme === 'dark' ? 'bg-gray-900 text-gray-200' : 'bg-gray-200 text-gray-900'}`}>
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
        <img 
          src="/img/aku.jpg" 
          alt="Profile" 
          className={`rounded-full w-32 h-32 md:w-40 md:h-40 object-cover border-4 border-blue-400 md:border-gray-900 transform transition-transform duration-300 hover:scale-110`}
        />
        <div className="flex-1">
          <h3 className="text-3xl font-bold mb-2">Chesko</h3>
          <p className="text-lg mb-4">@chesko_oneOnly</p>
          <p className="text-base md:text-lg mb-6 transform transition-transform duration-300 hover:scale-105">
            I am Chesko, a passionate web developer with a flair for creating dynamic and engaging user experiences. With expertise in JavaScript, Tailwind CSS, and SQL, I bring a modern and efficient approach to web development. My journey is driven by a love for technology and a commitment to continuous learning and innovation.
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center mt-8">
        <h2 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>My SOSMED</h2>
        <div className="flex space-x-4 justify-center">
          <a 
            href="https://github.com/chesko21"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-gray-700 hover:text-gray-900 ${theme === 'dark' ? 'dark:text-gray-300' : 'light:text-gray-700'} transform transition-transform duration-300 hover:scale-110`}
          >
            <FaGithub size={28} />
          </a>
          <a 
            href="https://www.threads.net/@chesko_afiq"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-blue-400 hover:text-blue-600 ${theme === 'dark' ? 'dark:text-blue-300' : 'light:text-blue-400'} transform transition-transform duration-300 hover:scale-110`}
          >
            <FaThreads size={28} />
          </a>
          <a 
            href="https://www.instagram.com/chesko_afiq/"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-pink-600 hover:text-pink-700 ${theme === 'dark' ? 'dark:text-pink-500' : 'light:text-pink-600'} transform transition-transform duration-300 hover:scale-110`}
          >
            <FaInstagram size={28} />
          </a>
          <a 
            href="https://www.tiktok.com/@afiq_chesko1"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-black hover:text-gray-800 ${theme === 'dark' ? 'dark:text-gray-300' : 'light:text-black'} transform transition-transform duration-300 hover:scale-110`}
          >
            <FaTiktok size={28} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Profile;
