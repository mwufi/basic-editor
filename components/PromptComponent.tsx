'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { ChevronRight, ChevronDown } from 'lucide-react';

interface PromptComponentProps {
    prompt: {
        id: string;
        name: string;
        text: string;
        description: string;
    };
    onUpdate: (updatedPrompt: { id: string; name: string; text: string; description: string }) => void;
    onRemove: (id: string) => void;
    onRun: (prompt: { id: string; name: string; text: string; description: string }) => void;
}

const PromptComponent: React.FC<PromptComponentProps> = ({ prompt, onUpdate, onRemove, onRun }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [editedName, setEditedName] = useState(prompt.name);
    const [editedText, setEditedText] = useState(prompt.text);
    const [editedDescription, setEditedDescription] = useState(prompt.description);

    const handleEdit = () => {
        setIsEditing(true);
        setIsExpanded(true);
    };

    const handleSave = () => {
        onUpdate({ ...prompt, name: editedName, text: editedText, description: editedDescription });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedName(prompt.name);
        setEditedText(prompt.text);
        setEditedDescription(prompt.description);
        setIsEditing(false);
    };

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    if (isEditing) {
        return (
            <div className="mb-4 border rounded-lg p-4">
                <form className="space-y-4">
                    <Input
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        placeholder="Prompt Name"
                        className="w-full"
                    />
                    <Textarea
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                        placeholder="Prompt Description"
                        className="w-full h-20"
                    />
                    <Textarea
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        placeholder="Prompt Text"
                        className="w-full h-32"
                    />
                    <div className="flex justify-end space-x-2">
                        <Button onClick={handleSave} size="sm">Save</Button>
                        <Button onClick={handleCancel} variant="outline" size="sm">Cancel</Button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="mb-4 border rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center cursor-pointer" onClick={toggleExpand}>
                    {isExpanded ? <ChevronDown className="mr-2" /> : <ChevronRight className="mr-2" />}
                    <h3 className="text-lg font-semibold">{prompt.name}</h3>
                </div>
                <div className="flex space-x-2">
                    <Button onClick={handleEdit} size="sm">Edit</Button>
                    <Button onClick={() => onRemove(prompt.id)} variant="destructive" size="sm">Remove</Button>
                    <Button onClick={() => onRun(prompt)} size="sm">Run</Button>
                </div>
            </div>
            <p className="text-gray-600 mb-2">{prompt.description}</p>
            {isExpanded && (
                <div className="mt-2">
                    <p className="text-gray-600">{prompt.text}</p>
                </div>
            )}
        </div>
    );
};

export default PromptComponent;
