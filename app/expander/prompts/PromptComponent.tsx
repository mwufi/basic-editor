'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronRight, ChevronDown } from 'lucide-react';
import SchemaEditor from './SchemaEditor';

interface PromptComponentProps {
    prompt: {
        id: string;
        name: string;
        text: string;
        description: string;
        outputSchema?: string;
    };
    onUpdate: (updatedPrompt: { id: string; name: string; text: string; description: string; outputSchema?: string }) => void;
    onRemove: (id: string) => void;
    onRun: (prompt: { id: string; name: string; text: string; description: string; outputSchema?: string }) => void;
}

const PromptComponent: React.FC<PromptComponentProps> = ({ prompt, onUpdate, onRemove, onRun }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [editedName, setEditedName] = useState(prompt.name);
    const [editedText, setEditedText] = useState(prompt.text);
    const [editedDescription, setEditedDescription] = useState(prompt.description);
    const [editedOutputSchema, setEditedOutputSchema] = useState(prompt.outputSchema || '');
    const [hasOutputSchema, setHasOutputSchema] = useState(!!prompt.outputSchema);

    const handleEdit = () => {
        setIsEditing(true);
        setIsExpanded(true);
    };

    const handleSave = () => {
        const updatedPrompt = {
            ...prompt,
            name: editedName,
            text: editedText,
            description: editedDescription,
            outputSchema: hasOutputSchema ? editedOutputSchema : undefined,
        };
        onUpdate(updatedPrompt);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedName(prompt.name);
        setEditedText(prompt.text);
        setEditedDescription(prompt.description);
        setEditedOutputSchema(prompt.outputSchema || '');
        setHasOutputSchema(!!prompt.outputSchema);
        setIsEditing(false);
    };

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const handleSchemaChange = (schema: string) => {
        setEditedOutputSchema(schema);
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
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="hasOutputSchema"
                            checked={hasOutputSchema}
                            onCheckedChange={(checked) => setHasOutputSchema(checked as boolean)}
                        />
                        <label htmlFor="hasOutputSchema">Has Output Schema</label>
                    </div>
                    {hasOutputSchema && (
                        <SchemaEditor onSchemaChange={handleSchemaChange} />
                    )}
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
                    {prompt.outputSchema && (
                        <div className="mt-2">
                            <h4 className="font-semibold">Output Schema:</h4>
                            <pre className="bg-gray-100 p-2 rounded mt-1">{prompt.outputSchema}</pre>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PromptComponent;
