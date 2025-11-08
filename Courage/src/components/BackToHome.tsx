import React from 'react';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

const BackToHome = () => {
  const handleBackToHome = () => {
    window.location.href = '/';
  };

  return (
    <Button variant="outline" onClick={handleBackToHome}>
      <Home className="h-4 w-4 mr-2" />
      Back to Home
    </Button>
  );
};

export default BackToHome;
