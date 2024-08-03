import React from 'react';

const AppSkeleton = () => {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-800 p-4">
            <div className="max-w-7xl mx-auto">
                {/* Header skeleton */}
                <div className="h-16 bg-white dark:bg-gray-700 rounded-lg mb-4 animate-pulse"></div>

                {/* Content skeleton */}
                <div className="space-y-4">
                    <div className="h-64 bg-white dark:bg-gray-700 rounded-lg animate-pulse"></div>
                    <div className="h-32 bg-white dark:bg-gray-700 rounded-lg animate-pulse"></div>
                    <div className="h-32 bg-white dark:bg-gray-700 rounded-lg animate-pulse"></div>
                    <div className="h-32 bg-white dark:bg-gray-700 rounded-lg animate-pulse"></div>
                </div>
            </div>
        </div>
    );
};

export default AppSkeleton;