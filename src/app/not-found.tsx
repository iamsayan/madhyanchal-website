import React from "react";
import type { Metadata } from 'next'
import Link from 'next/link';
import { FaArrowLeftLong } from 'react-icons/fa6';

export const metadata: Metadata = {
    title: '404: This page could not be found',
    description: 'Oops! The page you are looking for does not exist. Find your way back home.'
};

const NotFound: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="p-8 md:p-12 relative">
                    {/* Decorative elements */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-600" />
                    <div className="absolute -left-16 -top-16 w-48 h-48 rounded-full bg-blue-100/50" />
                    <div className="absolute -right-16 -bottom-16 w-48 h-48 rounded-full bg-purple-100/50" />
                    
                    {/* Content */}
                    <div className="relative space-y-6 text-center">
                        <h1 className="text-8xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                            404
                        </h1>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                            Oops! Page Not Found
                        </h2>
                        <p className="text-gray-600 max-w-md mx-auto">
                            The page you're looking for seems to have wandered off into the digital wilderness.
                        </p>
                        
                        <Link 
                            href="/" 
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full font-medium transition-transform hover:scale-105 hover:shadow-lg"
                        >
                            <FaArrowLeftLong />
                            <span>Return Home</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
