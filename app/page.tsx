'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import IndexedDBNotesManager from "@/lib/IndexedDBNotesManager"
import Link from 'next/link'
import { useAtomValue, useSetAtom } from 'jotai'
import { noteAtom, resetNoteAtom } from '@/components/editor/atoms'
import { motion } from 'framer-motion'
import { saveNoteLocal } from '@/lib/instantdb/mutations'
import { PlusCircle, Trash2 } from 'lucide-react'

const EmptyState = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Card className="col-span-full bg-orange-50 border-orange-200">
                <CardContent className="flex flex-col items-center justify-center py-12">
                    <p className="text-xl text-orange-600 mb-4">Your cozy corner is waiting for its first story.</p>
                    <Link href="/create">
                        <Button variant="outline" className="bg-orange-100 text-orange-700 hover:bg-orange-200">Start Your First Tale</Button>
                    </Link>
                </CardContent>
            </Card>
        </motion.div>
    )
}

const BlogPost = ({ post, index, onDelete }) => (
    <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
        <Link href={`/blog/${post.id}`} className="block hover:bg-gray-100 p-2 rounded-md transition-colors duration-200">
            <div className="flex justify-start items-center gap-4">
                <h2 className={`text-lg font-semibold ${post.isPublished ? 'text-green-600' : 'text-orange-700'}`}>{post.title}</h2>
                <p className="mr-auto text-sm text-gray-600">
                    {new Date(post.updatedAt).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                </p>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onDelete(post.id);
                    }}
                    className="text-gray-500 hover:text-red-500 transition-colors duration-200"
                    aria-label="Delete note"
                >
                    <Trash2 size={18} />
                </button>
            </div>
        </Link>
    </motion.li>
)

const BlogSection = ({ title, posts, onDelete }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
    >
        <h2 className="text-2xl font-semibold mb-4 text-orange-800">{title}</h2>
        <ul className="list-none">
            {posts.map((post, index) => (
                <BlogPost key={post.id} post={post} index={index} onDelete={onDelete} />
            ))}
        </ul>
    </motion.div>
)

const BlogHome = () => {
    const [publishedPosts, setPublishedPosts] = useState([])
    const [localPosts, setLocalPosts] = useState([])
    const note = useAtomValue(noteAtom)
    const resetNote = useSetAtom(resetNoteAtom)

    const fetchBlogPosts = async () => {
        const notesManager = new IndexedDBNotesManager()
        const notes = await notesManager.getAllNotes()
        console.log("Retrieved notes", notes)

        const sortedNotes = notes.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())

        setPublishedPosts(sortedNotes.filter(note => note.isPublished))
        setLocalPosts(sortedNotes.filter(note => !note.isPublished))
    }

    useEffect(() => {
        fetchBlogPosts()
    }, [])

    useEffect(() => {
        void saveNoteLocal(note)
        resetNote()
    }, [resetNote])

    const handleDelete = async (id) => {
        const notesManager = new IndexedDBNotesManager();
        try {
            await notesManager.deleteNote(id);
            // Refresh the posts after deletion
            await fetchBlogPosts();
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    }

    const hasNoPosts = publishedPosts.length === 0 && localPosts.length === 0

    return (
        <main className="max-w-2xl mx-auto p-8 w-full">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold my-14 text-center text-orange-800"
            >
                Notebook
            </motion.h1>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8 flex justify-center"
            >
                <Link href="/create" passHref>
                    <Button variant="default" size="lg">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Record a thought
                    </Button>
                </Link>
            </motion.div>
            {hasNoPosts ? (
                <EmptyState />
            ) : (
                <>
                    {publishedPosts.length > 0 && <BlogSection title="Published" posts={publishedPosts} onDelete={handleDelete} />}
                    {localPosts.length > 0 && <BlogSection title="Local" posts={localPosts} onDelete={handleDelete} />}
                </>
            )}
        </main>
    )
}

export default BlogHome
