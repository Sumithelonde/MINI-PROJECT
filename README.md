# ⚖️ COURAGE AI — Legislate AI

### AI-Powered Multilingual Legal Assistance Platform for India

> **आपकी आवाज़ है आपका अधिकार — Your Voice is Your Right**

COURAGE AI, presented through **Legislate AI**, is an AI-powered legal assistance platform designed to make basic legal information, document understanding, and legal resources more accessible to people across India.

The platform combines **Artificial Intelligence, multilingual interaction, OCR, automated legal document generation, translation, authentication, and legal-aid discovery** within a single web application.

Its goal is simple:

**Reduce the complexity of accessing and understanding legal information.**

---

## 📌 Overview

Legal information can often be difficult to understand because of:

- Complex legal terminology
- Language barriers
- Difficulty drafting formal documents
- Limited awareness of legal rights
- Difficulty locating legal-aid organizations
- Complicated government and legal procedures

COURAGE AI addresses these challenges through a user-friendly platform where users can:

- Ask legal questions using an AI assistant
- Generate FIR and RTI drafts
- Scan and understand legal documents
- Translate legal text into Indian languages
- Search legal terminology
- Discover NGOs and legal-aid organizations
- Download or share generated legal documents

---

# ✨ Key Features

## 🤖 1. AI Legal Assistant

An interactive AI-powered assistant focused on **Indian legal topics**.

Users can ask questions related to areas such as:

- FIR procedures
- RTI
- Consumer rights
- Property law
- Family law
- Labour law
- Court procedures
- Legal documents
- General legal rights

The assistant maintains conversational context and provides responses according to the selected language.

### Supported conversational languages

- English
- हिंदी — Hindi
- मराठी — Marathi
- తెలుగు — Telugu

---

## 📄 2. AI Legal Document Generator

COURAGE AI simplifies the preparation of common legal documents.

Currently supported documents include:

### FIR — First Information Report

Users can provide information such as:

- Incident description
- Personal details
- Location
- Contact information
- Witness information
- Available evidence

The AI converts the information into a structured FIR-style document.

### RTI — Right to Information

Users can describe the information they want from a government authority and receive a structured RTI application draft.

Generated documents can be:

- Previewed
- Downloaded as PDF
- Shared through WhatsApp

---

## 📷 3. Legal Document Scanner & AI Explainer

Understanding legal documents can be challenging.

COURAGE AI integrates **OCR — Optical Character Recognition** to extract text from uploaded legal documents.

### Supported inputs

- PNG
- JPG / JPEG
- PDF

OCR is powered by **Tesseract.js**.

After extracting the text, the AI can explain the document in simpler language so users can better understand its meaning.

### OCR language support includes

- English
- Hindi
- Marathi
- Telugu
- Kannada

Users can also:

- Download the AI explanation
- Generate a PDF
- Share the explanation through WhatsApp

---

## 🌐 4. Multilingual Legal Document Translator

Legal documents can be translated while attempting to preserve:

- Original formatting
- Legal terminology
- Proper nouns
- Paragraph structure
- Context

### Translation languages

| Language | Native Name |
|---|---|
| English | English |
| Hindi | हिंदी |
| Marathi | मराठी |
| Telugu | తెలుగు |
| Gujarati | ગુજરાતી |
| Bengali | বাংলা |
| Tamil | தமிழ் |
| Kannada | ಕನ್ನಡ |

This feature helps users access legal information in languages they are more comfortable reading.

---

## 📚 5. Legal Dictionary

COURAGE AI includes a searchable **Legal Dictionary** for understanding commonly used legal terminology.

Users can search legal terms and explore their meanings without needing to navigate complex legal resources.

This is particularly useful for:

- Students
- Citizens
- First-time legal-service users
- People reading government documents
- Users unfamiliar with legal terminology

---

## 🤝 6. NGO & Legal-Aid Directory

The platform includes a dedicated directory for discovering NGOs and support organizations.

Organizations can be searched and filtered using:

- Name
- State
- Region
- Area of work / domain

Available organization information may include:

- Phone number
- Email
- Website
- Region
- State
- Supported languages
- Areas of assistance

Users can directly initiate contact where contact information is available.

---

## 🔐 7. User Authentication

Authentication is integrated using **Clerk**.

The application supports:

- Secure sign-in
- User sessions
- User account controls
- Sign-out functionality

