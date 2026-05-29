import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { sendChatMessage } from '@/services/openrouter';
import { useLanguage } from '@/contexts/LanguageContext';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Create conversation history for context
      const conversationHistory = [
        {
          role: 'system',
          content: language === 'hi' 
            ? 'आप एक विशेषज्ञ कानूनी सहायक हैं जो केवल भारतीय कानून और कानूनी मामलों में मदद करते हैं। आप केवल कानूनी प्रश्नों का उत्तर देंगे जैसे कि FIR, RTI, संपत्ति कानून, पारिवारिक कानून, श्रम कानून, उपभोक्ता अधिकार, और अन्य कानूनी विषय। यदि कोई गैर-कानूनी प्रश्न पूछा जाता है, तो विनम्रता से बताएं कि आप केवल कानूनी सहायता प्रदान करने के लिए डिज़ाइन किए गए हैं।'
            : language === 'te'
            ? 'మీరు భారతీయ చట్టం మరియు న్యాయ విషయాలలో మాత్రమే సహాయం చేసే నిపుణుడు న్యాయ సహాయకుడు. మీరు FIR, RTI, ఆస్తి చట్టం, కుటుంబ చట్టం, కార్మిక చట్టం, వినియోగదారు హక్కులు మరియు ఇతర చట్టపరమైన అంశాల వంటి న్యాయ ప్రశ్నలకు మాత్రమే సమాధానం ఇస్తారు. న్యాయేతర ప్రశ్న అడిగితే, మీరు చట్టపరమైన సహాయం అందించడానికి మాత్రమే రూపొందించబడ్డారని మర్యాదగా తెలియజేయండి.'
            : language === 'mr'
            ? 'तुम्ही केवळ भारतीय कायदा आणि कायदेशीर बाबींमध्ये मदत करणारे तज्ञ कायदेशीर सहाय्यक आहात. तुम्ही फक्त FIR, RTI, मालमत्ता कायदा, कौटुंबिक कायदा, कामगार कायदा, ग्राहक हक्क आणि इतर कायदेशीर विषयांसारख्या कायदेशीर प्रश्नांची उत्तरे द्याल. जर कोणी गैर-कायदेशीर प्रश्न विचारला तर नम्रपणे सांगा की तुम्ही फक्त कायदेशीर सहाय्य देण्यासाठी डिझाइन केलेले आहात.'
            : 'You are an expert legal assistant specializing exclusively in Indian law and legal matters. You will ONLY answer questions related to legal topics such as FIR, RTI, property law, family law, labor law, consumer rights, court procedures, legal documents, and other legal subjects. If a non-legal question is asked, politely inform the user that you are designed specifically to provide legal assistance only and cannot help with non-legal queries. Always maintain a professional and helpful tone while focusing strictly on legal matters.',
        },
        ...messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
        {
          role: 'user',
          content: userMessage.content,
        },
      ];

      const response = await sendChatMessage(conversationHistory);

      const assistantMessage: Message = {
        role: 'assistant',
        content: response,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: language === 'hi'
          ? 'क्षमा करें, एक त्रुटि हुई। कृपया पुनः प्रयास करें।'
          : language === 'te'
          ? 'క్షమించండి, ఒక లోపం సంభవించింది. దయచేసి మళ్లీ ప్రయత్నించండి.'
          : language === 'mr'
          ? 'माफ करा, एक त्रुटी झाली. कृपया पुन्हा प्रयत्न करा.'
          : 'Sorry, an error occurred. Please try again.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getPlaceholder = () => {
    switch (language) {
      case 'hi':
        return 'अपना सवाल यहाँ लिखें...';
      case 'te':
        return 'మీ ప్రశ్న ఇక్కడ రాయండి...';
      case 'mr':
        return 'तुमचा प्रश्न येथे लिहा...';
      default:
        return 'Type your message here...';
    }
  };

  const getTitle = () => {
    switch (language) {
      case 'hi':
        return 'कानूनी सहायक';
      case 'te':
        return 'న్యాయ సహాయకుడు';
      case 'mr':
        return 'कायदेशीर सहाय्यक';
      default:
        return 'Legal Assistant';
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto h-[600px] flex flex-col bg-[#F4F9E9]">
      <CardHeader className="border-b bg-gradient-to-r from-[#153243] to-[#284B63] text-[#F4F9E9]">
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-6 w-6" />
          {getTitle()}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-[#284B63] py-8">
              <Bot className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">
                {language === 'hi'
                  ? 'नमस्ते! मैं आपकी कानूनी सहायता के लिए यहाँ हूँ।'
                  : language === 'te'
                  ? 'నమస్కారం! నేను మీ న్యాయ సహాయం కోసం ఇక్కడ ఉన్నాను.'
                  : language === 'mr'
                  ? 'नमस्कार! मी तुमच्या कायदेशीर मदतीसाठी येथे आहे.'
                  : 'Hello! I am here to assist you with legal matters.'}
              </p>
              <p className="text-sm mt-2">
                {language === 'hi'
                  ? 'कोई भी सवाल पूछें...'
                  : language === 'te'
                  ? 'ఏదైనా ప్రశ్న అడగండి...'
                  : language === 'mr'
                  ? 'कोणताही प्रश्न विचारा...'
                  : 'Ask any question...'}
              </p>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-[#153243] flex items-center justify-center flex-shrink-0">
                  <Bot className="h-5 w-5 text-[#F4F9E9]" />
                </div>
              )}
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.role === 'user'
                    ? 'bg-[#153243] text-[#F4F9E9]'
                    : 'bg-white text-[#153243] border border-[#284B63]/20'
                }`}
              >
                <p className="whitespace-pre-wrap break-words">{message.content}</p>
              </div>
              {message.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-[#284B63] flex items-center justify-center flex-shrink-0">
                  <User className="h-5 w-5 text-[#F4F9E9]" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-[#153243] flex items-center justify-center flex-shrink-0">
                <Bot className="h-5 w-5 text-[#F4F9E9]" />
              </div>
              <div className="bg-white text-[#153243] border border-[#284B63]/20 rounded-lg p-3">
                <Loader2 className="h-5 w-5 animate-spin" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t p-4 bg-white">
          <div className="flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={getPlaceholder()}
              className="min-h-[60px] max-h-[120px] resize-none bg-[#F4F9E9] border-[#284B63]/20 focus:border-[#153243]"
              disabled={isLoading}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              className="bg-[#153243] hover:bg-[#284B63] text-[#F4F9E9] px-6"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
