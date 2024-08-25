'use client'

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { readStreamableValue } from 'ai/rsc';
import { streamZodSchema } from '@/app/expander/prompts/ai';

interface SchemaEditorProps {
    onSchemaChange: (schema: string) => void;
}

const SchemaEditor: React.FC<SchemaEditorProps> = ({ onSchemaChange }) => {
    const [exampleData, setExampleData] = useState('');
    const [zodSchema, setZodSchema] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        if (!isLoading && !isGenerating) {
            onSchemaChange(zodSchema);
        }
    }, [zodSchema, isLoading, isGenerating, onSchemaChange]);

    const generateSchema = async () => {
        setIsLoading(true);
        try {
            const { object } = await streamZodSchema(exampleData);
            setIsGenerating(true);

            let finalSchema = '';
            for await (const partialObject of readStreamableValue(object)) {
                if (partialObject && partialObject.zodSchema) {
                    finalSchema = partialObject.zodSchema;
                    setZodSchema(finalSchema);
                }
            }
            setIsGenerating(false);
        } catch (error) {
            console.error('Error generating schema:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleExampleDataChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setExampleData(e.target.value);
    };

    const handleZodSchemaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setZodSchema(e.target.value);
    };

    return (
        <div className="grid grid-cols-2 gap-4">
            <Card>
                <CardHeader>
                    <CardTitle>Example Data</CardTitle>
                </CardHeader>
                <CardContent>
                    <Textarea
                        value={exampleData}
                        onChange={handleExampleDataChange}
                        placeholder="Paste your example JSON data here"
                        className="h-[300px]"
                    />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Zod Schema</CardTitle>
                </CardHeader>
                <CardContent>
                    <Textarea
                        value={zodSchema}
                        onChange={handleZodSchemaChange}
                        placeholder="Generated Zod schema will appear here"
                        className="h-[300px]"
                    />
                </CardContent>
            </Card>
            <div className="col-span-2 flex justify-center">
                <Button onClick={generateSchema} disabled={isLoading}>
                    {isLoading ? 'Generating...' : 'Generate Schema'}
                </Button>
            </div>
        </div>
    );
};

export default SchemaEditor;
