'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { streamNotifications } from './ai';
import { readStreamableValue } from 'ai/rsc';

export const maxDuration = 30;

export default function OpenAITest() {
    const [input, setInput] = useState('');
    const [notifications, setNotifications] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleGetNotifications = async () => {
        setLoading(true);
        try {
            const { object } = await streamNotifications(input);

            for await (const partialObject of readStreamableValue(object)) {
                if (partialObject) {
                    setNotifications(partialObject.notifications);
                }
            }
        } catch (error) {
            setNotifications({ error: error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Streaming Notification Generator</h1>
            <p className="mb-4">Input something you want to generate notifications for.</p>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleGetNotifications();
            }} className="flex space-x-2 mb-4">
                <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter a prompt for notifications"
                    className="flex-grow"
                />
                <Button type="submit" disabled={loading}>
                    {loading ? 'Generating...' : 'Generate'}
                </Button>
            </form>
            {notifications && (
                <div className="mt-4">
                    {notifications.error ? (
                        <p className="text-red-500">{notifications.error}</p>
                    ) : (
                        <>
                            <h2 className="text-xl font-semibold mb-2">Generated Notifications:</h2>
                            {notifications.map((notification, index) => (
                                <div key={index} className="mb-2 p-2 border rounded">
                                    <p><strong>{notification.name}</strong></p>
                                    <p>{notification.message}</p>
                                    {notification.minutesAgo && <p className="text-sm text-gray-500">{notification.minutesAgo} minutes ago</p>}
                                </div>
                            ))}
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
