import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import translation from './locales/en/translation.json';

// const resources = {
//   en: {
//     translation: translation
//   },
//   tr: {
//     translation: translation
//   }
// };

const resources = {
  en: {
    translation: require('./locales/en/translation.json')
  },
  tr: {
    translation: require('./locales/tr/translation.json')
  }
};


i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'tr',
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false, // React already safes from XSS
    },
  });

export default i18n;
