import React, { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import MainCard from './MainCard';
import { useTranslation } from 'react-i18next';

interface NewsItem {
  Title: string;
  Description: string;
  Resource: string;
  Resource_icon: string;
  Image: string;
  Insertion_hour: Date;
  Category: string;
  Like_count: string;
  Dislike_count: string;
  NewsID: number;
}

const NewsPage: React.FC<{ category: string }> = ({ category }) => {
  const { t, i18n } = useTranslation();
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(t('ALL'));
  const [isClient, setIsClient] = useState(false);
  const isFirstCategoryHandled = useRef(false); // useRef to track if handleFirstCategory has been called

  useEffect(() => {
    setIsClient(true); // Set isClient to true when the component is mounted on the client side
  }, []);

  useEffect(() => {
    if (isClient && !isFirstCategoryHandled.current) {
      if (typeof window !== 'undefined') {
        const initialCategory = localStorage.getItem('selectedCategory') || handleFirstCategory();
        setSelectedCategory(initialCategory);
        isFirstCategoryHandled.current = true; // Set to true after handling the initial category
      }
    }
  }, [isClient, i18n.language]);

  useEffect(() => {
    if (isClient) {
      const fetchData = async () => {
        try {
          if (typeof window !== 'undefined') {
            const language = localStorage.getItem('selectedLanguage') || i18n.language;
            const response = await fetchNewsData(selectedCategory, language);
            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            data.forEach((item: NewsItem) => {
              item.Insertion_hour = new Date(item.Insertion_hour);
            });
            setNewsData(data);
        }
        } catch (error) {
          console.error('Error fetching news data:', error);
        }
      };

      fetchData();
    }
  }, [selectedCategory, i18n.language, isClient]);

  const fetchNewsData = async (category: string, language: string) => {
    return await fetch(
      category === 'ALL' || category === 'HEPSİ'
        ? `https://msn-api-web-project.onrender.com/news?language=${language}`
        : `https://msn-api-web-project.onrender.com/categorizedNews?category=${category}&language=${language}`
    );
  };

  const handleCategoryChange = (category: string) => {
    if (typeof window !== 'undefined') {
      setSelectedCategory(category);
      if (isClient) {
        localStorage.setItem('selectedCategory', category);
      }
    }
  };

  const handleFirstCategory = () => {
    if (typeof window !== 'undefined') {
      const checkLanguage = localStorage.getItem('selectedLanguage') || '';
      if (checkLanguage === 'en') {
        console.log('en ALL');
        return 'ALL';
      } else if (checkLanguage === 'tr') {
        console.log('tr HEPSİ');
        return 'HEPSİ';
      }
    }
    console.log('Defaulting to ALL');
    return 'ALL';
  };

  return (
    <div>
      <Navbar onCategorySelect={handleCategoryChange} className='px-12 sm:px-12 md:px-12 lg:px-18 xl:px-40' firstCategory={handleFirstCategory()} />
      <MainCard newsData={newsData} />
    </div>
  );
};

export default NewsPage;
