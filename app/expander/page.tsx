
'use client'

import { useEffect, useState } from 'react';
import OutlineNode from './OutlineNode';
import { loadOutline, generateNodeView } from './outlines/dynamicProgramming';
import { readStreamableValue } from 'ai/rsc';
import { streamContent } from './ai';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Markdown } from 'tiptap-markdown';
import { db } from '@/lib/instantdb/client';
import { UserProfile } from '@/lib/instantdb/queries';
import { id, tx } from '@instantdb/react';

export default function DynamicProgrammingOutline() {
    const [outline, setOutline] = useState(loadOutline());
    const [selectedNode, setSelectedNode] = useState(null);
    const [loading, setLoading] = useState(false);

    const prompt = selectedNode?.children && selectedNode.children.length > 0
        ? `Generate an overview for this node:\n ${generateNodeView(selectedNode)}.`
        : `Generate detailed content for the topic:\n ${generateNodeView(selectedNode)}.`;

    const handleNodeClick = (node) => {
        setSelectedNode(node);
    };

    // use InstantDB!
    const { user } = db.useAuth();
    const { data: profile } = db.useQuery(user ? UserProfile(user.email) : null)
    const currentUserId = profile?.users[0].id

    async function saveOutline() {
        const outlineId = id()
        const savedOutline = {
            id: outlineId,
            name: outline.title,
            content: outline.children
        }
        await db.transact([
            tx.outlines[outlineId].update(savedOutline).link({
                author: currentUserId
            })
        ])
    }

    async function saveContent(){
        const contentId = id()
        const savedContent = {
            id: contentId,
            text: editor?.getHTML()
        }
        await db.transact([
            tx.posts[contentId].update(savedContent).link({
                author: currentUserId
            })
        ])
    }

    useEffect(() => {
        if (!selectedNode) return;
        async function generateContent() {
            setLoading(true);
            const { object } = await streamContent(prompt);

            for await (const partialObject of readStreamableValue(object)) {
                if (partialObject && partialObject.content) {
                    const newContent = partialObject.content;
                    editor?.commands.setContent(newContent);
                }
            }

            await db.transact([
                tx.posts[id()].update({
                    text: newPostText,
                    createdAt: Date.now()
                }).link({
                    author: currentUserId
                })
            ])
            setLoading(false);
        }
        generateContent();
    }, [selectedNode])

    const editor = useEditor({
        extensions: [StarterKit, Markdown],
        content: '',
        editable: false,
    });

    return (
        <div className="flex p-4">
            <div className="w-1/3 pr-4">
                <h2 className="text-2xl font-bold mb-4">{outline.title}</h2>
                {outline.children.map((node, index) => (
                    <OutlineNode
                        key={index}
                        node={node}
                        onNodeClick={handleNodeClick}
                    />
                ))}
            </div>
            <div className="w-2/3 pl-4">
                {selectedNode && (
                    <>
                        <h1 className="text-3xl font-bold mb-4">{selectedNode?.title}</h1>
                        <EditorContent editor={editor} />
                        {loading && (
                            <div className="mt-4 p-4 border border-gray-300 rounded-md flex items-center justify-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mr-3"></div>
                                <span className="text-gray-600">Generating page...</span>
                            </div>
                        )}
                        <pre className="bg-gray-100 p-4 rounded-md mt-4">
                            {prompt}
                        </pre>
                    </>
                )}
            </div>
        </div>
    );
};
