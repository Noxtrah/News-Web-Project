// "use client"

// import React, { useRef, useState } from 'react';
// import Image from 'next/image';
// import { IoIosCloseCircleOutline } from "react-icons/io";
// import { FcGoogle } from "react-icons/fc";
// import { useTranslation } from 'react-i18next';
// import RegisterPopup from './RegisterPopup';

// interface LoginPopupProps {
//   onClose: () => void;
// }

// const LoginPopup: React.FC<LoginPopupProps> = ({ onClose }) => {
//     const { t } = useTranslation();
//     const stopPropagation = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
//         e.stopPropagation();
//     };

//     const [isRegisterVisible, setIsRegisterVisible] = useState(false);

//     const openRegisterPopup = () => {
//         setIsRegisterVisible(true);
//     };

//     // const handleRegisterClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
//     //     e.stopPropagation();
//     //     openRegisterPopup();
//     //   };
    

//     const formRef = useRef<HTMLFormElement>(null);

//  const handleGoogleLogin = async () => {
//         if (formRef.current) {
//             formRef.current.submit();
//         }
//         // Add code here to handle the response from the server after successful login
//         try {
//             const response = await fetch('/login-success'); // Make a request to the server-side endpoint
//             if (response.ok) {
//                 const userData = await response.json();
//                 console.log('User data:', userData); // Log user information received from the server
//             } else {
//                 console.error('Login failed');
//             }
//         } catch (error) {
//             console.error('Error logging in:', error);
//         }
//     };

//     const handleClickInsidePopup = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
//         e.stopPropagation(); // Prevent click event from propagating to parent elements
//       };

//     const [isOpen, setIsOpen] = useState(false);
//     const openPopup = () => setIsOpen(true);
//     const closePopup = () => setIsOpen(false);

//     return (
//         <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-md shadow-2xl z-10 p-8 w-11/12 max-w-sm sm:w-96" onClick={handleClickInsidePopup}>
//             <div className="mb-6">
//                 <label className="block mb-2 text-gray-600 text-lg">{t('email')}</label>
//                 <input
//                     type="email"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-lg"
//                     onClick={stopPropagation}
//                 />
//             </div>
//             <div className="mb-6">
//                 <label className="block mb-2 text-gray-600 text-lg">{t('password')}</label>
//                 <input
//                     type="password"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-lg"
//                     onClick={stopPropagation}
//                 />
//             </div>
//             <div className="flex items-center justify-between mb-6">
//                 <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 text-lg">{t('login')}</button>
//                 <div>
//                 {/* Button that looks like a tag */}
//                 <button
//                     className="text-blue-500 hover:underline text-lg bg-transparent border-none cursor-pointer"
//                     onClick={openRegisterPopup}
//                 >
//                     Register
//                 </button>
//                 {/* Render RegisterPopup component when isRegisterVisible is true */}
//                 {isRegisterVisible && <RegisterPopup onClose={() => setIsRegisterVisible(false)} />}
//                 </div>
//             </div>
//             <div className="mb-6">
//                 <span className="text-gray-600 text-lg">{t('or sign in with')}</span>
//                 <div className="flex justify-between mt-4">
//                     <form ref={formRef} action="http://localhost:5000/auth/google" method="get">
//                         <button type="button" onClick={handleGoogleLogin} className="flex items-center justify-center bg-teal-500 text-white px-4 py-3 rounded-lg hover:bg-teal-600 text-lg">
//                             <FcGoogle className='w-6 h-6 mr-2 left:0' />
//                             Google
//                         </button>
//                     </form>
//                     {/* Add more social login options if needed */}
//                 </div>
//             </div>
//             <button className="absolute top-0 right-0 mt-4 mr-4 text-gray-600 hover:text-gray-800" onClick={onClose}>
//                 <IoIosCloseCircleOutline className="w-10 h-10 text-red-400 hover:text-red-600 transition duration-300" />
//             </button>
//         </div>
//     );
// };

// export default LoginPopup;

import React, { useRef } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { useTranslation } from "react-i18next";

interface LoginPopupProps {
  onClose: () => void;
  onRegisterClick: () => void;
}

const LoginPopup: React.FC<LoginPopupProps> = ({ onClose, onRegisterClick }) => {
  const { t } = useTranslation();
  const formRef = useRef<HTMLFormElement>(null);

  const handleGoogleLogin = async () => {
    if (formRef.current) {
      formRef.current.submit();
    }
    try {
      const response = await fetch("/login-success");
      if (response.ok) {
        const userData = await response.json();
        console.log("User data:", userData);
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleClickInsidePopup = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={onClose}>
      <div className="relative bg-white border border-gray-300 rounded-md shadow-2xl p-8 w-11/12 max-w-sm sm:w-96" onClick={handleClickInsidePopup}>
        <div className="mb-6">
          <label className="block mb-2 text-gray-600 text-lg">{t("email")}</label>
          <input
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-lg"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-gray-600 text-lg">{t("password")}</label>
          <input
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-lg"
          />
        </div>
        <div className="flex items-center justify-between mb-6">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 text-lg">{t("login")}</button>
          <div>
            <button
              className="text-blue-500 hover:underline text-lg bg-transparent border-none cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                onRegisterClick();
              }}
            >
              Register
            </button>
          </div>
        </div>
        <div className="mb-6">
          <span className="text-gray-600 text-lg">{t("or sign in with")}</span>
          <div className="flex justify-between mt-4">
            <form ref={formRef} action="http://localhost:5000/auth/google" method="get">
              <button type="button" onClick={handleGoogleLogin} className="flex items-center justify-center bg-teal-500 text-white px-4 py-3 rounded-lg hover:bg-teal-600 text-lg">
                <FcGoogle className="w-6 h-6 mr-2" />
                Google
              </button>
            </form>
          </div>
        </div>
        <button className="absolute top-4 right-4 text-gray-600 hover:text-gray-800" onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}>
          <IoIosCloseCircleOutline className="w-10 h-10 text-red-400 hover:text-red-600 transition duration-300" />
        </button>
      </div>
    </div>
  );
};

export default LoginPopup;
