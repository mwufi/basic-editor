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


function loadSchemaFromString(schemaString: string) {
    // Create a new context with only the necessary globals
    const context = {
        z,
        exports: {},
    };

    // Wrap the schema string in a function to create a closure
    const wrappedCode = `
      (function(z, exports) {
        ${schemaString}
        return exports.default || exports;
      })(z, exports);
    `;

    // Evaluate the wrapped code in the context
    const schemaFunction = eval(wrappedCode);

    // Execute the function with the context
    return schemaFunction(z, context.exports);
}

export async function streamOutlineSchema(input: string, schemaString: string) {
    try {
        const schema = loadSchemaFromString(schemaString);
        console.log('schema', schema);
        return stream({
            model: openai('gpt-4o-mini'),
            system: 'You are a helpful assistant that generates outlines based on input descriptions.',
            prompt: `Generate an outline for the following description:\n\n${input}`,
            schema
        });
    } catch (error) {
        console.error('Error loading schema:', error);
        throw error;
    }
}