This provides a foundation for future personalized legal services and user-specific features.

---

## 🌙 8. Modern Responsive Interface

COURAGE AI provides a responsive interface designed for accessibility across different devices.

The interface includes:

- Responsive layouts
- Light / dark theme support
- Mobile-friendly components
- Interactive notifications
- Multilingual UI
- Loading states
- Accessible form components

---

# 🏗️ System Architecture

```text
                        ┌──────────────────────┐
                        │        User          │
                        └──────────┬───────────┘
                                   │
                                   ▼
                     ┌─────────────────────────┐
                     │   React + TypeScript    │
                     │      Vite Frontend      │
                     └────────────┬────────────┘
                                  │
             ┌────────────────────┼────────────────────┐
             │                    │                    │
             ▼                    ▼                    ▼
      ┌────────────┐      ┌──────────────┐      ┌──────────────┐
      │   Clerk    │      │ AI / LLM API │      │ Tesseract.js │
      │    Auth    │      │ Integration  │      │     OCR      │
      └────────────┘      └───────┬──────┘      └──────┬───────┘
                                  │                    │
                                  ▼                    ▼
                        ┌─────────────────┐    ┌────────────────┐
                        │ Legal Assistant │    │ Document Text  │
                        │ FIR / RTI       │    │ Extraction     │
                        │ Translation     │    └────────────────┘
                        │ Explanation     │
                        └────────┬────────┘
                                 │
                                 ▼
                      ┌────────────────────┐
                      │ PDF / WhatsApp     │
                      │ Export & Sharing   │
                      └────────────────────┘
```

---

# 🧠 Application Workflow

```text
User
 │
 ▼
COURAGE AI
 │
 ├── Ask Legal Question
 │       └── AI Legal Assistant
 │
 ├── Generate Legal Document
 │       ├── FIR
 │       └── RTI
 │              └── PDF / WhatsApp
 │
 ├── Upload Legal Document
 │       └── OCR
 │            └── Extract Text
 │                 └── AI Explanation
 │
 ├── Translate Legal Document
 │       └── Multilingual AI Translation
 │
 ├── Search Legal Dictionary
 │       └── Legal Terms & Definitions
 │
 └── Find Legal Assistance
         └── NGO / Legal Aid Directory
```

---

# 🛠️ Technology Stack

| Category | Technology |
|---|---|
| Frontend | React 18 |
| Language | TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui + Radix UI |
| Authentication | Clerk |
| AI Integration | OpenRouter-compatible LLM integration |
| OCR | Tesseract.js |
| PDF Generation | jsPDF |
| State / Data | React Query |
| Routing | React Router |
| Forms | React Hook Form |
| Validation | Zod |
| Icons | Lucide React |
| Charts | Recharts |
| Backend Utility Layer | Node.js + Express |
| Sharing | WhatsApp Web Integration |

---

# 📂 Project Structure

```text
Mini_Project_Courage/
│
├── README.md
│
└── Courage/
    │
    ├── public/
    │
    ├── server/
    │   ├── app.js
    │   └── webhook.js
    │
    ├── src/
    │   │
    │   ├── components/
    │   │   ├── ChatInterface.tsx
    │   │   ├── DocumentGenerator.tsx
    │   │   ├── DocumentTranslator.tsx
    │   │   ├── LegalDictionary.tsx
    │   │   ├── NGODirectory.tsx
    │   │   ├── OCRScanner.tsx
    │   │   ├── LanguageSelector.tsx
    │   │   ├── ThemeToggle.tsx
    │   │   └── ui/
    │   │
    │   ├── contexts/
    │   │   └── LanguageContext.tsx
    │   │
    │   ├── data/
    │   │   └── ngos.json
    │   │
    │   ├── hooks/
    │   ├── lib/
    │   ├── pages/
    │   │   ├── Home.tsx
    │   │   ├── Index.tsx
    │   │   ├── Dictionary.tsx
    │   │   ├── Translator.tsx
    │   │   └── NotFound.tsx
    │   │
    │   ├── utils/
    │   ├── App.tsx
    │   └── main.tsx
    │
    ├── package.json
    ├── vite.config.ts
    ├── tailwind.config.ts
    └── tsconfig.json
```

---

# 🚀 Getting Started

## Prerequisites

Install the following before running the project:

- Node.js 18+
- npm
- Clerk account
- AI API credentials required by the configured AI service

---

## 1. Clone the Repository

