'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import IndexedDBNotesManager from "@/lib/IndexedDBNotesManager"
import TopNav from '@/components/blocks/TopNav'
import BottomFooter from '@/components/blocks/BottomFooter'
import ReadOnlyEditor from '@/components/editor/ReadOnlyEditor'

const BlogPost = () => {
    const [post, setPost] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        console.log("id", id)
        const fetchPost = async () => {
            const notesManager = new IndexedDBNotesManager()
            const fetchedPost = await notesManager.getNote(parseInt(id))
            setPost(fetchedPost)
        }

        fetchPost()
    }, [id])

    if (!post) {
        return <div>Loading...</div>
    }

    return (
        <div className="overflow-y-scroll min-h-screen w-full">
            <TopNav items={[
                { href: "/", name: "Home" },
                { href: "/about", name: "About" },
                { href: "/new", name: "New Post" },
            ]} />
            <main className="max-w-3xl mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
                <p className="text-gray-500 mb-4">
                    {new Date(post.createdAt).toLocaleDateString()}
                </p>
                <ReadOnlyEditor content={post.content} font="serif" />
            </main>
            <BottomFooter />
        </div>
    )
}

export default BlogPost
