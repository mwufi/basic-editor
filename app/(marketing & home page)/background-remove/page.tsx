import React from 'react';
import { Upload, Move, Eraser, Maximize, Menu } from 'lucide-react';

const RemovRUI = () => {
    return (
        <div className="bg-gradient-to-b from-[#1a2b3c] to-[#e85d35] min-h-screen flex items-center justify-center p-4">
            <div className="max-w-3xl w-full">
                <header className="flex justify-between items-center mb-8">
                    <div className="text-white text-2xl font-bold">removr</div>
                    <div>
                        <button className="bg-white/10 text-white px-4 py-2 rounded-lg mr-2">Upload</button>
                        <button className="text-white"><Menu /></button>
                    </div>
                </header>

                <main className="bg-[rgba(22,28,36,0.8)] rounded-xl p-6">
                    <div className="bg-[rgba(255,255,255,0.05)] rounded-lg p-8 text-center mb-6">
                        <h2 className="text-white text-xl mb-2">Drop an image</h2>
                        <p className="text-gray-400 text-sm">Upload a PNG or JPG file under 5MB.</p>
                        <div className="mt-4">
                            <Move className="text-[#4dabf7] mx-auto" size={32} />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-[rgba(255,255,255,0.05)] rounded-lg p-4 text-center">
                            <Upload className="text-white mx-auto mb-2" size={24} />
                            <p className="text-white text-sm">Upload an image</p>
                        </div>
                        <div className="bg-[rgba(255,255,255,0.05)] rounded-lg p-4 text-center">
                            <Eraser className="text-white mx-auto mb-2" size={24} />
                            <p className="text-white text-sm">Remove background</p>
                        </div>
                        <div className="bg-[rgba(255,255,255,0.05)] rounded-lg p-4 text-center">
                            <Maximize className="text-white mx-auto mb-2" size={24} />
                            <p className="text-white text-sm">Export up to 4x</p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default RemovRUI;