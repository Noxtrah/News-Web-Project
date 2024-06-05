// pages/newsDetailPage.tsx
"use client"
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { NewsItem } from '../types';
import Header from '../components/Header';

const NewsDetailPage: React.FC = () => {
  const searchParams = useSearchParams();
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
  const [userProfilePicture, setUserProfilePicture] = useState<string | undefined>(undefined);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userProfilePictureParam = urlParams.get('userProfilePicture');
    if (userProfilePictureParam) {
      setUserProfilePicture(userProfilePictureParam);
    }
  }, []);

  useEffect(() => {
    const newsID = searchParams.get('NewsID');
    const title = searchParams.get('Title');
    const description = searchParams.get('Description');
    const resource = searchParams.get('Resource');
    const resourceIcon = searchParams.get('Resource_icon');
    const image = searchParams.get('Image');
    const insertionHour = searchParams.get('Insertion_hour');
    const category = searchParams.get('Category');
    const likeCount = searchParams.get('Like_count');
    const dislikeCount = searchParams.get('Dislike_count');

    if (newsID && title && description && resource && resourceIcon && image && insertionHour && category && likeCount && dislikeCount) {
      const item: NewsItem = {
        NewsID: Number(newsID),
        Title: title,
        Description: description,
        Resource: resource,
        Resource_icon: resourceIcon,
        Image: image,
        Insertion_hour: new Date(insertionHour),
        Category: category,
        Like_count: likeCount,
        Dislike_count: dislikeCount,
      };
      setNewsItem(item);
    }
  }, [searchParams]);

  if (!newsItem) {
    return <div className="flex items-center justify-center h-screen"><div>Loading...</div></div>;
  }

  return (
    <div className='bg-gray-100 min-h-screen'>
      <div className='p-2 md:px-8 lg:px-16 xl:px-32'>
        <Header className="px-4 sm:px-8 md:px-12 lg:px-18 xl:px-40" userProfilePicture={userProfilePicture} />
        <hr className="border-gray-300" />
        <div className="max-w-8xl mx-auto pb-px p-6 bg-white rounded-lg shadow-lg">
          <div className="md:flex">
            <div className="sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 md:mr-4">
              <img src={newsItem.Image} alt={newsItem.Title} className="w-full object-cover rounded-md mb-4" />
            </div>
            <div className="md:w-2/3 md:p-6">
              <h1 className="text-3xl font-bold mb-4 text-gray-900">{newsItem.Title}</h1>
              <div className="flex items-center mb-4">
                <img src={newsItem.Resource_icon} alt={newsItem.Resource} className="w-6 h-6 mr-2" />
                <span className="text-gray-600">{newsItem.Resource}</span>
              </div>
              <div className="text-gray-500 text-sm mb-4">Published on: {new Date(newsItem.Insertion_hour).toLocaleString()}</div>
              <div className="text-gray-600 mb-4">Category: {newsItem.Category}</div>
              <div className="flex items-center">
                <div className="mr-4">
                  <span className="text-gray-600">Likes: {newsItem.Like_count}</span>
                </div>
                <div>
                  <span className="text-gray-600">Dislikes: {newsItem.Dislike_count}</span>
                </div>
              </div>
            </div>
          </div>
          <p className="text-lg text-gray-700 pt-4 p-6">{newsItem.Description}</p>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailPage;
