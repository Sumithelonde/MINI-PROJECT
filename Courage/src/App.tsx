import React, { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import OCRScanner from "./components/OCRScanner";
import NotFound from "./pages/NotFound";
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import BackToHome from './components/BackToHome';

const queryClient = new QueryClient();

const LazyThemeToggle = lazy(() => import("./components/ThemeToggle"));

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <BrowserRouter>
            <header className="w-full px-4 py-3 flex items-center justify-between bg-background border-b border-border">
              <div className="flex items-center gap-3">
                {/* Back to home button (hidden on home route) */}
                <div className="mr-2">
                  <BackToHome />
                </div>

                {/* Inline simple logo */}
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-md flex items-center justify-center bg-primary text-primary-foreground shadow-glow">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <circle cx="12" cy="12" r="10" fill="currentColor" />
                      <path d="M8 12h8M8 8h8M8 16h8" stroke="rgba(255,255,255,0.9)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h1 className="text-lg font-bold text-foreground m-0">Legislate AI</h1>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Theme toggle placed before auth buttons */}
                {/* Lazy load ThemeToggle to avoid SSR issues (simple client component) */}
                {/** lazy load ThemeToggle so it's only used client-side */}
                <Suspense fallback={null}>
                  <LazyThemeToggle />
                </Suspense>

                <div>
                  <SignedOut>
                    <SignInButton mode="modal" />
                  </SignedOut>
                  <SignedIn>
                    <UserButton afterSignOutUrl="/" />
                  </SignedIn>
                </div>
              </div>
            </header>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
