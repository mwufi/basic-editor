'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import IndexedDBNotesManager from "@/lib/IndexedDBNotesManager"
import Link from 'next/link'
import MinimalPostStyle from '@/components/blocks/MinimalPostStyle'
import TopNav from '@/components/blocks/TopNav'
import BottomFooter from '@/components/blocks/BottomFooter'
import BackgroundImageHeader from '@/components/blocks/BackgroundImageHeader'

const EmptyState = () => {
    return (
        <Card className="col-span-full">
            <CardContent className="flex flex-col items-center justify-center py-12">
                <p className="text-xl text-gray-500 mb-4">You haven&apos;t created any blog posts yet.</p>
                <Link href="/new">
                    <Button variant="outline">Create Your First Post</Button>
                </Link>
            </CardContent>
        </Card>
    )
}


const BlogHome = () => {
    const [name, setName] = useState("Your Name")
    const [blogPosts, setBlogPosts] = useState([])

    useEffect(() => {
        const fetchBlogPosts = async () => {
            const notesManager = new IndexedDBNotesManager()
            const notes = await notesManager.getAllNotes()
            console.log("Retrieved notes", notes)
            setBlogPosts(notes)
        }

        fetchBlogPosts()
    }, [])
    return (
        <div className="overflow-y-scroll min-h-screen w-full">
            <TopNav items={[
                { href: "/", name: "Home" },
                { href: "/about", name: "About" },
                { href: "/new", name: "New Post" },
            ]} />
            <main className="max-w-3xl mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Your Blog Posts</h1>
                {blogPosts.length === 0 ? (
                    <EmptyState />
                ) : (
                    <ul className="space-y-2">
                        {blogPosts.map((post, index) => (
                            <li key={index} className="flex justify-between items-center hover:bg-gray-100 p-2">
                                <Link href={`/blog/${post.id}`} className="flex-1">
                                    <span className="font-medium">{post.title}</span>
                                </Link>
                                <span className="text-gray-500">
                                    {new Date(post.createdAt).toLocaleDateString()}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </main>
            <BottomFooter />
        </div>
    )
}

export default BlogHome
