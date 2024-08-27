'use server'

import { stream } from "@/lib/ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

// Example usage for notifications
export async function streamContent(prompt: string) {
    return stream({
        model: openai('gpt-4o-mini'),
        system: 'You are a helpful assistant.',
        prompt: prompt,
        schema: z.object({
            content: z.string().describe('The content of the article'),
        }),
    });
}