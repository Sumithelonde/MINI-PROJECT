const express = require('express');
const app = express();
const webhookRouter = require('./webhook');
const axios = require('axios'); // Add this at the top

app.use(express.json()); // Ensure JSON body parsing
app.use('/api', webhookRouter);

// Endpoint to send data to the external webhook URL
app.post('/api/send-webhook', async (req, res) => {
    try {
        const payload = req.body;
        const webhookUrl = 'https://sumithelonde.app.n8n.cloud/webhook/86816cfb-edb3-41c2-a959-b5c72a110eb6/chat';

        // Send POST request to the webhook URL
        const response = await axios.post(webhookUrl, payload);

        res.status(200).json({ message: 'Webhook sent', data: response.data });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send webhook', details: error.message });
    }
});

module.exports = app;