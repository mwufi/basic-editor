'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import IndexedDBNotesManager from "@/lib/IndexedDBNotesManager"
import Tiptap from "@/components/TipTap"
import { Button } from '@/components/ui/button'
import Editor from '@/components/editor/Editor'
import NoteHeader from '@/components/editor/NoteHeader'
import { Note } from '@/lib/types'

const BlogPost = () => {
    const [note, setNote] = useState<Note | null>(null)
    const [isEditing, setIsEditing] = useState(false)
    const { id } = useParams()

    const fetchPost = async () => {
        const notesManager = new IndexedDBNotesManager()
        const fetchedNote = await notesManager.getNote(parseInt(id as string))
        setNote(fetchedNote)
    }

    useEffect(() => {
        fetchPost()
    }, [id, isEditing])

    const handleEditToggle = () => {
        setIsEditing(!isEditing)
    }

    if (!note) {
        return <div>Loading...</div>
    }

    return (
        <div className="overflow-y-scroll min-h-screen w-full relative">
            <div className="absolute top-4 right-4 z-10">
                <Button onClick={handleEditToggle}>
                    {isEditing ? 'View' : 'Edit'}
                </Button>
            </div>
            <main className="max-w-3xl mx-auto p-4">
                {!isEditing ? (
                    <>
                        <NoteHeader title={note.title} createdAt={note.createdAt} author={note.author?.handle} />
                        {note.isPublished && (
                            <div className="mb-4">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-green-500 hover:text-green-600"
                                    asChild
                                >
                                    <a href={`/share/${note.publishedId}`}>
                                        Published
                                    </a>
                                </Button>
                            </div>
                        )}
                        <Editor content={note.content || note.text} font="serif" editable={false} />
                    </>
                ) : (
                    <Tiptap />
                )}
            </main>
        </div>
    )
}

export default BlogPost
