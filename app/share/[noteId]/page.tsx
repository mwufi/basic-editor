'use client'

import { db } from '@/lib/instantdb/client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ReadOnlyEditor from '@/components/editor/ReadOnlyEditor'
import NoteHeader from '@/components/editor/NoteHeader'

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
        <div className="max-w-3xl mx-auto mt-8">
            <NoteHeader title={note.title} createdAt={note.createdAt} author={note.author?.handle} />
            <main>
                <ReadOnlyEditor content={note.text} font="serif" />
            </main>
        </div>
    )
}
