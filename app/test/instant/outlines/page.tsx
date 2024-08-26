'use client'

import { useState, useEffect } from 'react'
import { db } from '@/lib/instantdb/client'
import { tx, id } from '@instantdb/core'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UserProfile, UserOutline } from '@/lib/instantdb/queries'
import { toast } from 'sonner'
import OutlineNode from '@/app/expander/OutlineNode'

import { loadOutline } from '@/app/expander/outlines/dynamicProgramming';

export default function OutlineTestPage() {
    const [outline, setOutline] = useState(null)
    const [newOutlineName, setNewOutlineName] = useState('')
    const [newTopLevelNodeTitle, setNewTopLevelNodeTitle] = useState('')

    const { user } = db.useAuth()
    const { data: profile } = db.useQuery(user ? UserProfile(user.email) : null)
    const currentUserId = profile?.users[0]?.id

    const { data: outlineData, isLoading } = db.useQuery(
        currentUserId ? UserOutline(outline?.id) : null
    )

    console.log(outlineData?.outlines?.[0])

    useEffect(() => {
        if (outlineData?.outlines?.[0]) {
            setOutline(outlineData.outlines[0])
        }
        document.title = outlineData?.outlines?.[0]?.name || 'Outline Test Page'
    }, [outlineData])

    const handleCreateOutline = async () => {
        if (newOutlineName.trim()) {
            try {
                const outlineId = id()
                await db.transact([
                    tx.outlines[outlineId].update({
                        name: newOutlineName,
                        content: {},
                    }).link({
                        author: currentUserId
                    })
                ])
                setNewOutlineName('')
                toast.success('Outline created successfully')
            } catch (error) {
                console.error('Error creating outline:', error)
                toast.error('Failed to create outline')
            }
        }
    }

    const handleDeleteNode = async (nodeId) => {
        try {
            await db.transact([
                tx.outlineNodes[nodeId].delete()
            ])
            toast.success('Node deleted successfully')
        } catch (error) {
            console.error('Error deleting node:', error)
            toast.error('Failed to delete node')
        }
    }

    const handleAddChildNode = async (parentId, title) => {
        if (title.trim() && outline) {
            try {
                const nodeId = id()
                await db.transact([
                    tx.outlineNodes[nodeId].update({
                        title: title,
                        content: ''
                    }).link({
                        author: currentUserId,
                        outline: outline.id,
                        parent: parentId
                    })
                ])
                toast.success('Child node added successfully')
            } catch (error) {
                console.error('Error adding child node:', error)
                toast.error('Failed to add child node')
            }
        }
    }

    const handleAddTopLevelNode = async () => {
        if (newTopLevelNodeTitle.trim() && outline) {
            try {
                const nodeId = id()
                await db.transact([
                    tx.outlineNodes[nodeId].update({
                        title: newTopLevelNodeTitle,
                        content: '',
                    }).link({
                        author: currentUserId,
                        outline: outline.id
                    })
                ])
                setNewTopLevelNodeTitle('')
                toast.success('Top level node added successfully')
            } catch (error) {
                console.error('Error adding top level node:', error)
                toast.error('Failed to add top level node')
            }
        }
    }

    const [preloadedOutline, setPreloadedOutline] = useState(null);

    const handleLoadOutline = () => {
        const loadedOutline = loadOutline();
        setPreloadedOutline(loadedOutline);
    };

    const handleBulkAdd = async () => {
        if (!outline || !preloadedOutline) return;

        function buildTx(node, parentId, index) {
            const nodeId = id()
            return [
                tx.outlineNodes[nodeId].update({
                    title: node.title,
                    index: index,
                    content: '',
                }).link({
                    author: currentUserId,
                    outline: outline.id,
                    ...(parentId && { parent: parentId })
                }),
                ...(node.children?.flatMap((child, index, _) => buildTx(child, nodeId, index)) || []),
            ]
        }

        await db.transact(buildTx(preloadedOutline, null, 0))
    };

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Outline Test Page</h1>

            <Card className="mb-4">
                <CardHeader>
                    <CardTitle>Create New Outline</CardTitle>
                </CardHeader>
                <CardContent>
                    <Input
                        value={newOutlineName}
                        onChange={(e) => setNewOutlineName(e.target.value)}
                        placeholder="Outline Name"
                        className="mb-2"
                    />
                    <Button onClick={handleCreateOutline}>Create Outline</Button>
                </CardContent>
            </Card>

            <Card className="mb-4">
                <CardHeader>
                    <CardTitle>Load Preloaded Outline</CardTitle>
                </CardHeader>
                <CardContent>
                    <Button onClick={handleLoadOutline} className="mb-2">Load Outline</Button>
                    {preloadedOutline && (
                        <div>
                            <p className="mb-2">Loaded: {preloadedOutline.title}</p>
                            <div className="mt-2 mb-4 max-h-60 overflow-y-auto border border-gray-200 rounded p-2">
                                <h3 className="font-semibold mb-2">Outline Structure:</h3>
                                <pre>{JSON.stringify(preloadedOutline, null, 2)}</pre>
                            </div>
                            <Button onClick={handleBulkAdd}>Bulk Add to Current Outline</Button>
                        </div>
                    )}
                </CardContent>
            </Card>

            {outline && (
                <Card className="mb-4">
                    <CardHeader>
                        <CardTitle>{outline.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4">
                            <Input
                                value={newTopLevelNodeTitle}
                                onChange={(e) => setNewTopLevelNodeTitle(e.target.value)}
                                placeholder="New Top Level Node Title"
                                className="mb-2"
                            />
                            <Button onClick={handleAddTopLevelNode}>Add Top Level Node</Button>
                        </div>
                        {outline.outlineNodes && outline.outlineNodes.filter(node => node.parent.length === 0).map((node) => (
                            <OutlineNode
                                key={node.id}
                                node={node}
                                onNodeClick={(e) => console.log(e)}
                                onDelete={null}
                                onAddChild={null}
                            />
                        ))}
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
