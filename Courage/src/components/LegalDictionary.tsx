import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Book, Home, ArrowRight, Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { sendChatMessage } from '@/services/openrouter';
import { useNavigate } from 'react-router-dom';
import BackToHome from './BackToHome';

const LegalDictionary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState('');
  const { language } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();

  const searchLegalTerm = async () => {
    if (!searchTerm.trim()) {
      toast({
        title: "Enter a term",
        description: "Please enter a legal term to search",
        variant: "destructive"
      });
      return;
    }

    setIsSearching(true);

    try {
      const prompt = `Explain the legal term "${searchTerm}" in ${language === 'en' ? 'English' : language === 'hi' ? 'Hindi' : language === 'te' ? 'Telugu' : 'Marathi'}.
      
Format the response as follows:
1. Term Definition
2. Usage in Legal Context
3. Related Terms
4. Key Points to Remember
5. Example Usage in a Sentence

Keep the explanation simple and easy to understand for non-lawyers.`;

      const response = await sendChatMessage([{ role: 'user', content: prompt }]);

      if (!response) {
        throw new Error('Search failed');
      }

      setSearchResult(response.trim());
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: "Search failed",
        description: "Please try again",
        variant: "destructive"
      });
    } finally {
      setIsSearching(false);
    }
  };

  const commonLegalTerms = [
    'Affidavit', 'Bail', 'FIR', 'RTI', 'PIL', 
    'Writ Petition', 'Habeas Corpus', 'Civil Rights',
    'Consumer Rights', 'Fundamental Rights'
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Legal Dictionary</h2>
        <BackToHome />
      </div>

      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Book className="h-5 w-5" />
            Search Legal Terms
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter a legal term..."
                className="flex-1"
                onKeyDown={(e) => e.key === 'Enter' && searchLegalTerm()}
              />
              <Button onClick={searchLegalTerm} disabled={isSearching}>
                {isSearching ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
              </Button>
            </div>

            {/* Common Terms */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Common Legal Terms:</p>
              <div className="flex flex-wrap gap-2">
                {commonLegalTerms.map((term) => (
                  <Button
                    key={term}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchTerm(term);
                      searchLegalTerm();
                    }}
                  >
                    {term}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      <Card>
        <CardHeader>
          <CardTitle>Definition & Explanation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {isSearching ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : searchResult ? (
              <div className="prose prose-slate max-w-none">
                <pre className="whitespace-pre-wrap font-sans">
                  {searchResult}
                </pre>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Book className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Search results will appear here</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LegalDictionary;
