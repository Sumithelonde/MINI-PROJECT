import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, FileText, Users, Mic, Scale, Heart, Camera } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from '@/components/LanguageSelector';

interface HomeProps {
  onNavigate: (page: 'chat' | 'document' | 'ngo' | 'ocr') => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const { t, language } = useLanguage();

  const features = [
    {
      icon: MessageCircle,
      title: t('askQuestion'),
      description: 'Get instant legal guidance in your language',
      action: () => onNavigate('chat'),
      color: 'text-trust-blue',
      bgColor: 'bg-trust-blue/10'
    },
    {
      icon: Mic,
      title: t('voiceInput'),
      description: 'Speak your legal questions naturally',
      action: () => onNavigate('chat'),
      color: 'text-justice-gold',
      bgColor: 'bg-justice-gold/10'
    },
    {
      icon: Camera,
      title: 'Scan Document',
      description: 'Upload and explain legal documents with AI',
      action: () => onNavigate('ocr'),
      color: 'text-empowerment-green',
      bgColor: 'bg-empowerment-green/10'
    },
    {
      icon: FileText,
      title: t('documentGen'),
      description: 'Generate FIR, RTI and other legal documents',
      action: () => onNavigate('document'),
      color: 'text-empowerment-green',
      bgColor: 'bg-empowerment-green/10'
    },
    {
      icon: Users,
      title: t('ngoDirectory'),
      description: 'Find legal aid organizations near you',
      action: () => onNavigate('ngo'),
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="relative mb-12 rounded-3xl overflow-hidden bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 p-12 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Legislate AI
              </h1>
              
              <p className="text-xl md:text-2xl mb-2 opacity-90">
                आपकी आवाज़ है आपका अधिकार
              </p>
              
              <p className="text-lg mb-8 opacity-80">
                कानूनी समस्याओं का समाधान • दस्तावेज़ निर्माण • विशेषज्ञ सहायता
              </p>
              
              <div className="flex justify-center">
                <LanguageSelector />
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="hover:shadow-lg transition-all duration-300 cursor-pointer group"
              onClick={feature.action}
            >
              <CardHeader className="text-center pb-2">
                <div className={`w-16 h-16 rounded-full ${feature.bgColor} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  {feature.description}
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Section */}
        <Card className="max-w-3xl mx-auto">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              {language === 'hi' ? 'सभी के लिए न्याय' :
               language === 'te' ? 'అందరికీ న్యాయం' :
               language === 'mr' ? 'सर्वांसाठी न्याय' :
               'Justice for Everyone'}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {language === 'hi' ? 'लवेबल AI आपकी भाषा में कानूनी सहायता प्रदान करता है। FIR दर्ज करने से लेकर RTI आवेदन तक, हम आपकी हर कानूनी जरूरत में मदद करते हैं।' :
               language === 'te' ? 'లవేబల్ AI మీ భాషలో న్యాయ సహాయం అందిస్తుంది. FIR నమోదు చేయడం నుండి RTI దరఖాస్తు వరకు, మేము మీ ప్రతి చట్టపరమైన అవసరంలో సహాయం చేస్తాము.' :
               language === 'mr' ? 'लवेबल AI तुमच्या भाषेत कायदेशीर मदत पुरवते. FIR नोंदणीपासून RTI अर्जापर्यंत, आम्ही तुमच्या प्रत्येक कायदेशीर गरजेत मदत करतो.' :
               'Lovable AI provides legal assistance in your language. From filing FIR to RTI applications, we help with all your legal needs.'}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;