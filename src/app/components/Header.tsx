"use client"

import { HiUserCircle } from 'react-icons/hi';
import { IoIosSettings, IoIosNotificationsOutline } from 'react-icons/io';
import Image from 'next/image';
import { SetStateAction, useEffect, useState } from 'react';
import LoginPopup from './LoginPopup';

interface HeaderProps {
  className?: string;
  userProfilePicture?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const [userProfilePicture, setUserProfilePicture] = useState<string | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Extract the query string from the URL
    const queryParams = new URLSearchParams(window.location.search);
    // Extract the user profile picture URL from the query string
    const userProfileData = queryParams.get('user');
    if (userProfileData) {
      const userData = JSON.parse(userProfileData);
      console.log(userData);
      const profilePicture = userData.photos && userData.photos.length > 0 ? userData.photos[0].value : undefined;
      setUserProfilePicture(profilePicture);
    }
  }, []);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  const handleSearchInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    const encodedQuery = encodeURIComponent(searchQuery);
    // Open a new tab with the search query as a parameter
    window.open(`/searchedNewsCategory?searchQuery=${encodedQuery}`, '_blank');
  };


  return (
    <header className={`bg-white text-black p-4 flex items-center ${className}`}>
      {/* Logo */}
      <div className="flex-shrink-0">
        <Image src="/msn_logo.svg" alt="Logo" className="h-8 sm:mr-2 md:mr-4 lg:mr-4 xl:mr-4" width={64} height={64} />
      </div>

      {/* Search Bar */}
      <div className="flex flex-grow mx-2 ml-full sm:mr-2 md:mr-4 lg:mr-4 xl:mr-4">
        <input
          type="text"
          placeholder="Search news..."
          className="w-full max-w-10xl px-2 py-1 border border-gray-600 rounded-lg"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
         <button onClick={handleSearch} className="ml-2 px-4 py-1 bg-blue-500 text-white rounded-lg">Search</button>
      </div>

      {/* Icons */}
      <div className="flex items-center space-x-2">
         {/* Profile Icon and Dropdown */}
         <div
          className="bg-black rounded-3xl relative"
          onClick={toggleDropdown}
        >
          {userProfilePicture ? ( // Render user profile picture if available
            <Image
              src={userProfilePicture}
              alt="Profile"
              className="w-8 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-10 lg:h-10 xl:w-10 xl:h-10 text-white rounded-3xl"
              width={64}
              height={64}
            />
          ) : (
            <HiUserCircle className="w-8 h-8 sm:w-10 sm:h-10 md:w-10 md:h-10 lg:w-10 lg:h-10 xl:w-10 xl:h-10 text-white" />
          )}
          {isDropdownVisible && <LoginPopup onClose={function (): void {} } />}
        </div>
        {/* Settings Icon */}
        <div className="bg-white rounded-3xl">
          <IoIosSettings className="w-6 h-6 text-gray-500 sm:w-8 sm:h-8 md:w-8 md:h-8 lg:w-8 lg:h-8 xl:w-8 xl:h-8" />
        </div>
        {/* Notification Bell */}
        <div className="bg-white rounded-3xl">
          <IoIosNotificationsOutline className="w-6 h-6 text-yellow-500 sm:w-8 sm:h-8 md:w-8 md:h-8 lg:w-8 lg:h-8 xl:w-8 xl:h-8" />
        </div>
      </div>
    </header>
  );
};

export default Header;
