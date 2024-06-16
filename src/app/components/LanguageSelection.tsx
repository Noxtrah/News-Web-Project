import { useTranslation } from 'react-i18next';
import { IoMdClose } from 'react-icons/io';
import { useState } from 'react';

interface LanguageSelectionProps {
  onClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const LanguageSelection: React.FC<LanguageSelectionProps> = ({ onClose }) => {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('selectedLanguage') || i18n.language;
    }
    return i18n.language;
  });

  const changeLanguage = (lng: string) => {
    if (typeof window !== 'undefined') { 
      i18n.changeLanguage(lng);
      setSelectedLanguage(lng);
      localStorage.setItem('selectedLanguage', lng);
      // window.location.reload();
    }
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
