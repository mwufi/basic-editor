'use client'

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';

const quotes = [
    "Time is a river of passing events.",
    "The future is uncertain, but the end is always near.",
    "Yesterday is history, tomorrow is a mystery, but today is a gift.",
    "Time is the wisest counselor of all.",
    "The two most powerful warriors are patience and time.",
];

const images = [
    { src: 'https://picsum.photos/id/1/200/200', position: [1, 2] },
    { src: 'https://picsum.photos/id/2/200/200', position: [2, 4] },
    { src: 'https://picsum.photos/id/3/200/200', position: [3, 1] },
    { src: 'https://picsum.photos/id/4/200/200', position: [4, 3] },
    { src: 'https://picsum.photos/id/5/200/200', position: [5, 2] },
];

interface TypewriterProps {
    text: string;
    delay?: number;
}

const Typewriter: React.FC<TypewriterProps> = ({ text, delay = 100 }) => {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timer = setTimeout(() => {
                setDisplayText((prev) => prev + text[currentIndex]);
                setCurrentIndex((prev) => prev + 1);
            }, delay);

            return () => clearTimeout(timer);
        }
    }, [currentIndex, delay, text]);

    return (
        <span className="font-mono">
            {displayText}
            <span className="animate-pulse">|</span>
        </span>
    );
};

interface KeyStroke {
    key: string;
    timestamp: number;
}
import typingPattern from './typingpattern2.json';

interface TypingPatternDisplayProps {
    pattern: KeyStroke[];
}

const TypingPatternReplay: React.FC<TypingPatternDisplayProps> = ({ pattern }) => {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < pattern.length) {
            const timer = setTimeout(() => {
                setDisplayText((prev) => {
                    if (pattern[currentIndex].key === 'Backspace') {
                        return prev.slice(0, -1);
                    } else if (pattern[currentIndex].key.length === 1) {
                        return prev + pattern[currentIndex].key;
                    }
                    return prev;
                });
                setCurrentIndex((prev) => prev + 1);
            }, pattern[currentIndex].timestamp - (currentIndex > 0 ? pattern[currentIndex - 1].timestamp : 0));

            return () => clearTimeout(timer);
        }
    }, [currentIndex, pattern]);

    return (
        <div>
            {displayText}
            <span className="animate-pulse">|</span>
        </div>
    );
};

const TypingPatternDisplay: React.FC<TypingPatternDisplayProps> = ({ pattern }) => {
    const maxTimestamp = Math.max(...pattern.map(stroke => stroke.timestamp));

    return (
        <div className="w-full max-w-2xl mt-8">
            <h3 className="text-lg font-semibold mb-4">Typing Pattern Visualization</h3>
            <div className="mb-4 font-mono text-lg">
                <TypingPatternReplay pattern={pattern} />
            </div>
            <div className="relative h-40 bg-blue-100 rounded">
                {pattern.map((stroke, index) => (
                    <div
                        key={index}
                        className="absolute bottom-0 w-1 bg-blue-500"
                        style={{
                            left: `${(stroke.timestamp / maxTimestamp) * 100}%`,
                            height: `${(stroke.key.length === 1 ? 20 : 10)}%`,
                        }}
                        title={`${stroke.key} at ${stroke.timestamp}ms`}
                    />
                ))}
            </div>
            <p className="mt-2 text-sm text-gray-600">
                Each bar represents a keystroke. Taller bars are character keys, shorter ones are special keys.
            </p>
        </div>
    );
};

const TypingPatternCapture: React.FC<{ quote: string }> = ({ quote }) => {
    const [userInput, setUserInput] = useState('');
    const [keyStrokes, setKeyStrokes] = useState<KeyStroke[]>([]);
    const [startTime, setStartTime] = useState<number | null>(null);

    const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        const { key } = event;
        const currentTime = Date.now();

        if (startTime === null) {
            toast.info('Start typing to capture the pattern');
            setStartTime(currentTime);
        }

        if (key === 'Enter') {
            const typingPattern = JSON.stringify(keyStrokes);
            navigator.clipboard.writeText(typingPattern);
            toast.success('Typing pattern saved to clipboard');
            return;
        }

        const newKeyStroke: KeyStroke = {
            key,
            timestamp: currentTime - (startTime || currentTime)
        };

        setKeyStrokes(prevKeyStrokes => [...prevKeyStrokes, newKeyStroke]);
    }, [startTime, keyStrokes]);

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(event.target.value);
    }, []);

    useEffect(() => {
        setStartTime(null);
        setKeyStrokes([]);
    }, [quote]);

    return (
        <div className="mb-8 w-full max-w-2xl">
            <p className="text-gray-500 mb-2">{quote}</p>
            <input
                type="text"
                value={userInput}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Type the quote here and press Enter when done"
            />
        </div>
    );
};


const ChronographyPage: React.FC = () => {
    const [seconds, setSeconds] = useState(0);
    const [visibleImages, setVisibleImages] = useState<number[]>([]);

    useEffect(() => {
        const timer = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {

        if (seconds % 5 === 0 && visibleImages.length < images.length) {
            setVisibleImages(prev => [...prev, prev.length]);
        }
    }, [seconds, visibleImages.length]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="text-6xl font-bold mb-8">{seconds}</div>
            <div className="max-w-2xl mb-8 text-center">
                <Typewriter
                    text="As the seconds tick by, we're reminded of the fleeting nature of time. Each moment is a brushstroke on the canvas of our lives, painting a unique story that unfolds with every passing second. In this digital chronography, we witness the interplay of time, words, and images, creating a tapestry of experiences that reflects the complexity and beauty of our journey through life."
                    delay={50}
                />
            </div>
            <TypingPatternCapture
                quote="In the tapestry of time, each thread represents a moment, woven together to create the intricate pattern of our lives. As we type these words, we're not just inputting characters, but leaving our unique imprint on the digital canvas of existence. This exercise in chronography invites us to reflect on the passage of time, the power of language, and the individuality of our interactions with technology."
            />
            <TypingPatternDisplay pattern={typingPattern} />
            <div className="mt-20"></div>
        </div>
    );
};

export default ChronographyPage;
