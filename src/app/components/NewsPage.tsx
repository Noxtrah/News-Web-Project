"use client"
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import MainCard from './MainCard';

interface NewsItem {
  Title: string;
  Description: string;
  Resource: string;
  Resource_icon: string;
  Image: string;
  Insertion_hour: string;
  Category: string;
  Like_count: string;
  Dislike_count: string;
  NewsID: number;
}

const NewsPage: React.FC<{ category: string }> = ({ category }) => {
    const [newsData, setNewsData] = useState<NewsItem[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('RANDOM');
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(
              selectedCategory === 'RANDOM' 
              ? `http://localhost:5000/news` 
              : `http://localhost:5000/categorizedNews?category=${selectedCategory}`
            );
            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setNewsData(data);
          } catch (error) {
            console.error('Error fetching news data:', error);
          }
        };
    
        fetchData();
      }, [selectedCategory]);
    
      const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
      };

    return (
        <div>
          <Navbar onCategorySelect={handleCategoryChange} className='px-12 sm:px-12 md:px-12 lg:px-18 xl:px-40'/>
          <MainCard newsData={newsData} />
        </div>
      );
    };

export default NewsPage;
