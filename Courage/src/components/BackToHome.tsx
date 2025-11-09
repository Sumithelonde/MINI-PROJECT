import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * BackToHome - Navigation button that takes users back to the homepage.
 * Features:
 * - Hides automatically on the home page
 * - Keyboard shortcut: Alt + ← (Alt + Left Arrow)
 * - Smooth hover animations
 * - Consistent styling across all pages
 */
const BackToHome: React.FC<{ className?: string; alwaysShow?: boolean }> = ({ className, alwaysShow = false }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide the button on the home page (unless alwaysShow is true)
  if (!alwaysShow && (location.pathname === '/' || location.pathname === '')) return null;

  const handleBackToHome = () => {
    navigate('/');
  };

  // Keyboard shortcut: Alt + Left Arrow
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.altKey && event.key === 'ArrowLeft') {
        event.preventDefault();
        navigate('/');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return (
    <Button
      variant="outline"
      onClick={handleBackToHome}
      title="Back to Home (Alt + ←)"
      className={className || 'inline-flex items-center gap-2 text-foreground bg-background hover:bg-accent hover:scale-105 px-4 py-2 transition-all duration-200 ease-in-out border border-border shadow-sm hover:shadow-md'}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="font-medium">Back to Home</span>
    </Button>
  );
};

export default BackToHome;
