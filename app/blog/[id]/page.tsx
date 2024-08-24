'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import IndexedDBNotesManager from "@/lib/IndexedDBNotesManager"
import Tiptap from "@/components/TipTap"
import { Button } from '@/components/ui/button'
import Editor from '@/components/editor/Editor'

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
        <div className="overflow-y-scroll min-h-screen w-full">
            <main className="max-w-3xl mx-auto p-4">
                {!isEditing ? (
                    <>
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-4xl font-bold">{post.title}</h1>
                            <Button onClick={handleEditToggle}>Edit</Button>
                        </div>
                        <p className="text-gray-500 mb-4">
                            {new Date(post.createdAt).toLocaleDateString()}
                        </p>
                        <Editor content={post.content} font="serif" editable={false} />
                    </>
                ) : (
                    <>
                        <div className="flex justify-end mb-4">
                            <Button onClick={handleEditToggle}>View</Button>
                        </div>
                        <Tiptap note={post} />
                    </>
                )}
            </main>
        </div>
    )
}

export default BlogPost
