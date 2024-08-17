'use server'

import Replicate from "replicate";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

interface FluxSchnellInput {
    seed: number;
    prompt: string;
    num_outputs: number;
    aspect_ratio: string;
    output_format: string;
    output_quality: number;
    disable_safety_checker: boolean;
}

export async function fluxSchnell(input: FluxSchnellInput): Promise<string[]> {
    console.log("Starting Flux Schnell image generation");

    try {
        const output = await replicate.run(
            "black-forest-labs/flux-schnell",
            {
                input: {
                    seed: input.seed,
                    prompt: input.prompt,
                    num_outputs: input.num_outputs,
                    aspect_ratio: input.aspect_ratio,
                    output_format: input.output_format,
                    output_quality: input.output_quality,
                    disable_safety_checker: input.disable_safety_checker
                }
            }
        );

        console.log("Flux Schnell image generation successful", output);
        return output as string[];
    } catch (error) {
        console.error("Error in Flux Schnell image generation:", error);
        throw error;
    }
}
