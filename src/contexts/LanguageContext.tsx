import React, { createContext, useContext, useState, ReactNode } from 'react';
import { translations, Translation } from '../i18n/translations';

interface LanguageContextType {
  currentLanguage: string;
  t: Translation;
  switchLanguage: (lang: string) => void;
  availableLanguages: string[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<string>('en');
  
  const switchLanguage = (lang: string) => {
    console.log('Context switching to:', lang);
    setCurrentLanguage(lang);
    document.documentElement.lang = lang;
  };
  
  const t: Translation = translations[currentLanguage] || translations.en;
  
  const value = {
    currentLanguage,
    t,
    switchLanguage,
    availableLanguages: Object.keys(translations)
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};