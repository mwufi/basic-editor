'use server';

import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';
import { stream } from '@/lib/ai';
import BasicOutlineSchema from '@/schemas/BasicOutline';

export async function getNotifications(input: string) {
    'use server';
    try {
        const { object: notifications } = await generateObject({
            model: openai('gpt-4o-mini'),
            system: 'You generate three notifications for a messages app.',
            prompt: input,
            schema: z.object({
                notifications: z.array(
                    z.object({
                        name: z.string().describe('Name of a fictional person.'),
                        message: z.string().describe('Do not use emojis or links.'),
                        minutesAgo: z.number(),
                    }),
                ),
            }),
        });

        return { notifications };
    } catch (error) {
        console.error('Error generating notifications:', error);
        return { error: 'Failed to generate notifications. Please try again.' };
    }
}

// Example usage for notifications
export async function streamOutline(system_prompt: string, prompt: string) {
    return stream({
        model: openai('gpt-4o-mini'),
        system: system_prompt,
        prompt: prompt,
        schema: BasicOutlineSchema,
    });
}