'use client'

import { useState, useEffect } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { db } from '@/lib/instantdb/client';
import OutlineDisplay from '../OutlineDisplay';
import { getOutline } from '../create/actions';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Outline, OutlineNode } from '@/lib/types';

const getNodePath = (nodeId: string, rootNode: any): { ancestors: string[], siblings: string[] } | null => {
    const stack: { node: any; parentNode: any | null; ancestorPath: string[] }[] = [{ node: rootNode, parentNode: null, ancestorPath: [] }];

    while (stack.length > 0) {
        const { node, parentNode, ancestorPath } = stack.pop()!;

        if (node.id === nodeId) {
            const siblings = parentNode?.children
                ?.filter((child: any) => child.id !== nodeId)
                .map((child: any) => child.title) || [];
            return { ancestors: ancestorPath, siblings };
        }

        if (node.children && node.children.length > 0) {
            const newAncestorPath = [...ancestorPath, node.title];
            for (let i = node.children.length - 1; i >= 0; i--) {
                stack.push({ node: node.children[i], parentNode: node, ancestorPath: newAncestorPath });
            }
        }
    }

    return null;
};

function OutlineContent({ outline, selectedNode }: { outline: Outline, selectedNode: OutlineNode }) {
    const nodePath = selectedNode ? getNodePath(selectedNode.id, outline) : null;

    if (!nodePath) {
        return (
            <div className="flex-grow">
                <h2 className="text-2xl font-bold mb-4">{outline.title}</h2>
                <p>Please select a node from the outline.</p>
            </div>
        );
    }

    const { ancestors, siblings } = nodePath;
    return (
        <div className="flex-grow">
            <h2 className="text-2xl font-bold mb-4">{selectedNode.title}</h2>
            <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Ancestors:</h3>
                <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(ancestors, null, 2)}</pre>
            </div>
            <div>
                <h3 className="text-lg font-semibold mb-2">Siblings:</h3>
                <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(siblings, null, 2)}</pre>
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
        <div className="flex-grow p-4 flex">
            <div className="w-[300px] flex-shrink-0 mr-4">
                <div className="mb-4">
                    <Link href="/test/outline-generator/browse">
                        <Button variant="outline" size="sm" className="inline-flex items-center">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Browse
                        </Button>
                    </Link>
                </div>
                <OutlineDisplay outline={outline} onSelect={handleNodeClick} />
            </div>
            <div className="flex-grow">
                <OutlineContent outline={outline} selectedNode={selectedNode} />
            </div>
        </div>
    );
}

export default Outlines;
