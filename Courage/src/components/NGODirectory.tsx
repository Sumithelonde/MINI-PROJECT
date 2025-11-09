import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Phone, MessageCircle, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import ngoData from '@/data/ngos.json';

interface NGO {
  id: string;
  name: string;
  region: string;
  state: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  domains: string[];
  languages?: string[];
}

const NGODirectory: React.FC = () => {
  const [selectedState, setSelectedState] = useState<string>('all');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const { language, t } = useLanguage();

  // Provide default values for missing fields
  const ngos: NGO[] = (ngoData as NGO[]).map(ngo => ({
    ...ngo,
    whatsapp: ngo.whatsapp || "",
    email: ngo.email || "",
    languages: ngo.languages || ["en"], // Default to English if not provided
  }));

  // Get unique states and domains for filters
  const states = useMemo(() => {
    const uniqueStates = [...new Set(ngos.map(ngo => ngo.state))];
    return uniqueStates.sort();
  }, [ngos]);

  const domains = useMemo(() => {
    const allDomains = ngos.flatMap(ngo => ngo.domains);
    const uniqueDomains = [...new Set(allDomains)];
    return uniqueDomains.sort();
  }, [ngos]);

  // Filter NGOs based on selection and language support
  const filteredNGOs = useMemo(() => {
    return ngos.filter(ngo => {
      const stateMatch = selectedState === 'all' || ngo.state === selectedState;
      const domainMatch = selectedDomain === 'all' || ngo.domains.includes(selectedDomain);
      const languageMatch = ngo.languages?.includes(language);
      return stateMatch && domainMatch && languageMatch;
    });
  }, [ngos, selectedState, selectedDomain, language]);

  const handleWhatsAppContact = (ngo: NGO) => {
    if (!ngo.whatsapp) return;
    const message = encodeURIComponent(
      language === 'hi' ? `नमस्ते, मुझे कानूनी सहायता चाहिए। ${ngo.name} से संपर्क करना चाहता हूं।` :
      language === 'te' ? `నమస్కారం, నాకు న్యాయ సహాయం అవసరం. ${ngo.name} ని సంప్రదించాలనుకుంటున్నాను.` :
      language === 'mr' ? `नमस्कार, मला कायदेशीर मदत हवी आहे. ${ngo.name} शी संपर्क साधू इच्छितो.` :
      `Hello, I need legal assistance. Would like to contact ${ngo.name}.`
    );
    window.open(`https://wa.me/${ngo.whatsapp.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
  };

  return (
    <div className="flex flex-col items-center w-full px-4">
      {/* Header */}
      <div className="text-center space-y-2 w-full max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-foreground">{t('ngoDirectory')}</h2>
        <p className="text-muted-foreground">
          Find legal aid organizations in your region
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-4xl mx-auto mt-4">
        <div className="flex-1">
          <Select value={selectedState} onValueChange={setSelectedState}>
            <SelectTrigger>
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All States</SelectItem>
              {states.map(state => (
                <SelectItem key={state} value={state}>{state}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex-1">
          <Select value={selectedDomain} onValueChange={setSelectedDomain}>
            <SelectTrigger>
              <SelectValue placeholder="Select Domain" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Domains</SelectItem>
              {domains.map(domain => (
                <SelectItem key={domain} value={domain}>{domain}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-muted-foreground w-full max-w-4xl mx-auto mt-2">
        Showing {filteredNGOs.length} organizations that support {language.toUpperCase()}
      </div>

      {/* NGO Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl mx-auto mt-4 justify-items-stretch auto-rows-fr">
        {filteredNGOs.map((ngo) => (
          <Card key={ngo.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{ngo.name}</CardTitle>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {ngo.region}, {ngo.state}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Domains */}
              <div>
                <p className="text-sm font-medium mb-2">Specializations:</p>
                <div className="flex flex-wrap gap-1">
                  {ngo.domains.slice(0, 3).map((domain) => (
                    <Badge key={domain} variant="secondary" className="text-xs">
                      {domain}
                    </Badge>
                  ))}
                  {ngo.domains.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{ngo.domains.length - 3}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Contact options */}
              <div className="flex flex-col gap-2">
                {ngo.phone && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => window.open(`tel:${ngo.phone}`)}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </Button>
                )}
                {ngo.whatsapp && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-empowerment-green border-empowerment-green hover:bg-empowerment-green hover:text-white"
                    onClick={() => handleWhatsAppContact(ngo)}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp
                  </Button>
                )}
                {ngo.email && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => window.open(`mailto:${ngo.email}`)}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredNGOs.length === 0 && (
        <div className="text-center py-8 w-full max-w-4xl mx-auto">
          <p className="text-muted-foreground">
            No organizations found matching your criteria. Try adjusting the filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default NGODirectory;