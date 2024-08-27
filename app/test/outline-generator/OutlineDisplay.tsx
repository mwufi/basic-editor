'use client'

import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

type OutlineNode = {
    id?: string;
    name?: string;
    title?: string;
    children?: OutlineNode[];
};

type OutlineDisplayProps = {
    outline: OutlineNode;
    onSelect?: (node: OutlineNode) => void;
};

const OutlineNodeComponent: React.FC<{ node: OutlineNode; onSelect?: (node: OutlineNode) => void; depth?: number }> = ({ node, onSelect, depth = 0 }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const hasChildren = node.children && node.children.length > 0;

    const toggleExpand = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsExpanded(!isExpanded);
    };

    const handleSelect = () => {
        if (onSelect) {
            onSelect(node);
        }
    };

    return (
        <div key={node.id} style={{ marginLeft: `${depth > 0 ? 2 : 0}em` }}>
            <div
                className="flex items-center cursor-pointer hover:bg-gray-100 p-1 rounded"
                onClick={() => {
                    handleSelect();
                    if (hasChildren) {
                        setIsExpanded(!isExpanded);
                    }
                }}
            >
                {hasChildren && (
                    <div className="w-6 flex-shrink-0">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={toggleExpand}
                            className="p-0 h-6 w-6"
                        >
                            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        </Button>
                    </div>
                )}
                <span className="ml-2">{node.name || node.title}</span>
            </div>
            {hasChildren && (
                <div className={isExpanded ? 'visible' : 'hidden'}>
                    {node.children!.sort((a, b) => (a.index || 0) - (b.index || 0)).map((child) => (
                        <OutlineNodeComponent
                            key={child.id}
                            node={child}
                            onSelect={onSelect}
                            depth={depth + 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const OutlineDisplay: React.FC<OutlineDisplayProps> = ({ outline, onSelect }) => {
    if (!outline) {
        return <div>No outline selected</div>
    }
    const hasChildren = outline.children && outline.children.length > 0;
    return (
        <div className="outline-display">
            <h1 className="text-3xl font-bold mb-4">{outline.title}</h1>
            {hasChildren && outline.children.sort((a, b) => (a.index || 0) - (b.index || 0)).map((child) => (
                <OutlineNodeComponent key={child.id} node={child} onSelect={onSelect} />
            ))}
        </div>
    );
};

export default OutlineDisplay;