```bash
git clone <repository-url>
cd Mini_Project_Courage/Courage
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Configure Environment Variables

Create a `.env` file inside the `Courage` directory.

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

# Add the AI/OpenRouter credentials required
# by your AI service implementation.
```

> Never commit API keys, tokens, or other private credentials to Git.

---

## 4. Start the Development Server

```bash
npm run dev
```

Vite will display the local development address in your terminal.

---

## 5. Build for Production

```bash
npm run build
```

---

## 6. Preview Production Build

```bash
npm run preview
```

---

# 💡 Example Use Cases

### Legal Question

```text
User:
My employer has not paid my salary for two months.
What legal options do I have?

COURAGE AI:
Provides relevant general legal guidance based on Indian law.
```

### FIR Generation

```text
User provides:
Incident + Date + Location + Personal Details

             ↓

COURAGE AI

             ↓

Structured FIR Draft

             ↓

Preview → PDF → Share
```

### Document Understanding

```text
Legal Document
       ↓
Upload Image / PDF
       ↓
Tesseract OCR
       ↓
Extracted Text
       ↓
AI Explanation
       ↓
Simplified Understanding
```

---

# 🎯 Project Motivation

India has a diverse population with hundreds of millions of citizens interacting with legal and government systems across multiple languages.

Technology can help reduce barriers such as:

```text
Complex Legal Language
        +
Language Barriers
        +
Limited Awareness
        +
Difficulty Finding Assistance
        ↓
      COURAGE AI
        ↓
Accessible Legal Information
```

COURAGE AI explores how **AI + multilingual computing + OCR + accessible web technologies** can make basic legal information easier to access.

---

# 🔮 Future Enhancements

Planned opportunities for extending the project include:

- Retrieval-Augmented Generation using verified Indian legal sources
- Citation-backed legal answers
- Indian Penal Code / BNS section retrieval
- Constitution and case-law search
- Voice-based legal interaction
- Speech-to-text for Indian languages
- Text-to-speech responses
- Lawyer discovery
- Location-aware legal-aid recommendations
- Personalized legal-document history
- Secure cloud document storage
- More legal-document templates
- Court and case-status integrations
- Stronger privacy controls
- PWA/mobile application
- Improved OCR for handwritten documents
- Verification and ranking of legal-aid organizations

---

# 🔒 Security & Privacy

Legal information can contain highly sensitive personal information.

A production version of COURAGE AI should therefore:

- Never expose API secrets in frontend code
- Never commit `.env` files
- Use backend APIs for confidential credentials
- Encrypt sensitive information
- Minimize storage of legal documents
- Implement secure authentication
- Use HTTPS
- Validate uploaded files
- Sanitize user input
- Provide clear data-retention controls

---

# ⚠️ Legal Disclaimer

**COURAGE AI is an educational and informational technology project.**

The information generated by the platform should **not be treated as professional legal advice or as a substitute for consultation with a qualified legal professional**.

AI-generated legal information may contain errors, omissions, or outdated information.

For serious legal matters, users should consult:

- A qualified advocate
- An authorized legal-aid organization
- Relevant government authorities
- Appropriate courts or law-enforcement agencies

---

# 👨‍💻 Developer

## Sumit Helonde

**B.Tech — Computer Science & Business Systems**

Areas of Interest:

`Artificial Intelligence` • `Machine Learning` • `Generative AI` • `Full-Stack Development` • `RAG Systems` • `Automation` • `Accessibility Technology`

---

# 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

A standard contribution workflow is:

```bash
# Fork the repository

# Create a feature branch
git checkout -b feature/new-feature

# Commit your changes
git commit -m "feat: add new feature"

# Push the branch
git push origin feature/new-feature

# Open a Pull Request
```

Possible contribution areas include:

- Legal-resource datasets
- UI/UX improvements
- Translation quality
- Accessibility
- OCR improvements
- Legal document templates
- AI prompting and retrieval
- Security improvements

---

# ⭐ Support the Project

If you find COURAGE AI useful or interesting:

**⭐ Star the repository**

**🍴 Fork the project**

**🤝 Contribute improvements**

**💡 Suggest new features**

---

<div align="center">

## ⚖️ COURAGE AI

### Making Legal Information More Accessible Through AI

**AI • LegalTech • Multilingual Computing • OCR • Accessibility**

### आपकी आवाज़ है आपका अधिकार

</div>
