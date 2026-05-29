const express = require('express');
const app = express();
const webhookRouter = require('./webhook');

app.use(express.json()); // Ensure JSON body parsing
app.use('/api', webhookRouter);

// The n8n webhook endpoint has been replaced with OpenRouter API integration
// Chatbot functionality is now handled directly in the frontend using OpenRouter API
// See: src/components/ChatInterface.tsx and src/services/openrouter.ts

module.exports = app;