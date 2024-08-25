'use client'

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getNotifications } from './ai';

export default function OpenAITest() {
    const [input, setInput] = useState('');
    const [notifications, setNotifications] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleGetNotifications = async () => {
        setLoading(true);
        try {
            const result = await getNotifications(input);
            console.log(result);
            setNotifications(result.notifications);
        } catch (error) {
            setNotifications({ error: error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">OpenAI Notification Generator</h1>
            <div className="flex space-x-2 mb-4">
                <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter a prompt for notifications"
                    className="flex-grow"
                />
                <Button onClick={handleGetNotifications} disabled={loading}>
                    {loading ? 'Generating...' : 'Generate'}
                </Button>
            </div>
            {notifications && (
                <div className="mt-4">
                    {notifications.error ? (
                        <p className="text-red-500">{notifications.error}</p>
                    ) : (
                        <>
                            <h2 className="text-xl font-semibold mb-2">Generated Notifications:</h2>
                            {notifications.notifications.map((notification, index) => (
                                <div key={index} className="mb-2 p-2 border rounded">
                                    <p><strong>{notification.name}</strong></p>
                                    <p>{notification.message}</p>
                                    <p className="text-sm text-gray-500">{notification.minutesAgo} minutes ago</p>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
