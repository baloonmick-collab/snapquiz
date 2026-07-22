/**
 * OpenAI Service
 * Generates quiz questions using GPT-3.5-turbo
 */

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const OPENAI_ORG_ID = import.meta.env.VITE_OPENAI_ORG_ID;

if (!OPENAI_API_KEY) {
  console.warn('OpenAI API key not configured');
}

export interface GeneratedQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

class OpenAIService {
  private apiKey: string;
  private orgId?: string;
  private baseURL = 'https://api.openai.com/v1';

  constructor() {
    this.apiKey = OPENAI_API_KEY || '';
    this.orgId = OPENAI_ORG_ID;
  }

  private async callAPI(
    endpoint: string,
    method: string = 'POST',
    data?: any
  ) {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
    };

    if (this.orgId) {
      headers['OpenAI-Organization'] = this.orgId;
    }

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method,
      headers,
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`OpenAI API error: ${error.error.message}`);
    }

    return response.json();
  }

  async generateQuestions(
    category: string,
    topic: string,
    count: number = 5,
    difficulty: 'easy' | 'medium' | 'hard' = 'medium'
  ): Promise<GeneratedQuestion[]> {
    const prompt = `Generate ${count} multiple choice quiz questions about "${topic}" in the ${category} category with difficulty level ${difficulty}.

Return as JSON array with this format:
[
  {
    "question": "The question text?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": "The correct option text",
    "explanation": "Explanation of why this is correct",
    "difficulty": "${difficulty}"
  }
]

Make sure:
- All options are distinct and plausible
- The correct answer is actually in the options array
- Explanations are concise and educational
- Return ONLY valid JSON, no markdown or extra text`;

    const response = await this.callAPI('/chat/completions', 'POST', {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const content = response.choices[0].message.content;

    try {
      // Try to extract JSON from the response
      const jsonMatch = content.match(/\[\s*{[\s\S]*}\s*\]/);
      if (!jsonMatch) {
        throw new Error('No JSON array found in response');
      }
      const questions = JSON.parse(jsonMatch[0]);
      return questions;
    } catch (error) {
      console.error('Failed to parse OpenAI response:', content);
      throw new Error('Failed to parse generated questions');
    }
  }

  async generateQuizTopic(
    category: string
  ): Promise<string> {
    const response = await this.callAPI('/chat/completions', 'POST', {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `Suggest a single interesting quiz topic in the ${category} category. Return ONLY the topic name, no quotes or extra text.`,
        },
      ],
      temperature: 0.8,
      max_tokens: 50,
    });

    return response.choices[0].message.content.trim();
  }
}

export const openai = new OpenAIService();
export default openai;
