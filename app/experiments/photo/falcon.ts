'use server'

import Replicate from "replicate";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

const DEFAULT = "https://replicate.delivery/pbxt/Kr6iendsvYS0F3MLmwRZ8q07XIMEJdemnQI3Cmq9nNrauJbq/zcy.webp";

export async function getImage(image: string, settings: any): Promise<string[]> {
    return Pulid(image, settings)
}

const originalSettings = {
    prompt: "anime, but keeping it more realistic",
    negative_prompt: "flaws in the eyes, flaws in the face, flaws, lowres, non-HDRi, low quality, worst quality,artifacts noise, text, watermark, glitch, deformed, mutated, ugly, disfigured, hands, low resolution, partially rendered objects,  deformed or partially rendered eyes, deformed, deformed eyeballs, cross-eyed,blurry"
}
type DefaultSettings = {
    prompt: string;
    style: string;
    negativePrompt: string;
    steps: number;
    guidanceScale: number;
    strength: number;
    seed: number;
};

export async function Pulid(image: string, settings: any): Promise<string[]> {
    console.log("starting image gen")
    const f = await replicate.run(
        "zsxkib/pulid:43d309c37ab4e62361e5e29b8e9e867fb2dcbcec77ae91206a8d95ac5dd451a0",
        {
            input: {
                prompt: settings.prompt,
                cfg_scale: 1.2,
                num_steps: 8,
                image_width: 768,
                num_samples: 4,
                image_height: 1024,
                output_format: "webp",
                identity_scale: 0.8,
                mix_identities: false,
                output_quality: 80,
                generation_mode: "fidelity",
                main_face_image: image,
                negative_prompt: settings.negative_prompt
            }
        }
    );
    console.log("image gen success", f)
    return f as string[];
}

const originalSDXL = {
    prompt: "photo of a tech guy wearing casual shirt in a garden",
    negative_prompt: "flaws in the eyes, flaws in the face, flaws, lowres, non-HDRi, low quality, worst quality,artifacts noise, text, watermark, glitch, deformed, mutated, ugly, disfigured, hands, low resolution, partially rendered objects,  deformed or partially rendered eyes, deformed, deformed eyeballs, cross-eyed,blurry",
}

export async function SDXL_face(image: string, settings: DefaultSettings): Promise<string[]> {
    console.log("starting image gen")
    const f = await replicate.run(
        "lucataco/ip_adapter-sdxl-face:226c6bf67a75a129b0f978e518fed33e1fb13956e15761c1ac53c9d2f898c9af",
        {
            input: {
                seed: settings.seed,
                image: image,
                scale: 0.6,
                prompt: settings.prompt,
                negative_prompt: settings.negativePrompt,
                num_outputs: 4,
                num_inference_steps: settings.steps
            }
        }
    );
    console.log("image gen success", f)

    return f as string[];
}