import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import BackToHome from '@/components/BackToHome';

const Dictionary = () => {
  const { language } = useLanguage();

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">
          {language === 'hi' ? 'कानूनी शब्दकोश' :
           language === 'te' ? 'న్యాయ నిఘంటువు' :
           language === 'mr' ? 'कायदेशीर शब्दकोश' :
           'Legal Dictionary'}
        </h1>
        <BackToHome />
      </div>
      {/* Add dictionary content here */}
    </div>
  );
};

export default Dictionary;
