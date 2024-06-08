// import { useTranslation } from 'react-i18next';
// import { IoMdClose } from 'react-icons/io';
// import { useEffect, useState } from 'react';


// interface LanguageSelectionProps {
//   onClose: () => void;
// }

// const LanguageSelection: React.FC<LanguageSelectionProps> = ({ onClose }) => {
//   const { i18n } = useTranslation();
//   const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
//   const { t } = useTranslation();

//   const changeLanguage = (lng: string) => {
//     i18n.changeLanguage(lng);
//     setSelectedLanguage(lng);
//     onClose();
//   };

//   useEffect(() => {
//     setSelectedLanguage(i18n.language);
//   }, [i18n.language]);

//   return (
//     <div className="bg-white shadow-lg rounded-lg p-6 z-50 w-64" onClick={(e) => e.stopPropagation()}>
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="text-lg font-semibold text-gray-700">{t('select language')}</h3>
//         <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
//           <IoMdClose className="w-6 h-6" />
//         </button>
//       </div>
//       <div className="space-y-2">
//         <select
//           value={selectedLanguage}
//           onChange={(e) => changeLanguage(e.target.value)}
//           className="block w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-none focus:outline-none focus:ring focus:border-blue-300"
//         >
//           <option value="en" className="rounded-none">{t('english')}</option>
//           <option value="tr" className="rounded-none">{t('turkish')}</option>
//           {/* Add more languages as needed */}
//         </select>
//       </div>
//     </div>
//   );
// };

// export default LanguageSelection;

// import { useTranslation } from 'react-i18next';
// import { IoMdClose } from 'react-icons/io';
// import { useEffect, useState } from 'react';

// interface LanguageSelectionProps {
//   onClose: () => void;
// }

// const LanguageSelection: React.FC<LanguageSelectionProps> = ({ onClose }) => {
//   const { i18n } = useTranslation();
//   const [selectedLanguage, setSelectedLanguage] = useState<string>(() => {
//     // Retrieve language from localStorage or default to i18n language
//     return localStorage.getItem('selectedLanguage') || i18n.language;
//   });
//   const { t } = useTranslation();

//   const changeLanguage = (lng: string) => {
//     i18n.changeLanguage(lng);
//     setSelectedLanguage(lng);
//     onClose();
//     // Store selected language in localStorage
//     localStorage.setItem('selectedLanguage', lng);
//     window.location.reload();
//     i18n.changeLanguage(localStorage.getItem('selectedLanguage') || i18n.language)
//   };

//   useEffect(() => {
//     const storedLanguage = localStorage.getItem('selectedLanguage');
//     if (storedLanguage) {
//       i18n.changeLanguage(storedLanguage);
//       setSelectedLanguage(storedLanguage);
//     } else {
//       setSelectedLanguage(i18n.language);
//     }
//   }, [i18n, setSelectedLanguage]);

//   return (
//     <div className="bg-white shadow-lg rounded-lg p-6 z-50 w-64" onClick={(e) => e.stopPropagation()}>
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="text-lg font-semibold text-gray-700">{t('select language')}</h3>
//         <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
//           <IoMdClose className="w-6 h-6" />
//         </button>
//       </div>
//       <div className="space-y-2">
//         <select
//           value={selectedLanguage}
//           onChange={(e) => changeLanguage(e.target.value)}
//           className="block w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-none focus:outline-none focus:ring focus:border-blue-300"
//         >
//           <option value="en" className="rounded-none">{t('english')}</option>
//           <option value="tr" className="rounded-none">{t('turkish')}</option>
//           {/* Add more languages as needed */}
//         </select>
//       </div>
//     </div>
//   );
// };

// export default LanguageSelection;

import { useTranslation } from 'react-i18next';
import { IoMdClose } from 'react-icons/io';
import { useState } from 'react';

interface LanguageSelectionProps {
  onClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const LanguageSelection: React.FC<LanguageSelectionProps> = ({ onClose }) => {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    // Retrieve language from localStorage or default to i18n language
    return localStorage.getItem('selectedLanguage') || i18n.language;
  });

  const changeLanguage = (lng: string) => {
    // Change language and update selectedLanguage state
    i18n.changeLanguage(lng);
    setSelectedLanguage(lng);
    // Store selected language in localStorage
    localStorage.setItem('selectedLanguage', lng);
    // Refresh window
    window.location.reload();
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 z-50 w-64" onClick={(e) => e.stopPropagation()}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Select Language</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <IoMdClose className="w-6 h-6" />
        </button>
      </div>
      <div className="space-y-2">
        <select
          value={selectedLanguage}
          onChange={(e) => changeLanguage(e.target.value)}
          className="block w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-none focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="en">English</option>
          <option value="tr">Turkish</option>
        </select>
      </div>
    </div>
  );
};

export default LanguageSelection;
