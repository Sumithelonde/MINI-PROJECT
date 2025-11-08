import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const Translator = () => {
  const { language } = useLanguage();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {language === 'hi' ? 'दस्तावेज़ अनुवादक' :
         language === 'te' ? 'డాక్యుమెంట్ అనువాదకుడు' :
         language === 'mr' ? 'दस्तऐवज भाषांतरकार' :
         'Document Translator'}
      </h1>
      {/* Add translator content here */}
    </div>
  );
};

export default Translator;
