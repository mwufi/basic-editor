'use client'

import React, { useState, useRef, useCallback } from 'react';
import { toast } from 'sonner';
import { getImage } from './falcon';
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import SettingsForm from './SettingsForm';


const PhotoPage: React.FC = () => {
    const [imageData, setImageData] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const startCamera = useCallback(async () => {
        console.log("Starting camera")
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (error) {
            toast.error('Failed to access the camera');
            console.error('Error accessing the camera:', error);
        }
    }, []);

    const [settings, setSettings] = useState({
        prompt: "Model in layered street style, standing against a vibrant graffiti wall, Vivid colors, Mirrorless, 28mm lens, f/2.5 aperture, ISO 400, natural daylight",
        style: "Photographic",
        negativePrompt: "out of frame, lowres, text, error, cropped, worst quality, low quality, jpeg artifacts, ugly, duplicate, morbid, mutilated, out of frame, extra fingers, mutated hands, poorly drawn hands, poorly drawn face, mutation, deformed, blurry, bad anatomy, bad proportions, extra limbs, cloned face, disfigured, gross proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck, username, watermark, signature.",
        steps: 27,
        guidanceScale: 7,
        strength: 1,
        seed: 68420
    });

    const takeSnapshot = useCallback(() => {
        if (videoRef.current) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            canvas.getContext('2d')?.drawImage(videoRef.current, 0, 0);
            const data = canvas.toDataURL('image/jpeg');
            setImageData(data);
            setSelectedImage(data);
            setInputImages(prevImages => [...prevImages, data]);
            toast.success('Snapshot taken!');
            setIsModalOpen(false);
        }
    }, []);

    const [imgOutputs, setImgOutputs] = useState<string[]>([]);

    const [inputImages, setInputImages] = useState([
        "https://static.vecteezy.com/system/resources/previews/026/829/465/non_2x/beautiful-girl-with-autumn-leaves-photo.jpg",
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80",
        "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80"
    ]);

    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleImageSelect = (image: string) => {
        setSelectedImage(image);
        setImageData(image);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 p-4">
            <h1 className="text-3xl font-bold mb-4">AI Photo Generator</h1>

            {/* Model Selection Dropdown */}
            <select className="mb-4 p-2 border rounded">
                <option>Select Model</option>
                <option value="pulid">Pulid</option>
                <option value="sdxl_face">SDXL Face</option>
            </select>

            <div className="flex flex-1">
                {/* Left Panel - Form */}
                <div className="w-1/3 pr-4">
                    <Accordion type="single" collapsible>
                        <AccordionItem value="settings">
                            <AccordionTrigger>Settings</AccordionTrigger>
                            <AccordionContent>
                                <SettingsForm defaultSettings={settings} onChange={(e) => {
                                    console.log(e)
                                    setSettings(e)
                                }} />
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>

                {/* Right Panel - Images */}
                <div className="w-2/3 pl-4 overflow-y-auto max-h-screen">
                    <h2 className="text-2xl font-bold mb-4">Input Images</h2>
                    <div className="grid grid-cols-4 gap-4 mb-8">
                        {inputImages.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Input ${index + 1}`}
                                className={`w-full h-32 object-cover cursor-pointer rounded ${selectedImage === image ? 'border-4 border-blue-500' : ''}`}
                                onClick={() => handleImageSelect(image)}
                            />
                        ))}
                        <div className="grid w-full h-full place-items-center">
                            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="outline" onClick={startCamera}>Use Webcam</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <div className="w-full max-w-md">
                                        <video ref={videoRef} autoPlay className="w-full mb-4 rounded" />
                                        <Button onClick={takeSnapshot}>Take Snapshot</Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold mb-4">Selected Image</h2>
                    <div className="w-full h-96 flex items-center justify-center mb-8">
                        {selectedImage ? (
                            <img
                                src={selectedImage}
                                alt="Selected Image"
                                className="max-w-full max-h-full object-contain rounded"
                            />
                        ) : (
                            <div className="text-gray-400">No image selected</div>
                        )}
                    </div>

                    <div className="flex gap-4 mb-8">
                        {imageData && (
                            <Button
                                onClick={async () => {
                                    const imagePromise = getImage(imageData, settings);
                                    toast.promise(imagePromise, {
                                        loading: 'Generating images (10s)....',
                                        success: (data) => {
                                            return "Image generated successfully"
                                        },
                                        error: 'Something bad happened!!',
                                    });
                                    const output = await imagePromise;
                                    setImgOutputs([...imgOutputs, ...output]);
                                }}
                                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Generate Image
                            </Button>
                        )}
                        {imgOutputs.length > 0 && (
                            <Button
                                onClick={() => setImgOutputs([])}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Clear Outputs
                            </Button>
                        )}
                    </div>

                    <h2 className="text-2xl font-bold mb-4">Generated Images</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {imgOutputs.map((output, index) => (
                            <img
                                key={index}
                                src={output}
                                alt={`Output ${index}`}
                                className="w-full rounded"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PhotoPage;
