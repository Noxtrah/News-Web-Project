// "use client"

// import React, { useRef, useState } from 'react';
// import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

// interface NavbarProps {
//   className?: string;
// }

// let scrollInterval: NodeJS.Timeout | null = null;

// const Navbar: React.FC<NavbarProps> = ({ className }) => {
//   const [isHovered, setIsHovered] = useState(false);
//   const navbarRef = useRef<HTMLUListElement>(null);

//   const scrollCategories = (scrollOffset: number) => {
//     if (navbarRef.current) {
//       navbarRef.current.scrollLeft += scrollOffset;
//     }
//   };

//   const startScrolling = (scrollOffset: number) => {
//     if (!scrollInterval) {
//       scrollInterval = setInterval(() => {
//         scrollCategories(scrollOffset);
//       }, 10); // Adjust the scrolling speed as needed
//     }
//   };

//   const stopScrolling = () => {
//     if (scrollInterval) {
//       clearInterval(scrollInterval);
//       scrollInterval = null;
//     }
//   };

//   return (
//     <nav className={`bg-gray-700 text-black p-2 bg-white border-t-2 relative ${className}`}>
//     <div
//       className={`absolute left-0 xl:left-20 top-0 h-full w-10 flex justify-center items-center cursor-pointer rounded-3xl mt-0.5
//       ${isHovered ? 'bg-black text-white' : 'bg-white'}`}
//       onMouseDown={() => { startScrolling(-5); setIsHovered(true); }}
//       onMouseUp={() => { stopScrolling(); setIsHovered(false); }}
//       onMouseLeave={() => { stopScrolling(); setIsHovered(false); }}
//       onTouchStart={() => { startScrolling(-5); setIsHovered(true); }}
//       onTouchEnd={() => { stopScrolling(); setIsHovered(false); }}
//     >
//       <SlArrowLeft />
//     </div>
//       <div
//         className={`absolute right-0 xl:right-20 top-0 h-full w-10 flex justify-center items-center cursor-pointer rounded-3xl mt-0.5
//         ${isHovered ? 'bg-black text-white' : 'bg-white'}`}
//         onMouseDown={() => { startScrolling(5); setIsHovered(true); }}
//         onMouseUp={() => { stopScrolling(); setIsHovered(false); }}
//         onMouseLeave={() => { stopScrolling(); setIsHovered(false); }}
//         onTouchStart={() => { startScrolling(5); setIsHovered(true); }}
//       onTouchEnd={() => { stopScrolling(); setIsHovered(false); }}
//       >
//         <SlArrowRight />
//       </div>
//       <ul ref={navbarRef} className="flex overflow-x-hidden justify-between mt-1 cursor-pointer">
//         <li className="mr-4 whitespace-nowrap">FINANCE</li>
//         <li className="mr-4 whitespace-nowrap">WEATHER</li>
//         <li className="mr-4 whitespace-nowrap">TECHNOLOGY</li>
//         <li className="mr-4 whitespace-nowrap">SPORTS</li>
//         <li className="mr-4 whitespace-nowrap">HEALTH</li>
//         <li className="mr-4 whitespace-nowrap">WORLD</li>
//         <li className="mr-4 whitespace-nowrap">POLITICS</li>
//         <li className="mr-4 whitespace-nowrap">ENVIRONMENT</li>
//         <li className="mr-4 whitespace-nowrap">ENTERTAINMENT</li>
//         <li className="mr-4 whitespace-nowrap">FOOD</li>
//         <li className="mr-4 whitespace-nowrap">TRAVEL</li>
//         <li className="mr-4 whitespace-nowrap">SCIENCE</li>
//         <li className="mr-4 whitespace-nowrap">PLAY</li>
//         <li className="mr-4 whitespace-nowrap">REAL ESTATE</li>
//         {/* Add more categories as needed */}
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;
"use client"
import React, { useRef, useState } from 'react';
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

interface NavbarProps {
  className?: string;
  onCategorySelect: (category: string) => void;
}

let scrollInterval: NodeJS.Timeout | null = null;

