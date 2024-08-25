
'use client'

import { useState } from 'react';
import OutlineNode from './OutlineNode';
import OutlineContent from './OutlineContent';
import { loadOutline } from './outlines/dynamicProgramming';

export default function DynamicProgrammingOutline() {
    const [outline, setOutline] = useState(loadOutline());
    const [selectedNode, setSelectedNode] = useState(null);

    const handleNodeClick = (node) => {
        setSelectedNode(node);
    };

    return (
        <div className="flex p-4">
            <div className="w-1/3 pr-4">
                <h2 className="text-2xl font-bold mb-4">Dynamic Programming Outline</h2>
                {outline.map((node, index) => (
                    <OutlineNode
                        key={index}
                        node={node}
                        onNodeClick={handleNodeClick}
                    />
                ))}
            </div>
            <div className="w-2/3 pl-4">
                {selectedNode && <OutlineContent node={selectedNode} />}
            </div>
        </div>
    );
};
