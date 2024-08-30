'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { streamOutline } from '../ai';
import { readStreamableValue } from 'ai/rsc';
import OutlineDisplay from '../OutlineDisplay';
import { saveOutlineForUser } from '@/lib/instantdb/mutations';
import { useUserProfile } from '@/lib/instantdb/queries';
import { toast } from 'sonner';

export const maxDuration = 30;

export default function OutlineGenerator() {
    const { user } = useUserProfile();
    const [systemPrompt, setSystemPrompt] = useState('You are an outline generator.');
    const [subject, setSubject] = useState('');
    const [outline, setOutline] = useState(null);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const handleGenerateOutline = async () => {
        setLoading(true);
        try {
            const { object } = await streamOutline(systemPrompt, subject);

            for await (const partialObject of readStreamableValue(object)) {
                if (partialObject) {
                    setOutline(partialObject);
                }
            }
            console.log("finished!", outline);
        } catch (error) {
            setOutline({ error: error.message });
        } finally {
            setLoading(false);
        }
    };

    const handleSaveOutline = async () => {
        if (!user || !outline) {
            toast.error('User or outline not found');
            return;
        };
        setSaving(true);
        try {
            await saveOutlineForUser(outline, user.id);
            toast.success('Outline saved successfully!');
        } catch (error) {
            console.error('Failed to save outline:', error);
            toast.error('Failed to save outline. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="p-4 mx-auto w-full">
            <h1 className="text-2xl font-bold mb-4">Streaming Outline Generator</h1>
            <p className="mb-4">Customize the system prompt and input a topic to generate an outline.</p>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleGenerateOutline();
            }} className="space-y-4">
                <div>
                    <label htmlFor="systemPrompt" className="block mb-2">System Prompt:</label>
                    <Textarea
                        id="systemPrompt"
                        value={systemPrompt}
                        onChange={(e) => setSystemPrompt(e.target.value)}
                        placeholder="Enter system prompt"
                        className="w-full"
                    />
                </div>
                <div>
                    <label htmlFor="subject" className="block mb-2">Subject:</label>
                    <Input
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Enter a topic for outline generation"
                        className="w-full"
                    />
                </div>
                <Button type="submit" disabled={loading} className="w-full">
                    {loading ? 'Generating...' : 'Generate'}
                </Button>
            </form>
            {outline && (
                <div className="mt-4">
                    {outline.error ? (
                        <p className="text-red-500">{outline.error}</p>
                    ) : (
                        <>
                            <h2 className="text-xl font-semibold mb-2">Generated Outline:</h2>
                            <OutlineDisplay outline={outline} />
                            <Button
                                onClick={handleSaveOutline}
                                disabled={saving || !user}
                                className="mt-4 w-full"
                            >
                                {saving ? 'Saving...' : 'Save Outline'}
                            </Button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
