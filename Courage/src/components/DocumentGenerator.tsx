import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Download, MessageCircle, FileText, Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { sendChatMessage } from '@/services/openrouter';
import { downloadPDF, sharePDFOnWhatsApp, type DocumentData } from '@/utils/pdfGenerator';

type DocumentType = 'FIR' | 'RTI';

const DocumentGenerator: React.FC = () => {
  const [documentType, setDocumentType] = useState<DocumentType>('FIR');
  const [description, setDescription] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: '',
    address: '',
    phone: ''
  });
  
  const { language, t } = useLanguage();
  const { toast } = useToast();

  const documentTypeLabels = {
    en: { FIR: 'FIR (First Information Report)', RTI: 'RTI (Right to Information)' },
    hi: { FIR: 'प्राथमिकी (FIR)', RTI: 'सूचना का अधिकार (RTI)' },
    te: { FIR: 'ప్రాథమిక నివేదిక (FIR)', RTI: 'సమాచార హక్కు (RTI)' },
    mr: { FIR: 'प्राथमिक अहवाल (FIR)', RTI: 'माहिती अधिकार (RTI)' }
  };

  const generateDocument = async () => {
    if (!description.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide a description of your issue.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);

    try {
      const prompt = `Generate a formal ${documentType} document in ${language === 'en' ? 'English' : language === 'hi' ? 'Hindi' : language === 'te' ? 'Telugu' : 'Marathi'} based on the following issue description. Make it official, properly formatted, and include all necessary legal sections:

Issue Description: ${description}

Please create a complete ${documentType} document that follows Indian legal format and requirements. Include proper sections, formal language, and all necessary details that would be required by authorities.`;

      const response = await sendChatMessage([
        { role: 'user', content: prompt }
      ]);

      setGeneratedContent(response);
      
      toast({
        title: "Document generated",
        description: `Your ${documentType} has been prepared successfully.`
      });
    } catch (error) {
      console.error('Document generation error:', error);
      toast({
        title: "Generation failed",
        description: error instanceof Error ? error.message : "Failed to generate document. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generatedContent) return;

    const documentData: DocumentData = {
      type: documentType,
      content: generatedContent,
      userDetails: {
        name: userDetails.name || undefined,
        address: userDetails.address || undefined,
        phone: userDetails.phone || undefined
      },
      language
    };

    downloadPDF(documentData);
    
    toast({
      title: "Download started",
      description: "Your document is being downloaded."
    });
  };

  const handleWhatsAppShare = () => {
    if (!generatedContent) return;

    const documentData: DocumentData = {
      type: documentType,
      content: generatedContent,
      language
    };

    sharePDFOnWhatsApp(documentData);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">{t('documentGen')}</h2>
        <p className="text-muted-foreground">
          Generate legal documents with AI assistance
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Document Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Document Type */}
            <div className="space-y-2">
              <Label>Document Type</Label>
              <Select value={documentType} onValueChange={(value: DocumentType) => setDocumentType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FIR">{documentTypeLabels[language].FIR}</SelectItem>
                  <SelectItem value="RTI">{documentTypeLabels[language].RTI}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Issue Description */}
            <div className="space-y-2">
              <Label>Describe Your Issue</Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={
                  language === 'hi' ? 'अपनी समस्या का विस्तार से वर्णन करें...' :
                  language === 'te' ? 'మీ సమస్యను వివరంగా వివరించండి...' :
                  language === 'mr' ? 'तुमच्या समस्येचे तपशीलवार वर्णन करा...' :
                  'Describe your issue in detail...'
                }
                rows={6}
                className="resize-none"
              />
            </div>

            {/* User Details */}
            <div className="space-y-3">
              <Label>Your Details (Optional)</Label>
              <Input
                value={userDetails.name}
                onChange={(e) => setUserDetails({...userDetails, name: e.target.value})}
                placeholder="Full Name"
              />
              <Input
                value={userDetails.phone}
                onChange={(e) => setUserDetails({...userDetails, phone: e.target.value})}
                placeholder="Phone Number"
              />
              <Textarea
                value={userDetails.address}
                onChange={(e) => setUserDetails({...userDetails, address: e.target.value})}
                placeholder="Address"
                rows={2}
              />
            </div>

            <Button 
              onClick={generateDocument}
              disabled={isGenerating || !description.trim()}
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <FileText className="h-4 w-4 mr-2" />
                  {t('generateDocument')}
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Generated Document Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Document Preview</CardTitle>
          </CardHeader>
          <CardContent>
            {generatedContent ? (
              <div className="space-y-4">
                <div className="max-h-96 overflow-y-auto p-4 bg-muted/50 rounded-lg">
                  <pre className="whitespace-pre-wrap text-sm font-mono">
                    {generatedContent}
                  </pre>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    onClick={handleDownload}
                    variant="outline"
                    className="flex-1"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    {t('downloadPDF')}
                  </Button>
                  
                  <Button 
                    onClick={handleWhatsAppShare}
                    variant="outline"
                    className="flex-1 text-empowerment-green border-empowerment-green hover:bg-empowerment-green hover:text-white"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    {t('shareWhatsApp')}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Generated document will appear here</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DocumentGenerator;