import React, { useState } from 'react';
import Home from './Home';
import ChatBox from '@/components/ChatBox';
import DocumentGenerator from '@/components/DocumentGenerator';
import NGODirectory from '@/components/NGODirectory';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

type Page = 'home' | 'chat' | 'document' | 'ngo' | 'ocr';

const Index = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const { t } = useLanguage();

  const handleNavigation = (page: Page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigation} />;
      case 'chat':
        return (
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="mb-6">
              <Button 
                variant="ghost" 
                onClick={() => setCurrentPage('home')}
                className="mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
              <h1 className="text-3xl font-bold text-foreground">{t('legalHelp')}</h1>
            </div>
            <ChatBox />
          </div>
        );
      case 'document':
        return (
          <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
              <Button 
                variant="ghost" 
                onClick={() => setCurrentPage('home')}
                className="mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </div>
            <DocumentGenerator />
          </div>
        );
      case 'ngo':
        return (
          <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
              <Button 
                variant="ghost" 
                onClick={() => setCurrentPage('home')}
                className="mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </div>
            <NGODirectory />
          </div>
        );
      case 'ocr':
        // Import and use OCRScanner component directly
        const OCRScanner = React.lazy(() => import('@/components/OCRScanner'));
        return (
          <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
              <Button 
                variant="ghost" 
                onClick={() => setCurrentPage('home')}
                className="mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </div>
            <React.Suspense fallback={<div>Loading...</div>}>
              <OCRScanner />
            </React.Suspense>
          </div>
        );
      default:
        return <Home onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderPage()}
    </div>
  );
};

export default Index;
