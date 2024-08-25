'use client'

import { useState, useEffect } from 'react';
import { readStreamableValue } from 'ai/rsc';
import { streamContent } from './ai';
import useMarkdownDisplay from './MarkdownDisplayer';

const OutlineContent: React.FC<{ node: any }> = ({ node }) => {
    const [content, setContent] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const { insertContent, editor } = useMarkdownDisplay();

    const generateNodeView = (node: any) => {
        if (!node.parents || node.parents.length === 0) {
            return node.title;
        }

        const parentTitle = node.parents[node.parents.length - 1];
        const parentNode = node.parents.reduce((acc: any, title: string) => {
            return acc.children?.find((child: any) => child.title === title) || acc;
        }, { children: [node] });

        const siblings = parentNode.children?.filter((child: any) => child.id !== node.id) || [];

        let view = `${parentTitle}\n`;
        parentNode.children?.forEach((child: any) => {
            view += `- ${child.title}${child.id === node.id ? ' (current)' : ''}\n`;
        });

        return view.trim();
    };

    const nodeView = generateNodeView(node);
    const prompt = node.children && node.children.length > 0
        ? `Generate an overview for this node: ${nodeView}.`
        : `Generate detailed content for the topic: ${nodeView}.`;

    useEffect(() => {
        const fetchContent = async () => {
            setLoading(true);
            try {
                if (node.content) {
                    setContent(node.content);
                } else {
                    const { object } = await streamContent(prompt);

                    for await (const partialObject of readStreamableValue(object)) {
                        if (partialObject && partialObject.content) {
                            setLoading(false);
                            const newContent = partialObject.content;
                            insertContent(newContent);
                            setContent(newContent);
                        }
                    }
                }
            } catch (error) {
                console.error('Error fetching content:', error);
                setContent('Error generating content. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchContent();
    }, [node]);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">{node.title}</h1>
            <pre className="bg-gray-100 p-4 rounded-md mt-4">
                {prompt}
            </pre>
            {loading ? (
                <div>Loading...</div>
            ) : (
                editor
            )}
        </div>
    );
};

export default OutlineContent;
