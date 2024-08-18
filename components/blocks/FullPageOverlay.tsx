'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogClose,
} from "@/components/ui/dialog";

interface FullPageOverlayProps {
    children: React.ReactNode;
    trigger: string;
}

const FullPageOverlay: React.FC<FullPageOverlayProps> = ({ children, trigger }) => {
    const [isOpen, setIsOpen] = useState(true);
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            const [modifier, key] = trigger.split('+');
            const isModifierPressed =
                (modifier === 'Cmd' && (event.metaKey || event.ctrlKey)) ||
                (modifier === 'Ctrl' && event.ctrlKey);

            if (isModifierPressed && event.key.toLowerCase() === key.toLowerCase()) {
                event.preventDefault();
                setIsOpen(!isOpen);
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [isOpen]);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[90vw] sm:max-h-[90vh] overflow-auto">
                <DialogClose asChild>
                    <button
                        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                        aria-label="Close overlay"
                    >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </button>
                </DialogClose>
                {children}
            </DialogContent>
        </Dialog>
    );
};

export default FullPageOverlay;
