// ==========================================
// AI Service (Gemini & NVIDIA NIM)
// ==========================================

import type { AIAnalysis, VegType, UrgencyLevel } from '@/lib/types';
import { isDemoMode } from '@/lib/utils';

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const NVIDIA_API_KEY = process.env.NEXT_PUBLIC_NVIDIA_API_KEY;
const AI_PROVIDER = process.env.NEXT_PUBLIC_AI_PROVIDER || 'gemini';

const GEMINI_VISION_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
const NVIDIA_NIM_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';

export async function analyzeFoodImage(imageBase64: string): Promise<AIAnalysis> {
  if (isDemoMode() && !NVIDIA_API_KEY?.startsWith('nvapi-')) {
    return getDemoAnalysis();
  }

  if (AI_PROVIDER === 'nvidia') {
    return analyzeWithNvidia(imageBase64);
  }

  return analyzeWithGemini(imageBase64);
}

async function analyzeWithNvidia(imageBase64: string): Promise<AIAnalysis> {
  try {
    const response = await fetch(NVIDIA_NIM_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${NVIDIA_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'nvidia/llama-3.2-11b-vision-instruct',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Analyze this food image for a food rescue platform. Return a JSON object with:
                - foodType: string (name of the food)
                - estimatedQuantity: string (e.g. "25 plates", "10 kg")
                - vegClassification: "veg" | "non-veg" | "mixed"
                - urgencyEstimate: "critical" | "high" | "medium" | "low"
                - freshness: string (e.g. "Fresh - 2 hours shelf life")
                - tags: string[] (relevant tags like "indian", "rice", "curry")
                - confidence: number (0-100)
                - summary: string (one-line summary like "25 plates of fresh biryani, high urgency")
                Return ONLY the JSON object, no markdown.`
              },
              {
                type: 'image_url',
                image_url: { url: `data:image/jpeg;base64,${imageBase64}` },
              },
            ],
          },
        ],
        max_tokens: 1024,
        temperature: 0.2,
      }),
    });

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || '';
    const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    return JSON.parse(cleaned) as AIAnalysis;
  } catch (error) {
    console.error('NVIDIA AI analysis failed:', error);
    return getDemoAnalysis();
  }
}

async function analyzeWithGemini(imageBase64: string): Promise<AIAnalysis> {
  try {
    const response = await fetch(GEMINI_VISION_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [
            {
              text: `Analyze this food image for a food rescue platform. Return a JSON object with:
              - foodType: string (name of the food)
              - estimatedQuantity: string (e.g. "25 plates", "10 kg")
              - vegClassification: "veg" | "non-veg" | "mixed"
              - urgencyEstimate: "critical" | "high" | "medium" | "low"
              - freshness: string (e.g. "Fresh - 2 hours shelf life")
              - tags: string[] (relevant tags like "indian", "rice", "curry")
              - confidence: number (0-100)
              - summary: string (one-line summary like "25 plates of fresh biryani, high urgency")
              Return ONLY the JSON object, no markdown.`
            },
            {
              inlineData: {
                mimeType: 'image/jpeg',
                data: imageBase64,
              }
            }
          ]
        }],
        generationConfig: { temperature: 0.1, maxOutputTokens: 1024 }
      }),
    });

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    return JSON.parse(cleaned) as AIAnalysis;
  } catch (error) {
    console.error('Gemini AI analysis failed:', error);
    return getDemoAnalysis();
  }
}

function getDemoAnalysis(): AIAnalysis {
  const foods = [
    {
      foodType: 'Vegetable Biryani',
      estimatedQuantity: '25 plates',
      vegClassification: 'veg' as VegType,
      urgencyEstimate: 'high' as UrgencyLevel,
      freshness: 'Fresh — best before 45 minutes',
      tags: ['indian', 'rice', 'biryani', 'spicy', 'lunch'],
      confidence: 94,
      summary: '25 plates of fresh vegetable biryani detected. High urgency — expires in 45 mins.',
    },
    {
      foodType: 'Paneer Butter Masala with Naan',
      estimatedQuantity: '30 servings',
      vegClassification: 'veg' as VegType,
      urgencyEstimate: 'medium' as UrgencyLevel,
      freshness: 'Fresh — 2 hours shelf life',
      tags: ['indian', 'paneer', 'curry', 'naan', 'dinner'],
      confidence: 91,
      summary: '30 servings of paneer butter masala with naan. Medium urgency — 2 hours remaining.',
    },
    {
      foodType: 'Mixed Rice & Dal Combo',
      estimatedQuantity: '40 portions',
      vegClassification: 'veg' as VegType,
      urgencyEstimate: 'high' as UrgencyLevel,
      freshness: 'Fresh — 1 hour shelf life',
      tags: ['indian', 'rice', 'dal', 'wholesome', 'lunch'],
      confidence: 88,
      summary: '40 portions of rice and dal combo. High urgency — 1 hour remaining.',
    },
  ];
  return foods[Math.floor(Math.random() * foods.length)];
}

export async function generateAIInsights(data: Record<string, unknown>): Promise<string> {
  if (isDemoMode() && !NVIDIA_API_KEY?.startsWith('nvapi-')) {
    return 'Peak donation hours: 1PM-3PM. Recommend expanding NGO coverage. 23% increase in efficiency this week.';
  }

  if (AI_PROVIDER === 'nvidia') {
    try {
      const response = await fetch(NVIDIA_NIM_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${NVIDIA_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'meta/llama-3.1-405b-instruct',
          messages: [{ role: 'user', content: `As an AI analyst for a food rescue platform, analyze this data and provide 3 actionable insights: ${JSON.stringify(data)}` }],
        }),
      });
      const result = await response.json();
      return result.choices?.[0]?.message?.content || 'Analysis in progress...';
    } catch { return 'AI insights temporarily unavailable.'; }
  }

  try {
    const response = await fetch(GEMINI_VISION_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `As an AI analyst for a food rescue platform, provide 3 actionable insights for: ${JSON.stringify(data)}` }] }],
      }),
    });
    const result = await response.json();
    return result.candidates?.[0]?.content?.parts?.[0]?.text || 'Analysis in progress...';
  } catch { return 'AI insights temporarily unavailable.'; }
}
