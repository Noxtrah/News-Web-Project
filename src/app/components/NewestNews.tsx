import React, { Suspense, useEffect, useState } from 'react';
import { NewsItem } from '../types';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const calculateHoursPassed = (insertionHour: Date) => {
  const insertionDate = new Date(insertionHour);
  const currentDate = new Date();
  const hoursPassed = Math.floor((currentDate.getTime() - insertionDate.getTime()) / (1000 * 60 * 60));
  return hoursPassed;
};

const NewestNews: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    // Replace 'ws://localhost:5000' with your actual WebSocket server URL
    const socket = new WebSocket('wss://msn-api-web-project.onrender.com');

    socket.onopen = () => {
      console.log('Connected to the WebSocket server');
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'NEWEST_NEWS') {
          setNews(data.data);
        }
      } catch (error) {
        console.log('Received non-JSON message:', event.data);
      }
    };

    socket.onclose = () => {
      console.log('Disconnected from the WebSocket server');
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      socket.close();
    };
  }, []);

  const createQueryString = (item: NewsItem) => {
    const insertionHourString = new Date(item.Insertion_hour).toISOString();
    return `?NewsID=${item.NewsID}&Title=${encodeURIComponent(item.Title)}&Description=${encodeURIComponent(item.Description)}&Resource=${encodeURIComponent(item.Resource)}&Resource_icon=${encodeURIComponent(item.Resource_icon)}&Image=${encodeURIComponent(item.Image)}
    &Insertion_hour=${encodeURIComponent(insertionHourString)}&Category=${encodeURIComponent(item.Category)}&Like_count=${item.Like_count}&Dislike_count=${item.Dislike_count}`;
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div className="max-w-md mx-auto bg-white shadow-2xl rounded-lg overflow-hidden relative z-20">
      <h3 className="text-xl font-bold p-4 bg-gray-800 text-white">{t("Latest News")}</h3>
      <ul className="divide-y divide-gray-200">
        {news.map((item, index) => (
          <li key={item.NewsID} className="p-4 flex group transition-transform duration-300 transform hover:-translate-y-1 hover:shadow-2xl relative">
            <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-gray-100 opacity-40 group-hover:animate-shine" style={{ pointerEvents: 'none' }} />
              <Link
                key={index}
                href={`/newsDetailPage${createQueryString(item)}`}
                className="flex"
              >
              <Image
                src={item.Image}
                alt={item.Title}
                width={144}
                height={80}
                className="rounded object-cover mr-4"
              />

              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-800">{item.Title.slice(0, 26)}...</h4>
                <p className="text-gray-500 text-sm">{calculateHoursPassed(item.Insertion_hour)} {t("hours ago")}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>,
    </Suspense>
  );
};

export default NewestNews;
