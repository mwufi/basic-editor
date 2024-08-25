'use client'

import { useState, useEffect } from 'react'
import { db } from '@/lib/instantdb/client'
import { tx, id } from '@instantdb/core'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UserProfile, UserOutline } from '@/lib/instantdb/queries'
import { toast } from 'sonner'

export default function OutlineTestPage() {
    const [outline, setOutline] = useState(null)
    const [outlineNodes, setOutlineNodes] = useState([])
    const [newOutlineName, setNewOutlineName] = useState('')
    const [newNodeTitle, setNewNodeTitle] = useState('')
    const [newNodeContent, setNewNodeContent] = useState('')

    const { user } = db.useAuth()
    const { data: profile } = db.useQuery(user ? UserProfile(user.email) : null)
    const currentUserId = profile?.users[0]?.id

    const { data: outlineData, isLoading } = db.useQuery(
        currentUserId ? UserOutline(currentUserId, outline?.id) : null
    )

    useEffect(() => {
        if (outlineData?.outlines?.[0]) {
            setOutline(outlineData.outlines[0])
            setOutlineNodes(outlineData.outlines[0].outlineNodes || [])
        }
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

    const handleAddNode = async () => {
        if (newNodeTitle.trim() && newNodeContent.trim() && outline) {
            try {
                const nodeId = id()
                await db.transact([
                    tx.outlineNodes[nodeId].update({
                        title: newNodeTitle,
                        content: newNodeContent,
                    }).link({
                        author: currentUserId,
                        outline: outline.id
                    })
                ])
                setNewNodeTitle('')
                setNewNodeContent('')
                toast.success('Node added successfully')
            } catch (error) {
                console.error('Error adding node:', error)
                toast.error('Failed to add node')
            }
        }
    }

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

            {outline && (
                <Card className="mb-4">
                    <CardHeader>
                        <CardTitle>{outline.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <h3 className="text-lg font-semibold mb-2">Add New Node</h3>
                        <Input
                            value={newNodeTitle}
                            onChange={(e) => setNewNodeTitle(e.target.value)}
                            placeholder="Node Title"
                            className="mb-2"
                        />
                        <Textarea
                            value={newNodeContent}
                            onChange={(e) => setNewNodeContent(e.target.value)}
                            placeholder="Node Content"
                            className="mb-2"
                        />
                        <Button onClick={handleAddNode}>Add Node</Button>

                        <h3 className="text-lg font-semibold mt-4 mb-2">Outline Nodes</h3>
                        {outlineNodes.map((node) => (
                            <Card key={node.id} className="mb-2">
                                <CardHeader>
                                    <CardTitle>{node.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>{node.content}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
