import { streamObject } from 'ai';
import { createStreamableValue } from 'ai/rsc';

export async function stream({ model, system, prompt, schema }) {
    'use server';

    const stream = createStreamableValue();

    (async () => {
        try {
            const { partialObjectStream } = await streamObject({
                model,
                system,
                prompt,
                schema,
            });

            for await (const partialObject of partialObjectStream) {
                stream.update(partialObject);
            }

            stream.done();
        } catch (error) {
            console.error('Error streaming data:', error);
            stream.update({ error: 'Failed to stream data. Please try again.' });
            stream.done();
        }
    })();

    return { object: stream.value };
}