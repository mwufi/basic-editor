'use client'

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fluxSchnell } from '@/app/experiments/photo/models';
import { toast } from 'sonner';

const FluxPage: React.FC = () => {
    const [prompt, setPrompt] = useState('black forest gateau cake spelling out the words \"FLUX SCHNELL\", tasty, food photography, dynamic shot');
    const [generatedImages, setGeneratedImages] = useState<string[]>([]);

    const handleGenerate = async () => {
        if (!prompt) {
            toast.error('Please enter a prompt');
            return;
        }

        try {
            const imagePromise = fluxSchnell({
                seed: Math.floor(Math.random() * 1000000),
                prompt,
                num_outputs: 4,
                aspect_ratio: "1:1",
                output_format: "webp",
                output_quality: 90,
                disable_safety_checker: true
            });

            toast.promise(imagePromise, {
                loading: 'Generating images...',
                success: 'Images generated successfully!',
                error: (e) => `Failed to generate images: ${e.message}`,
            });

            const images = await imagePromise;
            setGeneratedImages(images);
        } catch (error) {
            console.error('Error generating images:', error.message);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Flux Schnell Image Generator</h1>
            <div className="mb-4">
                <Input
                    type="text"
                    placeholder="Enter your prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full mb-2"
                />
                <div className="flex gap-2">
                    <Button onClick={handleGenerate}>Generate Images</Button>
                    <Button onClick={() => setGeneratedImages([])} variant="outline">Clear Images</Button>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                {generatedImages.map((image, index) => (
                    <img 
                        key={index} 
                        src={image} 
                        alt={`Generated image ${index + 1}`} 
                        className="w-full rounded-lg select-none" 
                        draggable="false"
                    />
                ))}
            </div>
        </div>
    );
};

export default FluxPage;
