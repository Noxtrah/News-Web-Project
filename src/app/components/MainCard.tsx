// "use client"
// import React from 'react';
// import Image from 'next/image';

// interface NewsItem {
//   Title: string;
//   Description: string;
//   Resource: string;
//   Resource_icon: string;
//   Image: string;
// }

// interface MainCardProps {
//   newsData: NewsItem[];
// }

// const MainCard: React.FC<MainCardProps> = ({ newsData }) => {
//   return (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
//           {newsData.map((item, index) => (
//             <div key={index} className="bg-white rounded-lg shadow p-4 mb-4 transform transition-transform duration-500 hover:scale-105 hover:shadow-lg">
//               {/* Main Image */}
//               <div className="relative w-full h-48 mb-4">
//                 <Image src={item.Image} alt={item.Title} fill className="rounded-t-lg object-cover" priority={index === 1}/>
//               </div>
//               <h2 className="text-lg font-semibold mb-2 text-black">{item.Title}</h2>
//               <p className="text-gray-600 mb-2">{item.Description}</p>
//               <div className="flex items-center">
//                 <Image src={item.Resource_icon} alt={item.Resource} width={24} height={24} className="mr-2" />
//                 <span className="text-gray-500">{item.Resource}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       );
//     };
// export default MainCard;

// MainCard.tsx


import React from 'react';
import Link from 'next/link'; // Import Link from next/link
import Image from 'next/image';
import { NewsItem } from '../types';

interface MainCardProps {
  newsData: NewsItem[];
}

const MainCard: React.FC<MainCardProps> = ({ newsData }) => {
  const createQueryString = (item: NewsItem) => {
    const insertionHourString = new Date(item.Insertion_hour).toISOString();
    return `?NewsID=${item.NewsID}&Title=${encodeURIComponent(item.Title)}&Description=${encodeURIComponent(item.Description)}&Resource=${encodeURIComponent(item.Resource)}&Resource_icon=${encodeURIComponent(item.Resource_icon)}&Image=${encodeURIComponent(item.Image)}
    &Insertion_hour=${encodeURIComponent(insertionHourString)}&Category=${encodeURIComponent(item.Category)}&Like_count=${item.Like_count}&Dislike_count=${item.Dislike_count}`;
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {newsData.map((item, index) => (
        <Link
          key={index}
          href={`/newsDetailPage${createQueryString(item)}`}
          className="bg-white rounded-lg shadow p-4 mb-4 transform transition-transform duration-500 hover:scale-105 hover:shadow-lg cursor-pointer"
        >
          <div className="relative w-full h-48 mb-4">
            <Image src={item.Image} alt={item.Title} fill className="rounded-t-lg object-cover" priority={index === 1} />
          </div>
          <h2 className="text-lg font-semibold mb-2 text-black">{item.Title}</h2>
          <p className="text-gray-600 mb-2">{item.Description}</p>
          <div className="flex items-center">
            <Image src={item.Resource_icon} alt={item.Resource} width={24} height={24} className="mr-2" />
            <span className="text-gray-500">{item.Resource}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MainCard;
