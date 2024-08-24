'use client'

import { db } from '@/lib/instantdb/client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ReadOnlyEditor from '@/components/editor/ReadOnlyEditor'

interface PageProps {
    params: {
        noteId: string
    }
}

export default function ShareNotePage({ params }: PageProps) {
    console.log("params", params.noteId)
    const { data, isLoading, error } = db.useQuery({ posts: { $: { where: { id: params.noteId } } } })
    const note = data?.posts[0] || null

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>{error.message}</div>
    if (!note) return <div>Note not found</div>

    return (
        <Card className="max-w-3xl mx-auto mt-8">
            <CardHeader>
                <CardTitle className="text-4xl font-light">{note.title || 'Untitled Note'}</CardTitle>
                <p className="text-gray-500 mb-14">
                    {new Date(note.createdAt).toLocaleDateString()}
                </p>
            </CardHeader>
            <CardContent>
                <ReadOnlyEditor content={note.text} font="serif" />
            </CardContent>
        </Card>
    )
}
