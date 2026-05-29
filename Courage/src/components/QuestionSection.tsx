import React, { useState } from 'react';
import { Button } from "./ui/button";
import ChatInterface from './ChatInterface';
import { useLanguage } from '@/contexts/LanguageContext';

export default function QuestionSection() {
  const [showChat, setShowChat] = useState(false);
  const { language } = useLanguage();

  const getTitle = () => {
    switch (language) {
      case 'hi':
        return 'एक सवाल पूछें';
      case 'te':
        return 'ఒక ప్రశ్న అడగండి';
      case 'mr':
        return 'एक प्रश्न विचारा';
      default:
        return 'Ask a Question';
    }
  };

  const getDescription = () => {
    switch (language) {
      case 'hi':
        return 'कोई सवाल है? हमारा AI सहायक यहां मदद के लिए है!';
      case 'te':
        return 'ఏదైనా ప్రశ్న ఉందా? మా AI సహాయకుడు సహాయం చేయడానికి ఇక్కడ ఉన్నారు!';
      case 'mr':
        return 'काही प्रश्न आहे? आमचा AI सहाय्यक मदत करण्यासाठी येथे आहे!';
      default:
        return 'Have a question? Our AI assistant is here to help!';
    }
  };

  const getButtonText = () => {
    switch (language) {
      case 'hi':
        return 'शुरू करें';
      case 'te':
        return 'ప్రారంభించండి';
      case 'mr':
        return 'सुरू करा';
      default:
        return 'Get Started';
    }
  };

  if (showChat) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <ChatInterface />
        <Button 
          onClick={() => setShowChat(false)} 
          variant="outline"
          className="mt-4"
        >
          {language === 'hi' ? 'बंद करें' : language === 'te' ? 'మూసివేయండి' : language === 'mr' ? 'बंद करा' : 'Close'}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h2 className="text-2xl font-bold mb-4">{getTitle()}</h2>
      <p className="text-center mb-6">
        {getDescription()}
      </p>
      <Button onClick={() => setShowChat(true)}>
        {getButtonText()}
      </Button>
    </div>
  );
}