'use client';

import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function OutlineNode({ node, onNodeClick, onDelete = null, onAddChild = null }) {
    const [showAddChild, setShowAddChild] = useState(false)
    const [newChildTitle, setNewChildTitle] = useState('')
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
        if (onNodeClick) {
            onNodeClick(node);
        }
    };
    const handleAddChild = () => {
        onAddChild(node.id, newChildTitle)
        setNewChildTitle('')
        setShowAddChild(false)
    }

    return (
        <div className="ml-4">
            <div className="flex items-center cursor-pointer" onClick={toggleExpand}>
                {node.children && node.children.length > 0 ? (
                    isExpanded ? <ChevronDown className="w-4 h-4 mr-1" /> : <ChevronRight className="w-4 h-4 mr-1" />
                ) : (
                    <span className="w-4 h-4 mr-1"></span>
                )}
                <span>{node.title}</span>
                {node.parent && (
                    <div>
                        {onAddChild && <Button variant="ghost" size="sm" onClick={() => setShowAddChild(!showAddChild)}>
                            <Plus size={16} />
                        </Button>}
                        {onDelete && <Button variant="ghost" size="sm" onClick={() => onDelete(node.id)}>
                            <Trash2 size={16} />
                        </Button>}
                    </div>
                )}
            </div>
            {isExpanded && node.children && (
                <div className="ml-4">
                    {node.children.sort((a, b) => a.index - b.index).map((child, index) => (
                        <OutlineNode key={index} node={child} onNodeClick={onNodeClick}
                            onDelete={onDelete}
                            onAddChild={onAddChild} />
                    ))}
                </div>
            )}
        </div>
    );
}