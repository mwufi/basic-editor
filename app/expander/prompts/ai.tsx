'use server';

import { z } from 'zod';
import { stream } from '@/lib/ai';
import { openai } from '@ai-sdk/openai';
import outlineSchema from './OutlineSchema';
import notificationsSchema from './NotificationSchema';

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
import fs from 'fs/promises';
import path from 'path';

export async function fetchSchemas() {
    const schemaDir = path.join(process.cwd(), 'app', 'expander', 'prompts');
    const schemaFiles = ['OutlineSchema.ts', 'NotificationSchema.ts'];

    const schemas = await Promise.all(schemaFiles.map(async (file) => {
        const filePath = path.join(schemaDir, file);
        const content = await fs.readFile(filePath, 'utf-8');
        return {
            name: path.parse(file).name,
            textDisplay: content
        };
    }));

    return schemas;
}

type SchemaName = 'OutlineSchema' | 'NotificationSchema';

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
        console.log('schemaString', schemaString);
        const schemaObj = JSON.parse(JSON.stringify(schemaString));
        const schemaName = schemaObj.name as SchemaName;

        const schemaConfig = {
            NotificationSchema: {
                schema: notificationsSchema,
                systemPrompt: 'You are a notifications app, displaying lifelike human messages.',
                userPrompt: input
            },
            OutlineSchema: {
                schema: outlineSchema,
                systemPrompt: 'You are a helpful assistant that generates outlines based on input descriptions.',
                userPrompt: input
            }
        };

        const { schema, systemPrompt, userPrompt } = schemaConfig[schemaName] || {};

        if (!schema || !systemPrompt || !userPrompt) {
            throw new Error(`Invalid schema name: ${schemaName}`);
        }

        return stream({
            model: openai('gpt-4o-mini'),
            system: systemPrompt,
            prompt: userPrompt,
            schema
        });
    } catch (error) {
        console.error('Error loading schema:', error);
        throw error;
    }
}