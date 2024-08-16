import { openai } from '@ai-sdk/openai';

import { streamText } from 'ai';

const { textStream } = await streamText({
    model: openai('gpt-4-turbo'),
    prompt: 'Write a poem about embedding models.',
});

for await (const textPart of textStream) {
    console.log(textPart);
}
// Set the runtime to edge for best performance
export const runtime = "edge";

export async function POST(req: Request) {
    try {
        const { message } = await req.json();

        const { text } = await generateText({
            model: openai('gpt-4-turbo'),
            prompt: 'Write a vegetarian lasagna recipe for 4 people.',
        });

        const stream = OpenAIStream(response);
        return new StreamingTextResponse(stream);
    } catch (error) {
        console.error("Error in chat route:", error);
        return new Response("An error occurred", { status: 500 });
    }
}
