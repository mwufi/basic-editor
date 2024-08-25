'use server';

import { openai } from '@ai-sdk/openai';
import { z } from 'zod';
import { stream } from '@/lib/ai';


export async function streamContent(input: string) {
    return stream({
        model: openai('gpt-4o-mini'),
        system: `You are a staff ML engineer, tasked with creating a study guide that will let the student prepare for interviews.

        Give the most informative, compact exposition of the topic.

        The input is a topic name, and the previous context is the parent topics.

        For example:
        Key elements of dynamic programming
         -> optimal substructure

        the input will be:
        Optimal substructure

        Context:
        Key elements of dynamic programming

        

        `,
        prompt: input,
        schema: z.object({
            content: z.string().describe('The detailed page for the topic'),
        }),
    });
}