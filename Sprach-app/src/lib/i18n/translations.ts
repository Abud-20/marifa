import { Locale } from '../types';

// Import all translation files
import deHome from './de/home.json';
import arHome from './ar/home.json';
import deNavbar from './de/navbar.json';
import arNavbar from './ar/navbar.json';
import deLogin from './de/login.json';
import arLogin from './ar/login.json';
import deStories from './de/stories.json';
import arStories from './ar/stories.json';
import deMemory from './de/memory.json';
import arMemory from './ar/memory.json';
import dePictures from './de/pictures.json';
import arPictures from './ar/pictures.json';

// Translation mapping
const translations = {
  de: {
    home: deHome,
    navbar: deNavbar,
    login: deLogin,
    stories: deStories,
    memory: deMemory,
    pictures: dePictures,
  },
  ar: {
    home: arHome,
    navbar: arNavbar,
    login: arLogin,
    stories: arStories,
    memory: arMemory,
    pictures: arPictures,
  },
};

export function getTranslations(locale: Locale, section: keyof typeof translations.de) {
  return translations[locale][section];
}

export function getTranslation(locale: Locale, section: keyof typeof translations.de, key: string) {
  const sectionTranslations = translations[locale][section] as Record<string, string>;
  return sectionTranslations[key] || key;
} 