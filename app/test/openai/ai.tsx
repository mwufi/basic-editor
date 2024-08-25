'use server';

import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

export async function getNotifications(input: string) {
    'use server';

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
}