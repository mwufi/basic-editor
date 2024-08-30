'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import IndexedDBNotesManager from "@/lib/IndexedDBNotesManager"
import Link from 'next/link'
import { useSetAtom } from 'jotai'
import { resetNoteAtom } from '@/components/editor/atoms'
import { motion } from 'framer-motion'

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

const BlogPost = ({ post, index }) => (
    <motion.li
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="mb-4"
    >
        <Link href={`/blog/${post.id}`}>
            <Card className="hover:shadow-lg transition-shadow duration-300 bg-gradient-to-r from-pink-100 to-orange-100">
                <CardContent className="p-6">
                    <h2 className={`text-xl font-semibold mb-2 ${post.isPublished ? 'text-green-600' : 'text-orange-700'}`}>
                        {post.title}
                    </h2>
                    <p className="text-gray-600 mb-2">
                        {new Date(post.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </p>
                    {/* {post.isPublished && (
                        <span className="inline-block bg-green-200 text-green-800 px-2 py-1 rounded-full text-sm">Published</span>
                    )} */}
                </CardContent>
            </Card>
        </Link>
    </motion.li>
)

const BlogSection = ({ title, posts }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
    >
        <h2 className="text-2xl font-semibold mb-4 text-orange-800">{title}</h2>
        <ul className="space-y-4">
            {posts.map((post, index) => (
                <BlogPost key={post.id} post={post} index={index} />
            ))}
        </ul>
    </motion.div>
)

const BlogHome = () => {
    const [publishedPosts, setPublishedPosts] = useState([])
    const [localPosts, setLocalPosts] = useState([])
    const resetNote = useSetAtom(resetNoteAtom)

    useEffect(() => {
        const fetchBlogPosts = async () => {
            const notesManager = new IndexedDBNotesManager()
            const notes = await notesManager.getAllNotes()
            console.log("Retrieved notes", notes)

            const sortedNotes = notes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

            setPublishedPosts(sortedNotes.filter(note => note.isPublished))
            setLocalPosts(sortedNotes.filter(note => !note.isPublished))
        }

        fetchBlogPosts()
    }, [])

    useEffect(() => {
        resetNote()
    }, [])

    const hasNoPosts = publishedPosts.length === 0 && localPosts.length === 0

    return (
        <main className="max-w-3xl mx-auto p-8">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold my-14 text-center text-orange-800"
            >
                Notebook
            </motion.h1>
            {hasNoPosts ? (
                <EmptyState />
            ) : (
                <>
                    {publishedPosts.length > 0 && <BlogSection title="Published" posts={publishedPosts} />}
                    {localPosts.length > 0 && <BlogSection title="Local" posts={localPosts} />}
                </>
            )}
        </main>
    )
}

export default BlogHome
