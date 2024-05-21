// import React from 'react'
// import Image from 'next/image'
// import { HiUserCircle } from 'react-icons/hi';
// import { IoIosNotificationsOutline, IoIosSettings } from 'react-icons/io';

// interface HeaderProps {
//     className?: string;
//   }

// const Header: React.FC<HeaderProps> = ({className}) => {
//     return (
//         <header className={`bg-white text-white p-4 flex justify-between items-center ${className}`}>
//           {/* Logo */}
//           <div className="flex items-center flex-shrink-0">
//             <Image src="/msn_logo.svg" alt="Logo" className="h-8 mr-4" layout="fixed" width={64} height={64} />
//           </div>

//           {/* Search Bar */}
//           <div className="flex flex-grow items-center ">
//             <input
//               type="text"
//               placeholder="Search news..."
//               className="flex-grow max-w-full sm:w-48 md:w-64 lg:w-80 xl:w-96 px-2 py-1 border border-gray-600 rounded-lg mr-2 sm:mr-2 md:mr-4 lg:mr-4 xl:mr-4"
//             />
//             {/* Profile Icon */}
//             <div className="bg-black rounded-3xl"><HiUserCircle className="w-8 h-8 sm:w-10 sm:h-10 md:w-10 md:h-10 lg:w-10 lg:h-10 xl:w-10 xl:h-10"  /></div>
//             {/* Notification Bell */}
//             {/* Settings Icon */}
//             <div className='bg-white rounded-3xl pl-1 sm:pl-2 md:pl-2 lg:pl-2 xl:pl-2'><IoIosSettings className='w-6 h-6 text-gray-500 sm:w-8 sm:h-8 md:w-8 md:h-8 lg:w-8 lg:h-8 xl:w-8 xl:h-8'/></div>
//             <div className='bg-white rounded-3xl pl-1 sm:pl-2 md:pl-2 lg:pl-2 xl:pl-2'><IoIosNotificationsOutline className='w-6 h-6 text-yellow-500 sm:w-8 sm:h-8 md:w-8 md:h-8 lg:w-8 lg:h-8 xl:w-8 xl:h-8' /></div>
//           </div>
//         </header>
//       );
//     };

// export default Header

import { HiUserCircle } from 'react-icons/hi';
import { IoIosSettings, IoIosNotificationsOutline } from 'react-icons/io';
import Image from 'next/image';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={`bg-white text-black p-4 flex items-center ${className}`}>
      {/* Logo */}
      <div className="flex-shrink-0">
        <Image src="/msn_logo.svg" alt="Logo" className="h-8 sm:mr-2 md:mr-4 lg:mr-4 xl:mr-4" layout="fixed" width={64} height={64} />
      </div>

      {/* Search Bar */}
      <div className="flex flex-grow mx-2 ml-full sm:mr-2 md:mr-4 lg:mr-4 xl:mr-4">
        <input
          type="text"
          placeholder="Search news..."
          className="w-full max-w-10xl px-2 py-1 border border-gray-600 rounded-lg"
        />
      </div>

      {/* Icons */}
      <div className="flex items-center space-x-2">
        {/* Profile Icon */}
        <div className="bg-black rounded-3xl">
          <HiUserCircle className="w-8 h-8 sm:w-10 sm:h-10 md:w-10 md:h-10 lg:w-10 lg:h-10 xl:w-10 xl:h-10 text-white" />
        </div>
        {/* Settings Icon */}
        <div className="bg-white rounded-3xl">
          <IoIosSettings className="w-6 h-6 text-gray-500 sm:w-8 sm:h-8 md:w-8 md:h-8 lg:w-8 lg:h-8 xl:w-8 xl:h-8" />
        </div>
        {/* Notification Bell */}
        <div className="bg-white rounded-3xl">
          <IoIosNotificationsOutline className="w-6 h-6 text-yellow-500 sm:w-8 sm:h-8 md:w-8 md:h-8 lg:w-8 lg:h-8 xl:w-8 xl:h-8" />
        </div>
      </div>
    </header>
  );
};

export default Header;
