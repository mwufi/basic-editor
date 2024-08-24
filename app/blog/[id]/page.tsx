'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import IndexedDBNotesManager from "@/lib/IndexedDBNotesManager"
import Tiptap from "@/components/TipTap"
import { Button } from '@/components/ui/button'
import Editor from '@/components/editor/Editor'
import NoteHeader from '@/components/editor/NoteHeader'

const BlogPost = () => {
    const [post, setPost] = useState(null)
    const [isEditing, setIsEditing] = useState(false)
    const { id } = useParams()

    const fetchPost = async () => {
        const notesManager = new IndexedDBNotesManager()
        const fetchedPost = await notesManager.getNote(parseInt(id as string))
        setPost(fetchedPost)
    }

    useEffect(() => {
        fetchPost()
    }, [id, isEditing])

    const handleEditToggle = () => {
        setIsEditing(!isEditing)
    }

    if (!post) {
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
                        <NoteHeader title={post.title} createdAt={post.createdAt} author={post.author?.handle} />
                        <Editor content={post.content} font="serif" editable={false} />
                    </>
                ) : (
                    <Tiptap note={post} />
                )}
            </main>
        </div>
    )
}

export default BlogPost
