import React from 'react'
import Image from 'next/image'

interface HeaderProps {
    className?: string;
  }

const Header: React.FC<HeaderProps> = ({className}) => {
    return (
        <header className={`bg-white text-white p-4 flex justify-between items-center ${className}`}>
          {/* Logo */}
          <div className="flex items-center">
            <Image src="/msn_logo.svg" alt="Logo" className="h-8 mr-4" layout="fixed" width={64} height={64} />
          </div>
          
          {/* Search Bar */}
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search news..."
              className="px-0 sm:mr-4 md:mr-4 lg:xl:px-4 py-1 border border-gray-600 rounded-lg mr-1 sm:mr-4 md:mr-4 lg:mr-4 xl:mr-4"
            />
            {/* Profile Icon */}
            <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
            {/* Notification Bell */}
            {/* Settings Icon */}
          </div>
        </header>
      );
    };

export default Header