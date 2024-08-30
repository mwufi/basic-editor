'use client'

import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

type OutlineNode = {
    id?: string;
    name?: string;
    title?: string;
    children?: OutlineNode[];
    content?: string;
    index?: number;
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
        <motion.div
            key={node.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            style={{ marginLeft: `${depth > 0 ? 2 : 0}em` }}
        >
            <motion.div
                className="flex items-center cursor-pointer hover:bg-gray-100 p-1 rounded"
                onClick={() => {
                    handleSelect();
                    if (hasChildren) {
                        setIsExpanded(!isExpanded);
                    }
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                {hasChildren && (
                    <div className="w-6 flex-shrink-0">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={toggleExpand}
                            className="p-0 h-6 w-6"
                        >
                            <motion.div
                                initial={false}
                                animate={{ rotate: isExpanded ? 90 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ChevronRight size={16} />
                            </motion.div>
                        </Button>
                    </div>
                )}
                <motion.span
                    className={`ml-2 ${node.content ? 'text-green-600' : ''}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    {node.name || node.title}
                </motion.span>
            </motion.div>
            <AnimatePresence>
                {hasChildren && isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {node.children!.sort((a, b) => (a.index || 0) - (b.index || 0)).map((child) => (
                            <OutlineNodeComponent
                                key={child.id}
                                node={child}
                                onSelect={onSelect}
                                depth={depth + 1}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const OutlineDisplay: React.FC<OutlineDisplayProps> = ({ outline, onSelect }) => {
    if (!outline) {
        return <div className="min-h-[500px] flex items-center justify-center">No outline selected</div>
    }
    const hasChildren = outline.children && outline.children.length > 0;
    return (
        <motion.div
            className="outline-display min-h-[500px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <AnimatePresence>
                {hasChildren && outline.children.sort((a, b) => (a.index || 0) - (b.index || 0)).map((child) => (
                    <OutlineNodeComponent key={child.id} node={child} onSelect={onSelect} />
                ))}
            </AnimatePresence>
        </motion.div>
    );
};

export default OutlineDisplay;
