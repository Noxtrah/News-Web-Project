// components/NewsDetailContent.tsx
"use client"
import { useEffect, useState } from 'react';
import { NewsItem } from '../types';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import router from 'next/router';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'next/navigation';
import RecommendationCard from './RecommendationCard';

const NewsDetailContent: React.FC = () => {
  const searchParams = useSearchParams(); // useSearchParams inside a React component
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
  const likeCountInitial = newsItem?.Like_count ? parseInt(newsItem.Like_count) : 0;
  const dislikeCountInitial = newsItem?.Dislike_count ? parseInt(newsItem.Dislike_count) : 0;
  const [likeCount, setLikeCount] = useState<number>(likeCountInitial);
  const [dislikeCount, setDislikeCount] = useState<number>(dislikeCountInitial);
  const [liked, setLiked] = useState<boolean>(false);
  const [disliked, setDisliked] = useState<boolean>(false);
  const { t } = useTranslation();
  let selectedLanguage = "en";
  if (typeof window !== 'undefined') {
    selectedLanguage = localStorage.getItem('selectedLanguage') || 'en';
  }

  const handleLikeClick = async () => {
    try {
      if (typeof window !== 'undefined') {
        const userId = localStorage.getItem('userID');
        const response = await fetch(`https://msn-api-web-project.onrender.com/news/like?id=${newsItem?.NewsID}&userID=${userId}`, {
          method: 'POST',
        });
        if (response.ok) {
          const newLikeCount = likeCount + 1;
          setLikeCount(newLikeCount);
          setLiked(true);
          updateUrl({ likeCount: newLikeCount, dislikeCount });
        } else {
          console.error('Failed to like news item.');
        }
      }
    } catch (error) {
      console.error('Error occurred while liking news item:', error);
    }
  };

  const handleDislikeClick = async () => {
    try {
      if (typeof window !== 'undefined') {
        const userId = localStorage.getItem('userID');
        const response = await fetch(`https://msn-api-web-project.onrender.com/news/dislike?id=${newsItem?.NewsID}&userID=${userId}`, {
          method: 'POST',
        });
        if (response.ok) {
          const newDislikeCount = dislikeCount + 1;
          setDislikeCount(newDislikeCount);
          setDisliked(true)
          updateUrl({ likeCount, dislikeCount: newDislikeCount });
        } else {
          console.error('Failed to dislike news item.');
        }
      }
    } catch (error) {
      console.error('Error occurred while disliking news item:', error);
    }
  };

  const updateUrl = (counts: { likeCount: number; dislikeCount: number }) => {
    const params = new URLSearchParams(window.location.search);
    params.set('Like_count', counts.likeCount.toString());
    params.set('Dislike_count', counts.dislikeCount.toString());
    router.replace(`?${params.toString()}`, undefined, { shallow: true });
  };

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
    const isLiked = searchParams.get('Is_liked');
    const isDisliked = searchParams.get('Is_disliked');


    if (newsID && title && description && resource && resourceIcon && image && insertionHour && category && likeCount && dislikeCount && isLiked && isDisliked) {
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
        isLiked: parseInt(isLiked),
        isDisliked: parseInt(isDisliked),
      };
      setNewsItem(item);
      setLikeCount(parseInt(likeCount));
      setDislikeCount(parseInt(dislikeCount));
    }
  }, [searchParams]);

  if (!newsItem) {
    return <div className="flex items-center justify-center h-screen"><div>{t('loading')}...</div></div>;
  }

  return (
    <div>
        <hr className="border-gray-300" />
        <div className="max-w-8xl mx-auto pb-px p-6 bg-white rounded-lg shadow-lg">
          <div className="md:flex">
            <div className="sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 md:mr-4">
              <Image src={newsItem.Image} alt={newsItem.Title} width={500} height={300} className="w-full object-cover rounded-md mb-2" />
            </div>
            <div className="md:w-2/3 md:p-6">
              <h1 className="text-3xl font-bold mb-4 text-gray-900">{newsItem.Title}</h1>
              <div className="flex items-center mb-4">
                <Image src={newsItem.Resource_icon} alt={newsItem.Resource} width={24} height={24} className="w-6 h-6 mr-2" />
                <span className="text-gray-600">{newsItem.Resource}</span>
              </div>
              <div className="text-gray-500 text-sm mb-4">{selectedLanguage === 'en' ? 'Published on' : 'Yayınlanma Tarihi'}: {new Date(newsItem.Insertion_hour).toLocaleString()}</div>
              <div className="text-gray-600 mb-4">{selectedLanguage === 'en' ? 'Category' : 'Kategori'}: {newsItem.Category}</div>
              <div className='flex gap-8'>
                <div className="flex items-center">
                  <button onClick={handleLikeClick}>
                  <AiFillLike size={24} className={`mr-2 ${newsItem.isLiked === 1 || liked ? 'text-green-600' : 'text-gray-600'}`} />
                  </button>
                  <span className='text-gray-600'>{likeCount}</span>
                </div>
                <div className="flex items-center">
                  <button onClick={handleDislikeClick}>
                    <AiFillDislike size={24} className={`mr-2 ${newsItem.isDisliked === 1 || disliked ? 'text-red-600' : 'text-gray-600'}`} />
                  </button>
                  <span className='text-gray-600'>{dislikeCount}</span>
                </div>
              </div>
            </div>
          </div>
          <p className="text-lg text-gray-700 py-4">{newsItem.Description}</p>
        </div>
        <RecommendationCard />
    </div>
  );
};

export default NewsDetailContent;
