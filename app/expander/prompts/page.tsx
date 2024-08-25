'use client'

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { streamNotifications } from '@/app/test/openai/ai';
import { readStreamableValue } from 'ai/rsc';
import useIndexedDB from '@/hooks/useIndexedDB';
import PromptComponent from '@/components/PromptComponent';
import AddPromptModal from '@/components/AddPromptModal';

interface Prompt {
    id: string;
    name: string;
    text: string;
}

export default function PromptsPage() {
    const [prompts, setPrompts] = useState<Prompt[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [result, setResult] = useState<any>(null);
    const [isAddingPrompt, setIsAddingPrompt] = useState(false);
    const { getAll, add, remove, update } = useIndexedDB('prompts', 'readwrite');

    useEffect(() => {
        loadPrompts();
    }, []);

    const loadPrompts = async () => {
        const loadedPrompts = await getAll();
        setPrompts(loadedPrompts);
    };

    const filteredPrompts = prompts.filter(
        prompt => prompt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            prompt.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddPrompt = () => {
        setIsAddingPrompt(true);
    };

    const handleSaveNewPrompt = async (newPrompt: Omit<Prompt, 'id'>) => {
        const promptToAdd: Prompt = {
            ...newPrompt,
            id: Date.now().toString(),
        };
        await add(promptToAdd);
        loadPrompts();
        setIsAddingPrompt(false);
    };

    const handleRemovePrompt = async (id: string) => {
        await remove(id);
        loadPrompts();
    };

    const handleUpdatePrompt = async (updatedPrompt: Prompt) => {
        await update(updatedPrompt.id, updatedPrompt);
        loadPrompts();
    };

    const handleRunPrompt = async (prompt: Prompt) => {
        setResult(null);
        try {
            const { object } = await streamNotifications(prompt.text);
            for await (const partialObject of readStreamableValue(object)) {
                if (partialObject) {
                    setResult(partialObject.notifications);
                }
            }
        } catch (error) {
            setResult({ error: error.message });
        }
    };

    return (
        <div className="flex h-screen">
            <div className="w-1/2 p-4 border-r">
                <h1 className="text-2xl font-bold mb-4">Prompts</h1>
                <div className="mb-4">
                    <Input
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search prompts..."
                        className="w-full"
                    />
                </div>
                <Button onClick={handleAddPrompt} className="mb-4">Add New Prompt</Button>
                {filteredPrompts.map((prompt) => (
                    <PromptComponent
                        key={prompt.id}
                        prompt={prompt}
                        onUpdate={handleUpdatePrompt}
                        onRemove={handleRemovePrompt}
                        onRun={handleRunPrompt}
                    />
                ))}
            </div>
            <div className="w-1/2 p-4">
                <h2 className="text-2xl font-bold mb-4">Results</h2>
                {result && (
                    <div>
                        {result.error ? (
                            <p className="text-red-500">{result.error}</p>
                        ) : (
                            result.map((notification, index) => (
                                <div key={index} className="mb-2 p-2 border rounded">
                                    <p><strong>{notification.name}</strong></p>
                                    <p>{notification.message}</p>
                                    {notification.minutesAgo && <p className="text-sm text-gray-500">{notification.minutesAgo} minutes ago</p>}
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
            {isAddingPrompt && (
                <AddPromptModal
                    onSave={handleSaveNewPrompt}
                    onClose={() => setIsAddingPrompt(false)}
                />
            )}
        </div>
    );
}
