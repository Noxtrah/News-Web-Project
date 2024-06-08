"use client"
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import dynamic from 'next/dynamic';

const DynamicSearchedNewsCategoryPage = dynamic(() => import('../searchedNewsCategory/page'), {
  ssr: false, // This disables server-side rendering for this component
});

interface NewsArticle {
  id: number;
  Title: string;
  Description: string;
  url: string;
  Insertion_hour: string;
  Resource: string;
  Resource_icon: string;
  Like_count: string;
  Dislike_count: string;
  Image: string;
}

const SearchedNewsCategoryPage: React.FC = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('searchQuery');
  const [query, setQuery] = useState('');
  const [newsData, setNewsData] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [userProfilePicture, setUserProfilePictureLocal] = useState<string | undefined>(undefined);
  const { t } = useTranslation();


  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userProfilePictureParam = localStorage.getItem('storedUserProfilePicture');
      if (userProfilePictureParam) {
        setUserProfilePictureLocal(userProfilePictureParam);
    }
    }
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setQuery(searchQuery);
      fetchArticles(searchQuery);
    }
  }, [searchQuery]);

  useEffect(() => {
    console.log('Use effect called');
    fetchData();
  }, [selectedCategory]);

  const fetchArticles = async (query: string | null) => {
    if (!query) return;

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/searchedNews?searchQuery=${query}`);
      const data = await response.json();
      setNewsData(data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      console.log('Fetching data for category:', selectedCategory);
      const response = await fetch(`http://localhost:5000/categorizedNews?category=${selectedCategory}`);

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setNewsData(data);
    } catch (error) {
      console.error('Error fetching news data:', error);
    }
  };

  const calculateHoursPassed = (insertionHour: string) => {
    const insertionDate = new Date(insertionHour);
    const currentDate = new Date();
    const hoursPassed = Math.floor((currentDate.getTime() - insertionDate.getTime()) / (1000 * 60 * 60));
    return hoursPassed;
  };

  const handleCategoryChange = (category: string) => {
    console.log('Selected category:', category);
    console.log('Search query:', query);
    if (category.toLowerCase() === query?.toLowerCase()) { // If selected category is same as search query
      console.log('Same category, fetching articles again');
      setSelectedCategory('');

      fetchArticles(query); // Fetch articles again with search query
    } else {
      console.log('Different category selected: ', category);
      setSelectedCategory(category);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className='p-2 md:px-8 lg:px-16 xl:px-32'>
      <Header className="px-4 sm:px-8 md:px-12 lg:px-18 xl:px-40" userProfilePicture={userProfilePicture} />
        <Navbar onCategorySelect={(category) => handleCategoryChange(category)} className="px-12 sm:px-12 md:px-12 lg:px-18 xl:px-40" firstCategory={query.toUpperCase() || t('NONE')} />
        <section className="p-4 bg-white rounded-lg shadow-md">
          <main className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-black underline">Search Results for: {query.toUpperCase() || t('NONE')}</h1>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {newsData.map(article => (
                  <div key={article.id} className="bg-white rounded-lg shadow-md p-4 mb-4 transform transition-transform duration-500 hover:scale-105 hover:shadow-lg">
                    <div className="flex items-center mb-2">
                      <h2 className="text-xl font-bold text-black">{article.Title}</h2>
                    </div>
                    <div className="relative w-full h-48 mb-4">
                      <Image src={article.Image} alt={article.Title} fill className="rounded-t-lg object-cover"/>
                    </div>
                    <p className="text-gray-700 mb-2">{article.Description}</p>
                    <div className="flex items-center text-gray-500 text-sm mb-2">
                      <p>Source: {article.Resource}</p>
                      <Image src={article.Resource_icon} alt={article.Resource} width={24} height={24} className="ml-2" />
                    </div>
                    <p className="text-gray-500 text-sm mb-2">Published {calculateHoursPassed(article.Insertion_hour)} hours ago</p>
                    <div className="flex items-center mb-2">
                      <p className="text-green-500 mr-4">Likes: {article.Like_count}</p>
                      <p className="text-red-500">Dislikes: {article.Dislike_count}</p>
                    </div>
                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      Read more
                    </a>
                  </div>
                ))}
              </div>
            )}
          </main>
        </section>
      </div>
    </div>
  );
};

export default SearchedNewsCategoryPage;
