"use client"
import { useEffect, useState, Suspense } from 'react';
import Header from '../components/Header';
import RecommendationCard from '../components/RecommendationCard';
import NewsDetailContent from '../components/NewsDetailContent';

const NewsDetailPage: React.FC = () => {
  const [userProfilePicture, setUserProfilePicture] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userProfilePictureParam = localStorage.getItem('storedUserProfilePicture');
      if (userProfilePictureParam) {
        setUserProfilePicture(userProfilePictureParam);
      }
    }
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className='bg-gray-100 min-h-screen'>
        <div className='p-2 md:px-8 lg:px-16 xl:px-32'>
          <Header className="px-4 sm:px-8 md:px-12 lg:px-18 xl:px-40" userProfilePicture={userProfilePicture} />
          <NewsDetailContent />
          {/* <RecommendationCard /> */}
        </div>
      </div>
    </Suspense>
  );
};

export default NewsDetailPage;


