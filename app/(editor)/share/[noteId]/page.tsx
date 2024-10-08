'use client'

import ReadOnlyEditor from '@/components/editor/ReadOnlyEditor'
import NoteHeader from '@/components/editor/NoteHeader'
import { useEffect } from 'react'
import { getPost } from '@/lib/instantdb/mutations'
import { HeaderImgDisplay } from '@/components/editor/HeaderImgEditor'

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
        <>
            <HeaderImgDisplay url={note?.metadata?.headerImg} />
            <div className="max-w-3xl mx-auto">
                <NoteHeader title={note.title} createdAt={note.createdAt} author={note.author?.handle} />
                <main>
                    <ReadOnlyEditor initialContent={note.text} font="serif" />
                </main>
            </div>
        </>
    )
}
