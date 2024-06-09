"use client";

import { HiUserCircle } from 'react-icons/hi';
import { IoIosSettings, IoIosNotificationsOutline } from 'react-icons/io';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import LoginPopup from './LoginPopup';
import RegisterPopup from './RegisterPopup';
import NewestNews from '../components/NewestNews';
import LanguageSelection from './LanguageSelection';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  className?: string;
  userProfilePicture?: string;
}

const Header: React.FC<HeaderProps> = ({ className, userProfilePicture }) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') { // Ensure this code runs only on the client side
      const queryParams = new URLSearchParams(window.location.search);
      const userProfileData = queryParams.get('user');
      if (userProfileData) {
        const userData = JSON.parse(userProfileData);
        console.log(userData);
        const profilePicture = userData.photos && userData.photos.length > 0 ? userData.photos[0].value : undefined;
        localStorage.setItem('storedUserProfilePicture', profilePicture);
        const userID = userData.id && userData.id.length > 0 ? userData.id : undefined;
        localStorage.setItem("userID", userID);
      }
    }
  }, []);

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isNewsVisible, setIsNewsVisible] = useState(false);
  const [showLanguageSelection, setShowLanguageSelection] = useState(false);
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isRegisterVisible, setIsRegisterVisible] = useState(false);

  const handleSearchInputChange = (event: { target: { value: string }; }) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    const encodedQuery = encodeURIComponent(searchQuery);
    window.open(`/searchedNewsCategory?searchQuery=${encodedQuery}`, '_blank');
  };

  const openLoginPopup = () => {
    setIsRegisterVisible(false);  // Ensure register popup is closed
    setIsLoginVisible(true);
  };

  const openRegisterPopup = () => {
    setIsLoginVisible(false);  // Ensure login popup is closed
    setIsRegisterVisible(true);
  };

  const closePopups = () => {
    setIsLoginVisible(false);
    setIsRegisterVisible(false);
  };

  return (
    <header className={`bg-white text-black p-4 flex items-center ${className}`}>
      <div className="flex-shrink-0">
        <Image src="/msn_logo.svg" alt="Logo" className="h-8 sm:mr-2 md:mr-4 lg:mr-4 xl:mr-4" width={64} height={64} />
      </div>
      <div className="flex flex-grow mx-2 ml-full sm:mr-2 md:mr-4 lg:mr-4 xl:mr-4">
        <input
          type="text"
          placeholder={t('searchBarPlaceholder')}
          className="w-full max-w-10xl px-2 py-1 border border-gray-600 rounded-lg"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <button onClick={handleSearch} className="ml-2 px-4 py-1 bg-blue-500 text-white rounded-lg">{t('searchButton')}</button>
      </div>
      <div className="flex items-center space-x-2">
        <div
          className="bg-black rounded-3xl relative"
          onClick={openLoginPopup}
        >
          {userProfilePicture ? (
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
          {isLoginVisible && <LoginPopup onClose={closePopups} onRegisterClick={openRegisterPopup} />}
          {isRegisterVisible && <RegisterPopup onClose={closePopups} />}
        </div>
        <div className="relative" onClick={() => setShowLanguageSelection(!showLanguageSelection)}>
          <IoIosSettings className="w-6 h-6 text-gray-500 sm:w-8 sm:h-8 md:w-8 md:h-8 lg:w-8 lg:h-8 xl:w-8 xl:h-8" />
          {showLanguageSelection && (
            <div className="absolute top-full right-0 mt-2 z-50">
              <LanguageSelection onClose={() => setShowLanguageSelection(false)} />
            </div>
          )}
        </div>
        <div className="bg-white rounded-3xl relative" onClick={() => setIsNewsVisible(!isNewsVisible)}>
          <IoIosNotificationsOutline className="w-6 h-6 text-yellow-500 sm:w-8 sm:h-8 md:w-8 md:h-8 lg:w-8 lg:h-8 xl:w-8 xl:h-8" />
          {isNewsVisible && (
            <div className="absolute z-20 mt-2 w-80 sm:w-80 md:w-96 lg:w-96 xl:w-96 sm:right-0 md:right-0 transform -translate-x-1/5 right-0">
              <NewestNews />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
