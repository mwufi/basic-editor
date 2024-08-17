'use client'

import React, { useState, useRef, useCallback } from 'react';
import { toast } from 'sonner';
import { getImage } from './falcon';
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-3xl font-bold mb-8">Webcam Snapshot</h1>
            <div className="mb-4">
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
            <div className="flex mt-8 mb-8">
                <div className="grid grid-cols-2 gap-4 mr-8 w-64">
                    {inputImages.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Input ${index + 1}`}
                            className={`w-32 h-32 object-cover cursor-pointer rounded ${selectedImage === image ? 'border-4 border-blue-500' : ''}`}
                            onClick={() => handleImageSelect(image)}
                        />
                    ))}
                </div>
                <div className="w-96 h-96 flex items-center justify-center">
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
            </div>
            <div className="flex gap-4">
                {imageData && (
                    <Button
                        onClick={async () => {
                            toast.success('Sending to replicate....');
                            const output = await getImage(imageData);
                            setImgOutputs([...imgOutputs, ...output]);
                        }}
                        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-4"
                    >
                        Send to AI
                    </Button>
                )}
                {imgOutputs.length > 0 && (
                    <Button
                        onClick={() => setImgOutputs([])}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
                    >
                        Clear Outputs
                    </Button>
                )}
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
                {imgOutputs.map((output, index) => (
                    <img
                        key={index}
                        src={output}
                        alt={`Output ${index}`}
                        className="w-full max-w-[400px] rounded"
                    />
                ))}
            </div>
        </div>
    );
};

export default PhotoPage;
