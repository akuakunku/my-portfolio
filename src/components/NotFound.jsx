import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-cyber-dark text-center px-4 cyber-grid font-mono">
            <h1 className="text-9xl font-black text-cyber-blue mb-4 neon-blue italic">404</h1>
            <div className="w-24 h-1 bg-cyber-purple mb-8 animate-pulse"></div>
            <p className="text-2xl text-white mb-4 uppercase tracking-widest">SEGMENT_NOT_FOUND</p>
            <p className="text-gray-500 mb-12 max-w-md">
                The requested address is outside the accessible data sectors or has been purged from the system.
            </p>
            <Link
                to="/"
                className="px-8 py-4 bg-transparent border border-cyber-blue text-cyber-blue rounded-none hover:bg-cyber-blue hover:text-black transition-all duration-300 uppercase tracking-widest font-bold"
            >
                RETURN_TO_ROOT
            </Link>
        </div>
    );
};

export default NotFound;