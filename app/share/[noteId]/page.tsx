'use client'

import ReadOnlyEditor from '@/components/editor/ReadOnlyEditor'
import NoteHeader from '@/components/editor/NoteHeader'
import { useEffect } from 'react'
import { getPost } from '@/lib/instantdb/mutations'

interface PageProps {
    params: {
        noteId: string
    }
}

export default function ShareNotePage({ params }: PageProps) {
    console.log("params", params.noteId)
    const { data, isLoading, error } = getPost(params.noteId)
    const note = data?.posts[0] || null

    useEffect(() => {
        if (note?.title) {
            document.title = `${note.title} - Owri`
        }
    }, [note])

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
