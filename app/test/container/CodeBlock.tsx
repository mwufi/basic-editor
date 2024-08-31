'use client'

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Check } from 'lucide-react';

export default function CodeBlock({ code }: { code: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="mt-4 relative">
            <div className="absolute top-2 right-0">
                <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleCopy}
                    className="flex items-center p-4"
                >
                    {copied ? (
                        <>
                            <Check className="mr-2 h-4 w-4" />
                            Copied
                        </>
                    ) : (
                        'Copy'
                    )}
                </Button>
            </div>
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>{code}</code>
            </pre>
        </div>
    )
}