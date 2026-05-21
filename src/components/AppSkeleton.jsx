import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AppSkeleton = () => {
    const [loadingLogs, setLoadingLogs] = useState([]);
    const logs = [
        "INITIALIZING_KERNEL_BOOT...",
        "CONNECTING_TO_CHESKO_CORE...",
        "ANALYZING_SYSTEM_INTEGRITY...",
        "DECRYPTING_BIO_DATA...",
        "SYNCHRONIZING_HUD_INTERFACE...",
        "ESTABLISHING_NEURAL_LINK...",
        "SYSTEM_READY_FOR_DEPLOYMENT"
    ];

    useEffect(() => {
        let currentLogIndex = 0;
        const interval = setInterval(() => {
            if (currentLogIndex < logs.length) {
                setLoadingLogs(prev => [...prev, logs[currentLogIndex]]);
                currentLogIndex++;
            } else {
                clearInterval(interval);
            }
        }, 200);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-[#050505] p-8 flex flex-col items-center justify-center relative overflow-hidden font-mono">
            {/* Background Cyber Grid */}
            <div className="absolute inset-0 opacity-20 pointer-events-none cyber-grid"></div>
            
            {/* Animated Scanning Line */}
            <div className="absolute top-0 left-0 w-full h-px bg-cyber-blue/30 animate-scan z-10"></div>

            <div className="relative z-20 flex flex-col items-center space-y-12 max-w-lg w-full">
                {/* Central Visual Element */}
                <div className="relative">
                    <motion.div 
                        className="w-32 h-32 border-2 border-cyber-blue/20 rounded-none flex items-center justify-center"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    >
                        <div className="w-24 h-24 border border-cyber-purple/40 animate-pulse"></div>
                    </motion.div>
                    
                    {/* Pulsing Core */}
                    <motion.div 
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ scale: 0.8, opacity: 0.5 }}
                        animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <div className="w-4 h-4 bg-cyber-blue shadow-[0_0_20px_#00f3ff]"></div>
                    </motion.div>

                    {/* Orbiting Dots */}
                    {[...Array(4)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-cyber-blue"
                            animate={{ 
                                rotate: 360,
                                x: [0, Math.cos(i * 90) * 60, 0],
                                y: [0, Math.sin(i * 90) * 60, 0]
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: i * 0.5 }}
                        />
                    ))}
                </div>

                {/* Progress Data */}
                <div className="w-full space-y-4">
                    <div className="flex justify-between text-[10px] text-cyber-blue/70 tracking-widest uppercase">
                        <span>ANALYZING_CORE</span>
                        <motion.span
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                        >
                            {Math.floor(loadingLogs.length * (100 / logs.length))}%
                        </motion.span>
                    </div>
                    <div className="w-full h-1 bg-white/5 relative overflow-hidden">
                        <motion.div 
                            className="absolute top-0 left-0 h-full bg-cyber-blue shadow-[0_0_10px_#00f3ff]"
                            initial={{ width: "0%" }}
                            animate={{ width: `${(loadingLogs.length / logs.length) * 100}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                </div>

                {/* Terminal Logs */}
                <div className="w-full h-32 overflow-hidden bg-black/40 border border-white/5 p-4 rounded-sm flex flex-col-reverse">
                    <div className="space-y-1">
                        {loadingLogs.map((log, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-[9px] text-gray-500 font-mono tracking-wider flex items-center space-x-2"
                            >
                                <span className="text-cyber-blue opacity-50">{">"}</span>
                                <span>{log}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Corner HUD Decors */}
            <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-cyber-blue/20"></div>
            <div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-cyber-purple/20"></div>
        </div>
    );
};

export default AppSkeleton;
