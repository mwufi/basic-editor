'use server';

import { z } from 'zod';
import { stream } from '@/lib/ai';
import { openai } from '@ai-sdk/openai';

export async function streamZodSchema(input: string) {
    return stream({
        model: openai('gpt-4o-mini'),
        system: 'You are a helpful assistant that generates Zod schemas based on input descriptions.',
        prompt: `Generate a Zod schema for the following description:\n\n${input}`,
        schema: z.object({
            zodSchema: z.string().describe('The generated Zod schema as a string'),
        }),
    });
}