'use server'

import { z } from 'zod';
import OpenAI from 'openai';
import { zodResponseFormat } from "openai/helpers/zod";

const Step = z.object({
    explanation: z.string(),
    output: z.string(),
});

const MathReasoning = z.object({
    steps: z.array(Step),
    final_answer: z.string(),
});

export async function solveMathEquation(equation: string) {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    try {
        const completion = await openai.beta.chat.completions.parse({
            model: "gpt-4o-2024-08-06",
            messages: [
                { role: "system", content: "You are a helpful math tutor. Guide the user through the solution step by step." },
                { role: "user", content: `How can I solve ${equation}?` },
            ],
            response_format: zodResponseFormat(MathReasoning, "math_reasoning"),
        });

        const math_reasoning = completion.choices[0].message;

        if (math_reasoning.refusal) {
            return { error: math_reasoning.refusal };
        } else {
            return math_reasoning.parsed;
        }
    } catch (error) {
        return { error: error.message };
    }
}