'use client'

import { useState, useEffect } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Search, RefreshCw, Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { db } from '@/lib/instantdb/client';
import OutlineDisplay from '../OutlineDisplay';
import { getOutline } from '../create/actions';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Outline, OutlineNode } from '@/lib/types';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { getNodePath, getOutlineAsText, getPrompt } from './utils';
import Debug from '@/components/Debug';
import { streamContent } from './ai';
import { readStreamableValue } from 'ai/rsc';
import { saveOutlineNodeContent } from '@/lib/instantdb/mutations';
import { toast } from 'sonner';
import { MarkdownPreview } from '@/components/MarkdownPreview';
import { Textarea } from "@/components/ui/textarea";

function OutlineContent({ outline, selectedNode }: { outline: Outline, selectedNode: OutlineNode }) {
    const [content, setContent] = useState<string | null>(null);
    const [generatedContent, setGeneratedContent] = useState<string | null>(null);
    const [isStreaming, setIsStreaming] = useState(false);
    const [additionalInstructions, setAdditionalInstructions] = useState('');
    const nodePath = selectedNode ? getNodePath(selectedNode.id, outline) : null;
    const outlineAsText = selectedNode ? getOutlineAsText({ outline, selectedNode }) : '';

    useEffect(() => {
        if (selectedNode) {
            setContent(selectedNode.content);
            setGeneratedContent(null);
        }
    }, [selectedNode]);

    if (!nodePath) {
        return (
            <div className="flex-grow">
                <h2 className="text-2xl font-bold mb-4">{outline.title}</h2>
                <p>Please select a node from the outline.</p>
            </div>
        );
    }

    const { ancestors, siblings } = nodePath;
    const handleStreamContent = async () => {
        setIsStreaming(true);
        try {
            const prompt = getPrompt(outlineAsText, selectedNode, additionalInstructions);
            const { object } = await streamContent(prompt);

            for await (const partialObject of readStreamableValue(object)) {
                if (partialObject) {
                    setGeneratedContent(partialObject.content);
                }
            }
        } catch (error) {
            console.error('Error streaming content:', error);
            setGeneratedContent('Failed to generate content. Please try again.');
        } finally {
            setIsStreaming(false);
        }
    };

    const handleSaveContent = async () => {
        if (selectedNode && generatedContent) {
            try {
                const result = await saveOutlineNodeContent(selectedNode.id, generatedContent);
                if (result.success) {
                    toast.success('Content saved successfully');
                    setContent(generatedContent);
                    setGeneratedContent(null);
                } else {
                    toast.error('Failed to save content:', result.error);
                }
            } catch (error) {
                toast.error('Error saving content:', error);
            }
        }
    };

    return (
        <div className="flex-grow">
            <h2 className="text-2xl font-bold mb-4">{selectedNode.title}</h2>
            {content && <MarkdownPreview content={content} />}

            <div className="mt-8 p-4 border border-gray-300 rounded-md">
                <h3 className="text-xl font-semibold mb-4">Customize Content Generation</h3>
                <Textarea
                    placeholder="Additional instructions for content generation..."
                    value={additionalInstructions}
                    onChange={(e) => setAdditionalInstructions(e.target.value)}
                    className="mb-4"
                />
                {!isStreaming && !generatedContent && (
                    <Button onClick={handleStreamContent} disabled={isStreaming}>
                        Generate Content
                    </Button>
                )}
                {!isStreaming && generatedContent && (
                    <div className="flex space-x-2">
                        <Button onClick={handleStreamContent} disabled={isStreaming}>
                            <RefreshCw className="mr-2 h-4 w-4" /> Regenerate
                        </Button>
                        <Button onClick={handleSaveContent}>
                            <Save className="mr-2 h-4 w-4" /> Save Content
                        </Button>
                    </div>
                )}
                {isStreaming && (
                    <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-gray-900 mr-2"></div>
                        <span>Generating content...</span>
                    </div>
                )}
                {generatedContent && (
                    <div className="mt-4 p-4 border-2 border-dashed border-gray-300 rounded-md">
                        <h4 className="text-lg font-semibold mb-2 text-gray-700">Prospective Content</h4>
                        <div className="text-gray-600">
                            <MarkdownPreview content={generatedContent} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function Outlines({ params }: { params: { id: string } }) {
    const { id } = params;
    const { isLoading, error, data } = getOutline(id);
    const outline = data?.outlines?.[0];
    const [selectedNode, setSelectedNode] = useState<OutlineNode | null>(null);

    const handleNodeClick = (node: OutlineNode) => {
        setSelectedNode(node);
    };

    if (isLoading) {
        return (
            <div className="flex-grow p-4">
                <h2 className="text-3xl font-bold mb-6">Loading...</h2>
                <div className="flex flex-col items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 mb-4"></div>
                    <span className="text-gray-500 text-lg">Fetching outline...</span>
                </div>
            </div>
        );
    }

    if (error || !outline) {
        return <div className="flex-grow p-4">Outline not found</div>;
    }

    return (
        <div className="flex-grow flex flex-col">
            <div className="p-4 border-b">
                <div className="flex flex-col md:flex-row justify-start items-start md:items-center space-y-4 md:space-y-0 space-x-4">
                    <Link href="/test/outline-generator/browse">
                        <Button variant="outline" size="sm" className="inline-flex items-center">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-bold mr-4">{outline.title}</h1>
                    <div className="w-4"></div>
                </div>
            </div>
            <div className="flex-grow flex flex-col md:flex-row p-4">
                <div className="md:hidden mb-4">
                    <Collapsible>
                        <CollapsibleTrigger asChild>
                            <Button variant="outline" className="w-full">
                                Toggle Outline
                            </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-2">
                            <div className="border rounded p-2">
                                <OutlineDisplay outline={outline} onSelect={handleNodeClick} />
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                </div>
                <div className="hidden md:block w-[300px] flex-shrink-0 mr-4 overflow-auto">
                    <OutlineDisplay outline={outline} onSelect={handleNodeClick} />
                </div>
                <div className="flex-grow overflow-auto">
                    <OutlineContent outline={outline} selectedNode={selectedNode} />
                </div>
            </div>
        </div>
    );
}

export default Outlines;
