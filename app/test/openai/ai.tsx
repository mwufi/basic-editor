'use server';

import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';
import { stream } from '@/lib/ai';

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
export async function streamNotifications(input: string) {
    return stream({
        model: openai('gpt-4o-mini'),
        system: 'You are a notifications app, displaying lifelike human messages. Each message can be long or short. Your role is to generate 4 messages from this app below:',
        prompt: input,
        schema: z.object({
            notifications: z.array(
                z.object({
                    name: z.string().describe('Name of a fictional person or bot.'),
                    message: z.string().describe('Do not use emojis or links.'),
                    minutesAgo: z.number(),
                }),
            ),
        }),
    });
}