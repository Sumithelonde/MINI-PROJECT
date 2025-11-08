import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const Dictionary = () => {
  const { language } = useLanguage();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {language === 'hi' ? 'कानूनी शब्दकोश' :
         language === 'te' ? 'న్యాయ నిఘంటువు' :
         language === 'mr' ? 'कायदेशीर शब्दकोश' :
         'Legal Dictionary'}
      </h1>
      {/* Add dictionary content here */}
    </div>
  );
};

export default Dictionary;
