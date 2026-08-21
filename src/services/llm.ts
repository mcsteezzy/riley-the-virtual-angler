import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

/**
 * Generate Riley's captions using Claude
 * Falls back to Ollama if Claude not available
 */
export async function generateCaption(prompt: string): Promise<string> {
  try {
    if (process.env.CLAUDE_API_KEY) {
      return await generateWithClaude(prompt);
    } else if (process.env.OLLAMA_BASE_URL) {
      return await generateWithOllama(prompt);
    } else {
      throw new Error('No LLM configured. Set CLAUDE_API_KEY or OLLAMA_BASE_URL');
    }
  } catch (error) {
    console.error('Error generating caption:', error);
    throw error;
  }
}

/**
 * Generate using Claude API
 */
async function generateWithClaude(prompt: string): Promise<string> {
  const response = await client.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1024,
    system: `You are Riley, a 25-year-old fly angler from the Pacific Northwest.

Your voice is authentic, slightly sarcastic, and never corporate. You speak like a real person.

Examples of your voice:
- "Got to the river at 6:15. Nothing moving yet. The Hatch says give it another hour before switching to dries. Guess we're waiting."
- "The fish apparently didn't get the memo that I had somewhere to be."
- "Everyone wants to know what fly I'm using. The river decides. I just listen."

Rules:
- Keep captions short and punchy
- Include specific details when relevant
- Show your thinking process
- Use The Hatch naturally (only if it makes sense)
- Be slightly self-deprecating
- Focus on the story, not the sale
- Use minimal emojis (0-2 max)
- Write like you're texting a friend, not a brand`,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  const content = response.content[0];
  if (content.type === 'text') {
    return content.text.trim();
  }

  throw new Error('Unexpected response type from Claude');
}

/**
 * Generate using local Ollama
 */
async function generateWithOllama(prompt: string): Promise<string> {
  const baseUrl = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
  const model = process.env.OLLAMA_MODEL || 'mistral';

  const response = await fetch(`${baseUrl}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model,
      prompt,
      stream: false,
      system: `You are Riley, a 25-year-old fly angler from the Pacific Northwest. Write authentic, slightly sarcastic captions. Keep them short and punchy.`,
    }),
  });

  if (!response.ok) {
    throw new Error(`Ollama API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.response.trim();
}

/**
 * Generate an image prompt for Flux/Stable Diffusion
 * Takes a high-level description and converts it to a detailed image prompt
 */
export async function generateImagePrompt(description: string): Promise<string> {
  const prompt = `Convert this concept into a detailed, professional outdoor photography prompt for image generation.

Concept: ${description}

Return ONLY the image prompt. Make it detailed enough for high-quality generation:
- Include lighting conditions (golden hour, overcast, etc.)
- Specify Riley's appearance and what she's wearing
- Describe the environment in detail
- Include photographic style (Patagonia catalog style, documentary photography)
- Emphasize authenticity and realism

Example: "A 25-year-old woman with light freckles and slightly messy brunette hair, wearing a worn fishing vest and waders, standing waist-deep in a clear mountain stream at golden hour. Holding a fly rod mid-cast. Morning mist over the water. Rugged beauty, professional outdoor photography style, real and unfiltered."`;

  return generateCaption(prompt);
}
