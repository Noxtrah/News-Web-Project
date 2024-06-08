// 'use client'

// import React, { useRef, useState } from 'react';
// import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
// import { useTranslation } from 'react-i18next';

// interface NavbarProps {
//   className?: string;
//   onCategorySelect: (category: string) => void;
//   firstCategory: string;
// }

// let scrollInterval: NodeJS.Timeout | null = null;

// const Navbar: React.FC<NavbarProps> = ({ className, onCategorySelect, firstCategory}) => {
//   const { t } = useTranslation();
//   const [selectedCategory, setSelectedCategory] = useState(firstCategory);
//   const [isHovered, setIsHovered] = useState(false);
//   const navbarRef = useRef<HTMLUListElement>(null);

//   firstCategory = t('ALL');

//   const handleCategorySelect = (category: string) => {
//     setSelectedCategory(category);
//     onCategorySelect(category);
//   };

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
//       <div
//         className={`absolute left-0 xl:left-20 top-0 h-full w-10 flex justify-center items-center cursor-pointer rounded-3xl mt-0.5
//         ${isHovered ? 'bg-black text-white' : 'bg-white'}`}
//         onMouseDown={() => { startScrolling(-5); setIsHovered(true); }}
//         onMouseUp={() => { stopScrolling(); setIsHovered(false); }}
//         onMouseLeave={() => { stopScrolling(); setIsHovered(false); }}
//         onTouchStart={() => { startScrolling(-5); setIsHovered(true); }}
//         onTouchEnd={() => { stopScrolling(); setIsHovered(false); }}
//       >
//         <SlArrowLeft />
//       </div>
//       <div
//         className={`absolute right-0 xl:right-20 top-0 h-full w-10 flex justify-center items-center cursor-pointer rounded-3xl mt-0.5
//         ${isHovered ? 'bg-black text-white' : 'bg-white'}`}
//         onMouseDown={() => { startScrolling(5); setIsHovered(true); }}
//         onMouseUp={() => { stopScrolling(); setIsHovered(false); }}
//         onMouseLeave={() => { stopScrolling(); setIsHovered(false); }}
//         onTouchStart={() => { startScrolling(5); setIsHovered(true); }}
//         onTouchEnd={() => { stopScrolling(); setIsHovered(false); }}
//       >
//         <SlArrowRight />
//       </div>
//       <ul ref={navbarRef} className="flex overflow-x-hidden justify-between mt-1 cursor-pointer">
//         <li className={`mr-4 whitespace-nowrap ${selectedCategory === firstCategory ? 'font-bold' : ''}`} onClick={() => handleCategorySelect(firstCategory)}>{firstCategory}</li>
//         <li className={`mr-4 whitespace-nowrap ${selectedCategory === 'FINANCE' ? 'font-bold' : ''}`} onClick={() => handleCategorySelect('FINANCE')}>{t('finance')}</li>
//         <li className={`mr-4 whitespace-nowrap ${selectedCategory === 'WEATHER' ? 'font-bold' : ''}`} onClick={() => handleCategorySelect('WEATHER')}>{t('weather')}</li>
//         <li className={`mr-4 whitespace-nowrap ${selectedCategory === 'TECHNOLOGY' ? 'font-bold' : ''}`} onClick={() => handleCategorySelect('TECHNOLOGY')}>{t('technology')}</li>
//         <li className={`mr-4 whitespace-nowrap ${selectedCategory === 'SPORTS' ? 'font-bold' : ''}`} onClick={() => handleCategorySelect('SPORTS')}>{t('sports')}</li>
//         <li className={`mr-4 whitespace-nowrap ${selectedCategory === 'HEALTH' ? 'font-bold' : ''}`} onClick={() => handleCategorySelect('HEALTH')}>{t('health')}</li>
//         <li className={`mr-4 whitespace-nowrap ${selectedCategory === 'WORLD' ? 'font-bold' : ''}`} onClick={() => handleCategorySelect('WORLD')}>{t('world')}</li>
//         <li className={`mr-4 whitespace-nowrap ${selectedCategory === 'POLITICS' ? 'font-bold' : ''}`} onClick={() => handleCategorySelect('POLITICS')}>{t('politics')}</li>
//         <li className={`mr-4 whitespace-nowrap ${selectedCategory === 'ENVIRONMENT' ? 'font-bold' : ''}`} onClick={() => handleCategorySelect('ENVIRONMENT')}>{t('environment')}</li>
//         <li className={`mr-4 whitespace-nowrap ${selectedCategory === 'ENTERTAINMENT' ? 'font-bold' : ''}`} onClick={() => handleCategorySelect('ENTERTAINMENT')}>{t('entertainment')}</li>
//         <li className={`mr-4 whitespace-nowrap ${selectedCategory === 'FOOD' ? 'font-bold' : ''}`} onClick={() => handleCategorySelect('FOOD')}>{t('food')}</li>
//         <li className={`mr-4 whitespace-nowrap ${selectedCategory === 'TRAVEL' ? 'font-bold' : ''}`} onClick={() => handleCategorySelect('TRAVEL')}>{t('travel')}</li>
//         <li className={`mr-4 whitespace-nowrap ${selectedCategory === 'SCIENCE' ? 'font-bold' : ''}`} onClick={() => handleCategorySelect('SCIENCE')}>{t('science')}</li>
//         <li className={`mr-4 whitespace-nowrap ${selectedCategory === 'PLAY' ? 'font-bold' : ''}`} onClick={() => handleCategorySelect('PLAY')}>{t('play')}</li>
//         <li className={`mr-4 whitespace-nowrap ${selectedCategory === 'REAL ESTATE' ? 'font-bold' : ''}`} onClick={() => handleCategorySelect('REAL ESTATE')}>{t('real estate')}</li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;