const Navbar: React.FC<NavbarProps> = ({ className, onCategorySelect }) => {
  const [selectedCategory, setSelectedCategory] = useState('RANDOM');
  const [isHovered, setIsHovered] = useState(false);
  const navbarRef = useRef<HTMLUListElement>(null);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    onCategorySelect(category);
  };

  const scrollCategories = (scrollOffset: number) => {
    if (navbarRef.current) {
      navbarRef.current.scrollLeft += scrollOffset;
    }
  };

  const startScrolling = (scrollOffset: number) => {
    if (!scrollInterval) {
      scrollInterval = setInterval(() => {
        scrollCategories(scrollOffset);
      }, 10); // Adjust the scrolling speed as needed
    }
  };

  const stopScrolling = () => {
    if (scrollInterval) {
      clearInterval(scrollInterval);
      scrollInterval = null;
    }
  };

  return (
    <nav className={`bg-gray-700 text-black p-2 bg-white border-t-2 relative ${className}`}>
      <div
        className={`absolute left-0 xl:left-20 top-0 h-full w-10 flex justify-center items-center cursor-pointer rounded-3xl mt-0.5
        ${isHovered ? 'bg-black text-white' : 'bg-white'}`}
        onMouseDown={() => { startScrolling(-5); setIsHovered(true); }}
        onMouseUp={() => { stopScrolling(); setIsHovered(false); }}
        onMouseLeave={() => { stopScrolling(); setIsHovered(false); }}
        onTouchStart={() => { startScrolling(-5); setIsHovered(true); }}
        onTouchEnd={() => { stopScrolling(); setIsHovered(false); }}
      >
        <SlArrowLeft />
      </div>
      <div
        className={`absolute right-0 xl:right-20 top-0 h-full w-10 flex justify-center items-center cursor-pointer rounded-3xl mt-0.5
        ${isHovered ? 'bg-black text-white' : 'bg-white'}`}
        onMouseDown={() => { startScrolling(5); setIsHovered(true); }}
        onMouseUp={() => { stopScrolling(); setIsHovered(false); }}
        onMouseLeave={() => { stopScrolling(); setIsHovered(false); }}
        onTouchStart={() => { startScrolling(5); setIsHovered(true); }}
        onTouchEnd={() => { stopScrolling(); setIsHovered(false); }}
      >
        <SlArrowRight />
      </div>
      <ul ref={navbarRef} className="flex overflow-x-hidden justify-between mt-1 cursor-pointer">
        <li className={`mr-4 whitespace-nowrap ${selectedCategory === 'RANDOM' ? 'font-bold' : ''}`} onClick={() => handleCategorySelect('RANDOM')}>RANDOM</li>
        <li className={`mr-4 whitespace-nowrap ${selectedCategory === 'FINANCE' ? 'font-bold' : ''}`} onClick={() => handleCategorySelect('FINANCE')}>FINANCE</li>
        <li className={`mr-4 whitespace-nowrap ${selectedCategory === 'WEATHER' ? 'font-bold' : ''}`} onClick={() => handleCategorySelect('WEATHER')}>WEATHER</li>
        <li className={`mr-4 whitespace-nowrap ${selectedCategory === 'TECHNOLOGY' ? 'font-bold' : ''}`} onClick={() => handleCategorySelect('TECHNOLOGY')}>TECHNOLOGY</li>
        <li className={`mr-4 whitespace-nowrap ${selectedCategory === 'SPORTS' ? 'font-bold' : ''}`} onClick={() => handleCategorySelect('SPORTS')}>SPORTS</li>
        <li className={`mr-4 whitespace-nowrap ${selectedCategory === 'HEALTH' ? 'font-bold' : ''}`} onClick={() => handleCategorySelect('HEALTH')}>HEALTH</li>
        <li className={`mr-4 whitespace-nowrap ${selectedCategory === 'WORLD' ? 'font-bold' : ''}`} onClick={() => handleCategorySelect('WORLD')}>WORLD</li>
        <li className={`mr-4 whitespace-nowrap ${selectedCategory === 'POLITICS' ? 'font-bold' : ''}`} onClick={() => handleCategorySelect('POLITICS')}>POLITICS</li>
        <li className={`mr-4 whitespace-nowrap ${selectedCategory === 'ENVIRONMENT' ? 'font-bold' : ''}`} onClick={() => handleCategorySelect('ENVIRONMENT')}>ENVIRONMENT</li>
        <li className={`mr-4 whitespace-nowrap ${selectedCategory === 'ENTERTAINMENT' ? 'font-bold' : ''}`} onClick={() => handleCategorySelect('ENTERTAINMENT')}>ENTERTAINMENT</li>
        <li className={`mr-4 whitespace-nowrap ${selectedCategory === 'FOOD' ? 'font-bold' : ''}`} onClick={() => handleCategorySelect('FOOD')}>FOOD</li>
        <li className={`mr-4 whitespace-nowrap ${selectedCategory === 'TRAVEL' ? 'font-bold' : ''}`} onClick={() => handleCategorySelect('TRAVEL')}>TRAVEL</li>
        <li className={`mr-4 whitespace-nowrap ${selectedCategory === 'SCIENCE' ? 'font-bold' : ''}`} onClick={() => handleCategorySelect('SCIENCE')}>SCIENCE</li>
        <li className={`mr-4 whitespace-nowrap ${selectedCategory === 'PLAY' ? 'font-bold' : ''}`} onClick={() => handleCategorySelect('PLAY')}>PLAY</li>
        <li className={`mr-4 whitespace-nowrap ${selectedCategory === 'REAL ESTATE' ? 'font-bold' : ''}`} onClick={() => handleCategorySelect('REAL ESTATE')}>REAL ESTATE</li>
      </ul>
    </nav>
  );
};

export default Navbar;
