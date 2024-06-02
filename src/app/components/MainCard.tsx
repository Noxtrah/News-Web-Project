// //mainCard.tsx
// "use client"
// import React, { useEffect, useState } from 'react';
// import Image from 'next/image';

// interface NewsItem {
//   Title: string;
//   Description: string;
//   Resource: string;
//   Resource_icon: string;
//   Image: string;
// }

// const MainCard: React.FC = () => {
//   const [newsData, setNewsData] = useState<NewsItem[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/news`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch data');
//         }
//         const data = await response.json();
//         setNewsData(data);
//       } catch (error) {
//         console.error('Error fetching main card data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
//       {newsData.map((item, index) => (
//         <div key={index} className="bg-white rounded-lg shadow p-4 mb-4">
//           {/* Main Image */}
//           <div className="relative w-full h-48 mb-4">
//             <Image src={item.Image} alt={item.Title} layout="fill" objectFit="cover" className="rounded-t-lg" />
//           </div>
//           <h2 className="text-lg font-semibold mb-2 text-black">{item.Title}</h2>
//           <p className="text-gray-600 mb-2">{item.Description}</p>
//           <div className="flex items-center">
//             <Image src={item.Resource_icon} alt={item.Resource} width={24} height={24} className="mr-2" />
//             <span className="text-gray-500">{item.Resource}</span>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MainCard;

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
