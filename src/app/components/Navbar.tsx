// // components/Navbar.tsx

// interface NavbarProps {
//     className?: string;
//   }

//   const Navbar: React.FC<NavbarProps> = ({ className }) => {
//     return (
//       <nav className={`bg-gray-700 text-black p-2 bg-white border-t-2 ${className}`}>
//         <ul className="flex flex-wrap sm:flex-nowrap overflow-x-auto">
//           <li className="mr-4 whitespace-nowrap">NEWS</li>
//           <li className="mr-4 whitespace-nowrap">ENTERTAINMENT</li>
//           <li className="mr-4 whitespace-nowrap">MONEY</li>
//           <li className="mr-4 whitespace-nowrap">SPORTS</li>
//           <li className="mr-4 whitespace-nowrap">GAMING</li>
//           <li className="mr-4 whitespace-nowrap">LIFESTYLE</li>
//           <li className="mr-4 whitespace-nowrap">SHOPPING</li>
//           <li className="mr-4 whitespace-nowrap">BUY A CAR</li>
//           <li className="mr-4 whitespace-nowrap">HEALTH</li>
//           <li className="mr-4 whitespace-nowrap">FOOD</li>
//           <li className="mr-4 whitespace-nowrap">TRAVEL</li>
//           <li className="mr-4 whitespace-nowrap">VIDEO</li>
//           <li className="mr-4 whitespace-nowrap">PLAY</li>
//           <li className="mr-4 whitespace-nowrap">REAL ESTATE</li>
//           {/* Add more categories as needed */}
//         </ul>
//       </nav>
//     );
//   };

//   export default Navbar;

"use client"

import React, { useRef } from 'react';

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const navbarRef = useRef<HTMLUListElement>(null);
  let scrollInterval: NodeJS.Timeout | null = null;

  const scrollCategories = (scrollOffset: number) => {
    if (navbarRef.current) {
      navbarRef.current.scrollLeft += scrollOffset;
    }
  };

  const startScrolling = (scrollOffset: number) => {
    if (!scrollInterval) {
      scrollInterval = setInterval(() => {
        scrollCategories(scrollOffset);
      }, 0); // Adjust the scrolling speed as needed
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
        className="absolute left-0 xl:left-20 top-0 h-full w-10 bg-gray-300 flex justify-center items-center"
        onMouseDown={() => startScrolling(-5)} // Adjust the scrollOffset and speed as needed
        onMouseUp={stopScrolling}
        onMouseLeave={stopScrolling}
      >
        {'<'}
      </div>
      <div
        className="absolute right-0 xl:right-20 top-0 h-full w-10 bg-gray-300 flex justify-center items-center"
        onMouseDown={() => startScrolling(5)} // Adjust the scrollOffset and speed as needed
        onMouseUp={stopScrolling}
        onMouseLeave={stopScrolling}
      >
        {'>'}
      </div>
      <ul ref={navbarRef} className="flex overflow-x-hidden justify-between">
        <li className="mr-4 whitespace-nowrap">NEWS</li>
        <li className="mr-4 whitespace-nowrap">ENTERTAINMENT</li>
        <li className="mr-4 whitespace-nowrap">MONEY</li>
        <li className="mr-4 whitespace-nowrap">SPORTS</li>
        <li className="mr-4 whitespace-nowrap">GAMING</li>
        <li className="mr-4 whitespace-nowrap">LIFESTYLE</li>
        <li className="mr-4 whitespace-nowrap">SHOPPING</li>
        <li className="mr-4 whitespace-nowrap">BUY A CAR</li>
        <li className="mr-4 whitespace-nowrap">HEALTH</li>
        <li className="mr-4 whitespace-nowrap">FOOD</li>
        <li className="mr-4 whitespace-nowrap">TRAVEL</li>
        <li className="mr-4 whitespace-nowrap">VIDEO</li>
        <li className="mr-4 whitespace-nowrap">PLAY</li>
        <li className="mr-4 whitespace-nowrap">REAL ESTATE</li>
        {/* Add more categories as needed */}
      </ul>
    </nav>
  );
};

export default Navbar;
