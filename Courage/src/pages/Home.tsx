import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, FileText, Users, Mic, Scale, Heart, Camera } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from '@/components/LanguageSelector';
import QuestionSection from '../components/QuestionSection';

interface HomeProps {
  onNavigate: (page: 'chat' | 'document' | 'ngo' | 'ocr') => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const { t, language } = useLanguage();

  const features = [
    {
      icon: MessageCircle,
      title: t('askQuestion'),
      description: language === 'hi' ? 'अपनी भाषा में तुरंत कानूनी मार्गदर्शन प्राप्त करें' :
                   language === 'te' ? 'మీ భాషలో తక్షణ చట్టపరమైన మార్గదర్శకత్వం పొందండి' :
                   language === 'mr' ? 'तुमच्या भाषेत त्वरित कायदेशीर मार्गदर्शन मिळवा' :
                   'Get instant legal guidance in your language',
      action: () => onNavigate('chat'),
      color: 'text-[#153243]',
      bgColor: 'bg-[#153243]/10'
    },
    {
      icon: Camera,
      title: language === 'hi' ? 'दस्तावेज़ स्कैन करें' :
             language === 'te' ? 'డాక్యుమెంట్ స్కాన్ చేయండి' :
             language === 'mr' ? 'दस्तऐवज स्कॅन करा' :
             'Scan Document',
      description: language === 'hi' ? 'AI के साथ कानूनी दस्तावेज़ों को अपलोड और समझें' :
                   language === 'te' ? 'AI తో చట్టపరమైన పత్రాలను అప్‌లోడ్ చేసి వివరించండి' :
                   language === 'mr' ? 'AI सह कायदेशीर कागदपत्रे अपलोड करा आणि समजून घ्या' :
                   'Upload and explain legal documents with AI',
      action: () => onNavigate('ocr'),
      color: 'text-[#153243]',
      bgColor: 'bg-[#153243]/10'
    },
    {
      icon: FileText,
      title: t('documentGen'),
      description: language === 'hi' ? 'FIR, RTI और अन्य कानूनी दस्तावेज तैयार करें' :
                   language === 'te' ? 'FIR, RTI మరియు ఇతర చట్టపరమైన పత్రాలను తయారు చేయండి' :
                   language === 'mr' ? 'FIR, RTI आणि इतर कायदेशीर कागदपत्रे तयार करा' :
                   'Generate FIR, RTI and other legal documents',
      action: () => onNavigate('document'),
      color: 'text-[#284B63]',
      bgColor: 'bg-[#284B63]/10'
    },
    {
      icon: Users,
      title: t('ngoDirectory'),
      description: language === 'hi' ? 'अपने आस-पास की कानूनी सहायता संस्थाओं को खोजें' :
                   language === 'te' ? 'మీ సమీపంలోని న్యాయ సహాయ సంస్థలను కనుగొనండి' :
                   language === 'mr' ? 'तुमच्या जवळील कायदेशीर मदत संस्था शोधा' :
                   'Find legal aid organizations near you',
      action: () => onNavigate('ngo'),
      color: 'text-[#153243]',
      bgColor: 'bg-[#153243]/10'
    }
  ];

  return (
    <div className="min-h-screen bg-[#EEFCEB]">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="relative mb-12 rounded-3xl overflow-hidden bg-gradient-to-r from-[#153243] via-[#284B63] to-[#B4B8AB] p-12 text-[#F4F9E9]">
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
              className="hover:shadow-lg transition-all duration-300 cursor-pointer group bg-[#F4F9E9]"
              onClick={feature.action}
            >
              <CardHeader className="text-center pb-2">
                <div className={`w-16 h-16 rounded-full ${feature.bgColor} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                </div>
                <CardTitle className="text-lg text-[#153243]">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-[#284B63] mb-4">
                  {feature.description}
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full group-hover:bg-[#153243] group-hover:text-[#F4F9E9] transition-colors border-[#284B63]"
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Section */}
        <Card className="max-w-3xl mx-auto bg-[#F4F9E9]">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4 text-[#153243]">
              {language === 'hi' ? 'सभी के लिए न्याय' :
               language === 'te' ? 'అందరికీ న్యాయం' :
               language === 'mr' ? 'सर्वांसाठी न्याय' :
               'Justice for Everyone'}
            </h2>
            <p className="text-[#284B63] leading-relaxed">
              {language === 'hi' ? 'लेजिस्लेट AI आपकी भाषा में कानूनी सहायता प्रदान करता है। FIR दर्ज करने से लेकर RTI आवेदन तक, हम आपकी हर कानूनी जरूरत में मदद करते हैं।' :
language === 'te' ? 'లెజిస్లేట్ AI మీ భాషలో న్యాయ సహాయం అందిస్తుంది. FIR నమోదు చేయడం నుండి RTI దరఖాస్తు వరకు, మేము మీ ప్రతి చట్టపరమైన అవసరంలో సహాయం చేస్తాము.' :
language === 'mr' ? 'लेजिस्लेट AI तुमच्या भाषेत कायदेशीर मदत पुरवते. FIR नोंदणीपासून RTI अर्जापर्यंत, आम्ही तुमच्या प्रत्येक कायदेशीर गरजेत मदत करतो.' :
'Legislate AI provides legal assistance in your language. From filing FIR to RTI applications, we help with all your legal needs.'
  }
            </p>
          </CardContent>
        </Card>

        
      </div>
    </div>
  );
};

export default Home;