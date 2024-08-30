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
                    {post.isPublished && (
                        <span className="inline-block bg-green-200 text-green-800 px-2 py-1 rounded-full text-sm">Published</span>
                    )}
                </CardContent>
            </Card>
        </Link>
    </motion.li>
)

const BlogHome = () => {
    const [blogPosts, setBlogPosts] = useState([])
    const resetNote = useSetAtom(resetNoteAtom)

    useEffect(() => {
        const fetchBlogPosts = async () => {
            const notesManager = new IndexedDBNotesManager()
            const notes = await notesManager.getAllNotes()
            console.log("Retrieved notes", notes)
            setBlogPosts(notes)
        }

        fetchBlogPosts()
    }, [])

    useEffect(() => {
        resetNote()
    }, [])

    return (
        <div className="overflow-y-scroll min-h-screen w-full bg-gradient-to-b from-orange-50 to-pink-50">
            <main className="max-w-3xl mx-auto p-8">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl font-bold my-14 text-center text-orange-800"
                >
                    Notebook
                </motion.h1>
                {blogPosts.length === 0 ? (
                    <EmptyState />
                ) : (
                    <ul className="space-y-4">
                        {blogPosts.map((post, index) => (
                            <BlogPost key={post.id} post={post} index={index} />
                        ))}
                    </ul>
                )}
            </main>
        </div>
    )
}

export default BlogHome
