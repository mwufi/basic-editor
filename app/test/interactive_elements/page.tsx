
"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { continueConversation } from '@/app/home/actions';
import { readStreamableValue } from 'ai/rsc';

interface InteractiveElementProps {
    initialHtml: string;
    isEditMode?: boolean;
}

const InteractiveElement: React.FC<InteractiveElementProps> = ({
    initialHtml,
    isEditMode = false,
}) => {
    const [html, setHtml] = useState(initialHtml);
    const [isEditing, setIsEditing] = useState(false);

    const handleDoubleClick = () => {
        if (isEditMode) {
            setIsEditing(true);
        }
    };

    const handleSave = () => {
        setIsEditing(false);
    };

    return (
        <div
            className={`relative ${isEditMode ? 'hover:bg-yellow-50' : ''}`}
            onDoubleClick={handleDoubleClick}
        >
            {isEditing && (
                <div className="absolute top-10 left-40 bg-white p-4 shadow-lg z-10">
                    <textarea
                        value={html}
                        onChange={(e) => setHtml(e.target.value)}
                        className="w-full mb-2 p-2 border"
                    />
                    <Button onClick={handleSave}>Save</Button>
                </div>
            )}
            <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
    );
};

const HomePage = () => {
    const [isEditMode, setIsEditMode] = useState(false);

    const [conversation, setConversation] = useState([]);
    const [input, setInput] = useState('');

    const getAIResponse = async () => {
        const { messages, newMessage } = await continueConversation([
            ...conversation,
            { role: 'user', content: input },
        ]);

        let textContent = '';

        for await (const delta of readStreamableValue(newMessage)) {
            textContent = `${textContent}${delta}`;

            setConversation([
                ...messages,
                { role: 'assistant', content: textContent },
            ]);
        }
    }

    return (
        <div className="p-4">
            <Button
                onClick={() => setIsEditMode(!isEditMode)}
                className="mb-4"
            >
                {isEditMode ? 'Switch to Display Mode' : 'Switch to Edit Mode'}
            </Button>
            <InteractiveElement
                initialHtml="<h2>Hello, World!</h2><p>This is an interactive element.</p>"
                isEditMode={isEditMode}
            />
            <InteractiveElement
                initialHtml="<h3>Interactive Button</h3><button class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Click me!</button>"
                isEditMode={isEditMode}
            />
            <InteractiveElement
                initialHtml="<h3>Interactive Input</h3><input type='text' placeholder='Type something...' class='border border-gray-300 rounded-md px-3 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500'>"
                isEditMode={isEditMode}
            />
            <InteractiveElement
                initialHtml="<h3>Interactive Checkbox</h3><label class='flex items-center'><input type='checkbox' class='form-checkbox h-5 w-5 text-blue-600'><span class='ml-2 text-gray-700'>Check me</span></label>"
                isEditMode={isEditMode}
            />
            <button
                onClick={getAIResponse}
            >
                Send Message
            </button>
            <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Conversation:</h3>
                <ul className="space-y-2">
                    {conversation.map((message, index) => (
                        <li key={index} className={`p-2 rounded ${message.role === 'user' ? 'bg-blue-100' : 'bg-green-100'}`}>
                            <strong>{message.role === 'user' ? 'You: ' : 'Assistant: '}</strong>
                            <pre className="whitespace-pre-wrap">{message.content}</pre>
                        </li>
                    ))}
                </ul>

                <div className="mt-4">
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        getAIResponse();
                        setInput('');
                    }}>
                        <div className="relative w-full">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type your message..."
                                className="w-full pl-12 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 font-semibold">
                                You:
                            </span>
                        </div>
                        <button
                            type="submit"
                            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
