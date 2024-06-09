// import { useState, ChangeEvent, FormEvent } from 'react';
// import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineClose } from 'react-icons/ai';
// import Router from 'next/router';
// import { User } from '../types';

// interface RegisterPopupProps {
//     onClose: () => void;
// }

// const RegisterPopup: React.FC<RegisterPopupProps> = ({ onClose }) => {
//     const [formData, setFormData] = useState<User>({
//         firstName: '',
//         lastName: '',
//         userEmail: '',
//         password: '',
//         country: '',
//         city: ''
//     });

//     const [showPassword, setShowPassword] = useState(false);

//     const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setFormData(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         try {
//             const response = await fetch('/api/register', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(formData)
//             });
//             if (response.ok) {
//                 // Redirect or do something on successful registration
//                 Router.push('/dashboard');
//             } else {
//                 // Handle error response
//                 console.error('Registration failed');
//             }
//         } catch (error) {
//             console.error('Error during registration:', error);
//         }
//     };

//     const togglePasswordVisibility = () => {
//         setShowPassword(prevState => !prevState);
//     };

//     return (
//         <div className="register-popup bg-grey-800 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-md shadow-2xl p-8 w-96">
//             <button className="absolute top-0 right-0 mt-1 mr-1 text-gray-600 hover:text-gray-800" onClick={onClose}>
//                 <AiOutlineClose className="w-6 h-6" />
//             </button>
//             <h2 className="text-2xl font-bold mb-6">Register</h2>
//             <form onSubmit={handleSubmit}>
//                 <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required />
//                 <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required />
//                 <input type="email" name="userEmail" placeholder="Email" value={formData.userEmail} onChange={handleChange} className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required />
//                 <div className="relative mb-4">
//                     <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required />
//                     <button type="button" className="absolute top-0 right-0 mt-2 mr-2" onClick={togglePasswordVisibility}>
//                         {showPassword ? <AiOutlineEyeInvisible className="w-6 h-6 text-gray-400" /> : <AiOutlineEye className="w-6 h-6 text-gray-400" />}
//                     </button>
//                 </div>
//                 <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required />
//                 <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required />
//                 <button type="submit" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 text-lg w-full">Register</button>
//             </form>
//         </div>
//     );
// };

// export default RegisterPopup;

import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { User } from "../types";

interface RegisterPopupProps {
  onClose: () => void;
}

const RegisterPopup: React.FC<RegisterPopupProps> = ({ onClose }) => {

    const [formData, setFormData] = useState<User>({
        firstName: '',
        lastName: '',
        userEmail: '',
        password: '',
        country: '',
        city: ''
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState: any) => ({
            ...prevState,
            [name]: value
        }));
    };

    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('https://msn-api-web-project.onrender.com/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                // Redirect or do something on successful registration
                router.push('/dashboard');
            } else {
                // Handle error response
                console.error('Registration failed');
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevState: any) => !prevState);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={onClose}>
          <div className="relative bg-white border border-gray-300 rounded-md shadow-2xl p-8 w-11/12 max-w-sm sm:w-96" onClick={(e) => e.stopPropagation()}>
          <h2 className="text-2xl font-bold mb-6">Register</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required />
                    <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required />
                    <input type="email" name="userEmail" placeholder="Email" value={formData.userEmail} onChange={handleChange} className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required />
                    <div className="relative mb-4">
                        <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required />
                        <button type="button" className="absolute top-0 right-0 mt-2 mr-2" onClick={togglePasswordVisibility}>
                            {showPassword ? <AiOutlineEyeInvisible className="w-6 h-6 text-gray-400" /> : <AiOutlineEye className="w-6 h-6 text-gray-400" />}
                        </button>
                    </div>
                    <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required />
                    <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required />
                    <button type="submit" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 text-lg w-full">Register</button>
                </form>
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

export default RegisterPopup;
