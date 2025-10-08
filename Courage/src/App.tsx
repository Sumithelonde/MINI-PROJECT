import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import OCRScanner from "./components/OCRScanner";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import "@n8n/chat/style.css";
import { createChat } from "@n8n/chat";
import "./custom-n8n-chat.css"; // 
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    createChat({
      webhookUrl: "https://sumithelonde.app.n8n.cloud/webhook/86816cfb-edb3-41c2-a959-b5c72a110eb6/chat", // Only the webhook ID
      logoUrl: "https://yourdomain.com/path/to/logo.png", // Use a valid logo URL
      title: "Vakyalok Legal Chat",
      position: "bottom-left",
      theme: {
        color: "#2b1212",      // header/button color
        background: "#400000", // chat background
        text: "#338353"        // text color
      }
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <header style={{ 
            padding: '1rem', 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#f8f9fa',
            borderBottom: '1px solid #e9ecef'
          }}>
            <div>
              <h1 style={{ margin: 0 }}>Vakyalok Legal</h1>
            </div>
            <div>
              <SignedOut>
                <SignInButton mode="modal" />
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>
          </header>
          <Toaster />
          <Sonner />
          <BrowserRouter>
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
