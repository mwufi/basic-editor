'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { X } from 'lucide-react';

interface FullPageOverlayProps {
    children: React.ReactNode;
    trigger: string;
}

const FullPageOverlay: React.FC<FullPageOverlayProps> = ({ children, trigger }) => {
    const [isOpen, setIsOpen] = useState(true);

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        console.log(event.key, trigger, isOpen)
        if (event.key === trigger) {
            setIsOpen(!isOpen)
        }
    }, [trigger, isOpen]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    if (!isOpen) return null;
    return (
        <div className="fixed inset-2 border border-gray-600 bg-background opacity-90 backdrop-blur-sm z-50 overflow-auto rounded-lg animate-fadeIn animate-slideUp">
            <div className="container mx-auto p-4">
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 p-2 text-foreground hover:text-muted-foreground"
                    aria-label="Close overlay"
                >
                    <X size={24} />
                </button>
                {children}
            </div>
        </div>
    );
};

export default FullPageOverlay;