'use client';

import React, { useRef, useState, useEffect } from 'react';
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { Translations } from '../types';

interface NavbarProps {
  className?: string;
  onCategorySelect: (category: string) => void;
  firstCategory: string;
}

// Translation JSON objects
const translations: Translations = {
  en: {
    ALL: "ALL",
    finance: "Finance",
    weather: "Weather",
    technology: "Technology",
    sports: "Sports",
    health: "Health",
    world: "World",
    politics: "Politics",
    environment: "Environment",
    entertainment: "Entertainment",
    food: "Food",
    travel: "Travel",
    science: "Science",
    play: "Play",
    real_estate: "Real Estate"
  },
  tr: {
    ALL: "TÜMÜ",
    finance: "Finans",
    weather: "Hava Durumu",
    technology: "Teknoloji",
    sports: "Spor",
    health: "Sağlık",
    world: "Dünya",
    politics: "Politika",
    environment: "Çevre",
    entertainment: "Eğlence",
    food: "Yemek",
    travel: "Seyahat",
    science: "Bilim",
    play: "Oyun",
    real_estate: "Gayrimenkul"
  }
};

let scrollInterval: NodeJS.Timeout | null = null;

const Navbar: React.FC<NavbarProps> = ({ className, onCategorySelect, firstCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState(firstCategory);
  const [isHovered, setIsHovered] = useState(false);
  const navbarRef = useRef<HTMLUListElement>(null);
  const [lang, setLang] = useState('en');
  const [t, setTranslations] = useState(translations[lang]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const selectedLanguage = localStorage.getItem('selectedLanguage') || 'en';
      setLang(selectedLanguage);
      setTranslations(translations[selectedLanguage]);
    }
  }, []);

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
        <li className={`mr-4 whitespace-nowrap ${selectedCategory === firstCategory ? 'font-bold' : ''}`} onClick={() => handleCategorySelect(firstCategory)}>{firstCategory}</li>
        <li className={`mr-4 whitespace-nowrap ${selectedCategory === 'FINANCE' ? 'font-bold' : ''}`} onClick={() => handleCategorySelect('FINANCE')}>{t.finance}</li>
        <li className={`mr-4 whitespace-nowrap ${selectedCategory === 'WEATHER' ? 'font-bold' : ''}`} onClick={() => handleCategorySelect('WEATHER')}>{t.weather}</li>
        <li className={`mr-4 whitespace-nowrap ${selectedCategory === 'TECHNOLOGY' ? 'font-bold' : ''}`} onClick={() => handleCategorySelect('TECHNOLOGY')}>{t.technology}</li>
        <li className={`mr-4 whitespace-nowrap ${selectedCategory === 'SPORTS' ? 'font-bold' : ''}`} onClick={() => handleCategorySelect('SPORTS')}>{t.sports}</li>
        <li className={`mr-4 whitespace-nowrap ${selectedCategory === 'HEALTH' ? 'font-bold' : ''}`} onClick={() => handleCategorySelect('HEALTH')}>{t.health}</li>
        <li className={`mr-4 whitespace-nowrap ${selectedCategory === 'WORLD' ? 'font-bold' : ''}`} onClick={() => handleCategorySelect('WORLD')}>{t.world}</li>
        <li className={`mr-4 whitespace-nowrap ${selectedCategory === 'POLITICS' ? 'font-bold' : ''}`} onClick={() => handleCategorySelect('POLITICS')}>{t.politics}</li>
        <li className={`mr-4 whitespace-nowrap ${selectedCategory === 'ENVIRONMENT' ? 'font-bold' : ''}`} onClick={() => handleCategorySelect('ENVIRONMENT')}>{t.environment}</li>
        <li className={`mr-4 whitespace-nowrap ${selectedCategory === 'ENTERTAINMENT' ? 'font-bold' : ''}`} onClick={() => handleCategorySelect('ENTERTAINMENT')}>{t.entertainment}</li>
        <li className={`mr-4 whitespace-nowrap ${selectedCategory === 'FOOD' ? 'font-bold' : ''}`} onClick={() => handleCategorySelect('FOOD')}>{t.food}</li>
        <li className={`mr-4 whitespace-nowrap ${selectedCategory === 'TRAVEL' ? 'font-bold' : ''}`} onClick={() => handleCategorySelect('TRAVEL')}>{t.travel}</li>
        <li className={`mr-4 whitespace-nowrap ${selectedCategory === 'SCIENCE' ? 'font-bold' : ''}`} onClick={() => handleCategorySelect('SCIENCE')}>{t.science}</li>
        <li className={`mr-4 whitespace-nowrap ${selectedCategory === 'PLAY' ? 'font-bold' : ''}`} onClick={() => handleCategorySelect('PLAY')}>{t.play}</li>
        <li className={`mr-4 whitespace-nowrap ${selectedCategory === 'REAL ESTATE' ? 'font-bold' : ''}`} onClick={() => handleCategorySelect('REAL ESTATE')}>{t.real_estate}</li>
      </ul>
    </nav>
  );
};

export default Navbar;
