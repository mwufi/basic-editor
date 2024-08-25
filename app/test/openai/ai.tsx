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

// we can also create streamable values
import { streamObject } from 'ai';
import { createStreamableValue } from 'ai/rsc';

export async function streamNotifications(input: string) {
    'use server';

    const stream = createStreamableValue();

    (async () => {
        const { partialObjectStream } = await streamObject({
            model: openai('gpt-4-turbo'),
            system: 'You generate a few (3, or however many the user wants) notifications for a messages app. make it related to the input!',
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

        for await (const partialObject of partialObjectStream) {
            stream.update(partialObject);
        }

        stream.done();
    })();

    return { object: stream.value };
}