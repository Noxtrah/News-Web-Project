"use client"

import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import NewsPage from '../components/NewsPage';
import { useTranslation } from 'react-i18next';

const Index: React.FC = () => {
  const { t } = useTranslation();
  const [userProfilePicture, setUserProfilePictureLocal] = useState<string | undefined>(undefined);

  useEffect(() => {
    // const urlParams = new URLSearchParams(window.location.search);
    if (typeof window !== 'undefined') {
      const userProfilePictureParam = localStorage.getItem('storedUserProfilePicture');
      if (userProfilePictureParam) {
        setUserProfilePictureLocal(userProfilePictureParam);
    }
    }
  }, []);

  return (
    <div className='bg-gray-100 min-h-screen'>
      <div className='p-2 md:px-8 lg:px-16 xl:px-32'>
        <Header className="px-4 sm:px-8 md:px-12 lg:px-18 xl:px-40" userProfilePicture={userProfilePicture} />

        {/* News Section */}
        <section className="p-4 bg-white rounded-lg shadow-md">
          {/* NewsPage Component */}
          <NewsPage category={t('ALL')} />
        </section>
      </div>
    </div>
  );
};

export default Index;
