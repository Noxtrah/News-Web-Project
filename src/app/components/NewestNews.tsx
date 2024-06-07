import React, { useEffect, useState } from 'react';
import { NewsItem } from '../types';

const calculateHoursPassed = (insertionHour: Date) => {
  const insertionDate = new Date(insertionHour);
  const currentDate = new Date();
  const hoursPassed = Math.floor((currentDate.getTime() - insertionDate.getTime()) / (1000 * 60 * 60));
  return hoursPassed;
};

const NewestNews: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    // Replace 'ws://localhost:5000' with your actual WebSocket server URL
    const socket = new WebSocket('ws://localhost:5000');

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
  return (
    <div className="max-w-md mx-auto bg-white shadow-2xl rounded-lg overflow-hidden relative z-20"> {/* Set z-index to 20 */}
      <h3 className="text-xl font-bold p-4 bg-gray-800 text-white">Latest News</h3>
      <ul className="divide-y divide-gray-200">
        {news.map((item) => (
          <li key={item.NewsID} className="p-4 flex group transition-transform duration-300 transform hover:-translate-y-1 hover:shadow-2xl relative"> {/* Add relative positioning */}
            <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-gray-100 opacity-40 group-hover:animate-shine" />
            <img
              src={item.Image}
              alt={item.Title}
              className="w-36 h-20 xl:w-40 xl:h-20 rounded object-cover mr-4"
            />
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-gray-800">{item.Title.slice(0, 26)}...</h4>
              <p className="text-gray-500 text-sm">{calculateHoursPassed(item.Insertion_hour)} hours ago</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewestNews;
