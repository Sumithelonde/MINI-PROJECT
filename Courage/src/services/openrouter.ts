import axios from 'axios';

const OPENROUTER_API_KEY = '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';
const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatResponse {
  choices: {
    message: {
      content: string;
      role: string;
    };
  }[];
}

export const sendChatMessage = async (
  messages: ChatMessage[],
  model: string = 'mistralai/mistral-7b-instruct'
): Promise<string> => {
  try {
    const response = await axios.post<ChatResponse>(
      `${OPENROUTER_BASE_URL}/chat/completions`,
      {
        model,
        messages,
        max_tokens: 1000,
        temperature: 0.7,
        stream: false
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Lovable AI - Legal Assistant'
        }
      }
    );

    if (response.data?.choices?.[0]?.message?.content) {
      return response.data.choices[0].message.content.trim();
    } else {
      throw new Error('Invalid response format from OpenRouter API');
    }
  } catch (error) {
    console.error('OpenRouter API Error:', error);
    
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('API key is invalid or expired');
      } else if (error.response?.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else if (error.response?.status >= 500) {
        throw new Error('Server error. Please try again later.');
      } else {
        throw new Error(`API request failed: ${error.response?.data?.message || error.message}`);
      }
    }
    
    throw new Error('Failed to connect to AI service');
  }
};

// Available models - can be expanded based on OpenRouter offerings
export const AVAILABLE_MODELS = {
  'mistralai/mistral-7b-instruct': 'Mistral 7B (Fast)',
  'openai/gpt-3.5-turbo': 'GPT-3.5 Turbo',
  'anthropic/claude-3-haiku': 'Claude 3 Haiku',
  'google/gemma-7b-it': 'Gemma 7B'
} as const;

export type ModelKey = keyof typeof AVAILABLE_MODELS;