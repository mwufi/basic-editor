'use client';

import React, { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

export default function OutlineNode({ node, onNodeClick }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
        onNodeClick(node);
    };

    return (
        <div className="ml-4">
            <div className="flex items-center cursor-pointer" onClick={toggleExpand}>
                {node.children ? (
                    isExpanded ? <ChevronDown className="w-4 h-4 mr-1" /> : <ChevronRight className="w-4 h-4 mr-1" />
                ) : (
                    <span className="w-4 h-4 mr-1"></span>
                )}
                <span>{node.title}</span>
            </div>
            {isExpanded && node.children && (
                <div className="ml-4">
                    {node.children.map((child, index) => (
                        <OutlineNode key={index} node={child} onNodeClick={onNodeClick} />
                    ))}
                </div>
            )}
        </div>
    );
}