import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800 text-center px-4">
            <h1 className="text-6xl font-bold text-gray-800 dark:text-white mb-4">404</h1>
            <p className="text-2xl text-gray-600 dark:text-gray-300 mb-8">Halaman tidak ditemukan</p>
            <p className="text-gray-500 dark:text-gray-400 mb-8">
                Maaf, halaman yang Anda cari tidak dapat ditemukan atau telah dipindahkan.
            </p>
            <Link
                to="/"
                className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
            >
                Kembali ke Beranda
            </Link>
        </div>
    );
};

export default NotFound;