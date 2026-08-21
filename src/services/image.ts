/**
 * Image generation service
 * Supports Flux (via Hugging Face) and Stable Diffusion
 */

export interface ImageGenerationOptions {
  prompt: string;
  width?: number;
  height?: number;
  provider?: 'flux' | 'stable-diffusion';
}

export async function generateImage(options: ImageGenerationOptions): Promise<Buffer> {
  const provider = options.provider || 'flux';

  if (provider === 'flux') {
    return generateWithFlux(options.prompt, options.width, options.height);
  } else if (provider === 'stable-diffusion') {
    return generateWithStableDiffusion(options.prompt, options.width, options.height);
  } else {
    throw new Error(`Unknown provider: ${provider}`);
  }
}

/**
 * Generate with Flux via Hugging Face
 * Free tier available
 */
async function generateWithFlux(prompt: string, width = 1024, height = 1024): Promise<Buffer> {
  const token = process.env.HUGGINGFACE_API_KEY;
  if (!token) {
    throw new Error('HUGGINGFACE_API_KEY not set');
  }

  const response = await fetch('https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      inputs: prompt,
      parameters: {
        width,
        height,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Flux API error: ${response.statusText}`);
  }

  const buffer = await response.arrayBuffer();
  return Buffer.from(buffer);
}

/**
 * Generate with Stable Diffusion
 * Can run locally or via API
 */
async function generateWithStableDiffusion(prompt: string, width = 1024, height = 1024): Promise<Buffer> {
  const apiKey = process.env.STABLE_DIFFUSION_API_KEY;
  const endpoint = process.env.STABLE_DIFFUSION_ENDPOINT || 'http://localhost:7860';

  // Using Stable Diffusion API or local setup
  const response = await fetch(`${endpoint}/api/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(apiKey && { Authorization: `Bearer ${apiKey}` }),
    },
    body: JSON.stringify({
      prompt,
      width,
      height,
      steps: 30,
      cfg_scale: 7.5,
    }),
  });

  if (!response.ok) {
    throw new Error(`Stable Diffusion error: ${response.statusText}`);
  }

  const data = await response.json();
  // Assuming response contains base64 encoded image
  return Buffer.from(data.image, 'base64');
}
