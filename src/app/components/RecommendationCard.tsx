import { useState, useEffect, use } from 'react';
import { NewsItem } from '../types';
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

const RecommendationCard = () => {
  const [scrollInterval, setScrollInterval] = useState<NodeJS.Timeout | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [recommendations, setRecommendations] = useState<NewsItem[] | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (typeof window !== 'undefined') {
          let language = localStorage.getItem('selectedLanguage') || 'en';
          setSelectedLanguage(language);
          const userID = localStorage.getItem('userID');
          const response = await fetch(`https://msn-api-web-project.onrender.com/recommendations?userID=${userID}&language=${language}`); // Adjust the userID accordingly
          const data = await response.json();
          setRecommendations(data);
        }
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };

    fetchData();
  }, []);

  const scrollCategories = (scrollOffset: number) => {
    const container = document.getElementById('recommendations-container');
    if (container) {
      container.scrollLeft += scrollOffset;
    }
  };

  const startScrolling = (scrollOffset: number) => {
    if (!scrollInterval) {
      setScrollInterval(
        setInterval(() => {
          scrollCategories(scrollOffset);
        }, 10) // Adjust the scrolling speed as needed
      );
    }
  };

  const stopScrolling = () => {
    if (scrollInterval) {
      clearInterval(scrollInterval);
      setScrollInterval(null);
    }
  };

  const createQueryString = (item: NewsItem) => {
    const insertionHourString = new Date(item.Insertion_hour).toISOString();
    const queryString = `?NewsID=${item.NewsID}&Title=${encodeURIComponent(item.Title)}&Description=${encodeURIComponent(item.Description)}
    &Resource=${encodeURIComponent(item.Resource)}&Resource_icon=${encodeURIComponent(item.Resource_icon)}&Image=${encodeURIComponent(item.Image)}
    &Insertion_hour=${encodeURIComponent(insertionHourString)}&Category=${encodeURIComponent(item.Category)}&Like_count=${item.Like_count}&Dislike_count=${item.Dislike_count}
    &Is_liked=${item.isLiked}&Is_disliked=${item.isDisliked}`;
    return queryString;
  };

return (
  <div className="max-w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden relative mt-4 z-10"> {/* Set z-index to 10 */}
    <h3 className="text-xl font-bold p-3.5 bg-gray-800 text-white">{selectedLanguage === 'tr' ? 'Bunları da beğenebilirsiniz' : 'You may also like'}</h3>
    {recommendations !== null && (
      <div id="recommendations-container" className={`flex overflow-x-hidden px-10 relative`}> {/* Add relative positioning */}
        {recommendations.map((recommendation, index) => (
          <div key={recommendation.NewsID} className="p-4 flex flex-col relative p-4 flex group transition-transform duration-300 transform hover:-translate-y-1 hover:shadow-2xl relative"> {/* Add relative positioning */}
            <Link
              key={index}
              href={`/newsDetailPage${createQueryString(recommendation)}`}
            >
              <div className="w-36 h-36 xl:w-48 xl:h-26 mb-2 relative rounded-lg overflow-hidden">
                <Image
                  src={recommendation.Image}
                  alt={recommendation.Title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <h4 className="text-lg font-semibold text-gray-800 w-36 xl:w-48">{recommendation.Title}</h4>
            </Link>
          </div>
        ))}
      </div>
    )}
      <div
        className={`absolute left-0 top-14 bottom-0 h-auto w-10 flex justify-center items-center cursor-pointer text-black bg-opacity-70
          ${isHovered ? 'bg-gray-900 text-white' : 'bg-gray-200'}`}
        onMouseDown={() => { startScrolling(-5); setIsHovered(true); }}
        onMouseUp={() => { stopScrolling(); setIsHovered(false); }}
        onMouseLeave={() => { stopScrolling(); setIsHovered(false); }}
        onTouchStart={() => { startScrolling(-5); setIsHovered(true); }}
        onTouchEnd={() => { stopScrolling(); setIsHovered(false); }}
      >
        <SlArrowLeft />
      </div>
      <div
        className={`absolute right-0 top-14 bottom-0 h-auto w-10 flex justify-center items-center cursor-pointer text-black bg-opacity-70
        ${isHovered ? 'bg-gray-900 text-white' : 'bg-gray-200'}`}
        onMouseDown={() => { startScrolling(5); setIsHovered(true); }}
        onMouseUp={() => { stopScrolling(); setIsHovered(false); }}
        onMouseLeave={() => { stopScrolling(); setIsHovered(false); }}
        onTouchStart={() => { startScrolling(5); setIsHovered(true); }}
        onTouchEnd={() => { stopScrolling(); setIsHovered(false); }}
      >
        <SlArrowRight />
      </div>
    </div>
  );
};

export default RecommendationCard;
