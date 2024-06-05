"use client"
import React from 'react';
import Image from 'next/image';

interface NewsItem {
  Title: string;
  Description: string;
  Resource: string;
  Resource_icon: string;
  Image: string;
}

interface MainCardProps {
  newsData: NewsItem[];
}

const MainCard: React.FC<MainCardProps> = ({ newsData }) => {
  return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {newsData.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-4 mb-4 transform transition-transform duration-500 hover:scale-105 hover:shadow-lg">
              {/* Main Image */}
              <div className="relative w-full h-48 mb-4">
                <Image src={item.Image} alt={item.Title} fill className="rounded-t-lg object-cover" priority={index === 1}/>
              </div>
              <h2 className="text-lg font-semibold mb-2 text-black">{item.Title}</h2>
              <p className="text-gray-600 mb-2">{item.Description}</p>
              <div className="flex items-center">
                <Image src={item.Resource_icon} alt={item.Resource} width={24} height={24} className="mr-2" />
                <span className="text-gray-500">{item.Resource}</span>
              </div>
            </div>
          ))}
        </div>
      );
    };
export default MainCard;
