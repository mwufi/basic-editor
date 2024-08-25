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

export async function fetchSchemas() {
    return [
        {
            name: 'Outline', textDisplay: `import { z } from 'zod';

const subsectionSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']).optional(),
});

const sectionSchema = z.object({
  section: z.string(),
  subsections: z.union([
    z.array(z.string()),
    z.array(subsectionSchema)
  ]),
});

const outlineSchema = z.object({
  topic: z.string(),
  outline: z.array(sectionSchema),
});

export default outlineSchema;` },
        {
            name: 'Notifications', textDisplay: `const notificationsSchema = z.object({
                notifications: z.array(
                    z.object({
                        name: z.string().describe('Name of a fictional person.'),
                        message: z.string().describe('Do not use emojis or links.'),
                        minutesAgo: z.number(),
                    }),
                ),
            })`
        }
    ];
}

type SchemaName = 'Outline' | 'Notifications';

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
            Notifications: {
                schema: notificationsSchema,
                systemPrompt: 'You are a notifications app, displaying lifelike human messages.',
                userPrompt: input
            },
            Outline: {
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