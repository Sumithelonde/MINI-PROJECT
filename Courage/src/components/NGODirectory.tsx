import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Phone, Mail, Globe, Heart, Home, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ngosData from '@/data/ngos.json';

interface NGO {
  id: string;
  name: string;
  state: string;
  region: string;
  phone?: string;
  email?: string;
  website?: string;
  whatsapp?: string;
  domains: string[];
  languages: string[];
}

const NGODirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('all');
  const [selectedDomain, setSelectedDomain] = useState('all');
  const navigate = useNavigate();

  const ngos: NGO[] = ngosData;

  // Extract unique states and domains
  const states = ['all', ...Array.from(new Set(ngos.map(ngo => ngo.state)))];
  const allDomains = Array.from(new Set(ngos.flatMap(ngo => ngo.domains)));
  const domains = ['all', ...allDomains];

  const filteredNGOs = ngos.filter(ngo => {
    const matchesSearch = 
      ngo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ngo.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ngo.domains.some(domain => domain.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesState = selectedState === 'all' || ngo.state === selectedState;
    const matchesDomain = selectedDomain === 'all' || ngo.domains.includes(selectedDomain);
    
    return matchesSearch && matchesState && matchesDomain;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">NGO Directory</h2>
        <Button variant="outline" size="sm" onClick={() => navigate('/')}>
          <Home className="h-4 w-4 mr-2" />
          Home
        </Button>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Find NGOs & Support Organizations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, region, or domain..."
                className="flex-1"
              />
              <Button>
                <Search className="h-4 w-4" />
              </Button>
            </div>

            {/* State Filter */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter by State:
              </p>
              <div className="flex flex-wrap gap-2">
                {states.map((state) => (
                  <Button
                    key={state}
                    variant={selectedState === state ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedState(state)}
                  >
                    {state === 'all' ? 'All States' : state}
                  </Button>
                ))}
              </div>
            </div>

            {/* Domain Filter */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Filter by Domain:</p>
              <div className="flex flex-wrap gap-2">
                {domains.slice(0, 10).map((domain) => (
                  <Button
                    key={domain}
                    variant={selectedDomain === domain ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedDomain(domain)}
                  >
                    {domain === 'all' ? 'All Domains' : domain}
                  </Button>
                ))}
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              Showing {filteredNGOs.length} of {ngos.length} NGOs
            </div>
          </div>
        </CardContent>
      </Card>

      {/* NGO List */}
      <div className="grid gap-4 md:grid-cols-2">
        {filteredNGOs.length > 0 ? (
          filteredNGOs.map((ngo) => (
            <Card key={ngo.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{ngo.name}</CardTitle>
                <div className="flex flex-wrap gap-2 mt-2">
                  {ngo.domains.map((domain, idx) => (
                    <span 
                      key={idx}
                      className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                    >
                      {domain}
                    </span>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span>{ngo.region}, {ngo.state}</span>
                  </div>
                  
                  {ngo.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <a 
                        href={`tel:${ngo.phone.split('/')[0].trim()}`} 
                        className="hover:underline text-blue-600"
                      >
                        {ngo.phone}
                      </a>
                    </div>
                  )}
                  
                  {ngo.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <a 
                        href={`mailto:${ngo.email}`} 
                        className="hover:underline text-blue-600 break-all"
                      >
                        {ngo.email}
                      </a>
                    </div>
                  )}
                  
                  {ngo.website && (
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <a 
                        href={`https://${ngo.website}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:underline text-blue-600 break-all"
                      >
                        {ngo.website}
                      </a>
                    </div>
                  )}
                </div>

                {(ngo.phone || ngo.email) && (
                  <div className="flex gap-2 mt-4">
                    {ngo.phone && (
                      <Button 
                        className="flex-1" 
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(`tel:${ngo.phone?.split('/')[0].trim()}`)}
                      >
                        <Phone className="h-3 w-3 mr-1" />
                        Call
                      </Button>
                    )}
                    {ngo.email && (
                      <Button 
                        className="flex-1" 
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(`mailto:${ngo.email}`)}
                      >
                        <Mail className="h-3 w-3 mr-1" />
                        Email
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-2 text-center py-12 text-muted-foreground">
            <Heart className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">No NGOs found</p>
            <p className="text-sm mt-2">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NGODirectory;
