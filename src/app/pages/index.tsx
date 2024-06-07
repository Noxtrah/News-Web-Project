// import Header from '../components/Header';
// import MainCard from '../components/MainCard';
// import Navbar from '../components/Navbar';

// const Dashboard = () => {
//   return (
//     <div className='bg-gray-100 min-h-screen'>
//         <div className='p-4 md:px-8 lg:px-16 xl:px-32'>
//         <Header className="px-4 sm:px-8 md:px-12 lg:px-18 xl:px-40" />
//         <Navbar className='px-12 sm:px-12 md:px-12 lg:px-18 xl:px-40' />

//         {/* News Section */}
//         <section className="p-4 bg-white rounded-lg shadow-md">
//             {/* News Cards */}
//             <section className="p-4 bg-white rounded-lg shadow-md">
//           {/* News Cards */}
//           <MainCard />
//         </section>
//         </section>
//         </div>
//     </div>
//   );
// };

// export default Dashboard;

"use client"

import { setUserProfilePicture } from '../redux/actions';
import { useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import NewsPage from '../components/NewsPage';

const Index: React.FC = () => {
  const [userProfilePicture, setUserProfilePictureLocal] = useState<string | undefined>(undefined);
  const [sub, setSub] = useState<string | null>(null);
  // const dispatch = useDispatch();

  useEffect(() => {
    // Check if the "sub" value is already stored in localStorage
    const storedSub = localStorage.getItem('sub');
    if (storedSub) {
      setSub(storedSub);
    } else {
      // If not found in localStorage, retrieve it from URL params and store it
      const urlParams = new URLSearchParams(window.location.search);
      const subParam = urlParams.get('sub');
      if (subParam) {
        setSub(subParam);
        // Store the "sub" value in localStorage for future use
        localStorage.setItem('sub', subParam);
      }
    }
  }, []);


  useEffect(() => {
    // const urlParams = new URLSearchParams(window.location.search);
    const userProfilePictureParam = localStorage.getItem('storedUserProfilePicture');
    if (userProfilePictureParam) {
      setUserProfilePictureLocal(userProfilePictureParam);
      // Dispatch action to set user profile picture in Redux store
      // dispatch(setUserProfilePicture(userProfilePictureParam)); // This should return an action object
    }
  }, []);
  // }, [dispatch]);

  return (
    <div className='bg-gray-100 min-h-screen'>
      <div className='p-2 md:px-8 lg:px-16 xl:px-32'>
        <Header className="px-4 sm:px-8 md:px-12 lg:px-18 xl:px-40" userProfilePicture={userProfilePicture} />

        {/* News Section */}
        <section className="p-4 bg-white rounded-lg shadow-md">
          {/* NewsPage Component */}
          <NewsPage category={'RANDOM'} />
        </section>
      </div>
    </div>
  );
};

export default Index;
