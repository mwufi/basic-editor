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

    const navItems = [
        { href: "/", name: "Home" },
        { href: "/about", name: "About" },
        { href: "/contact", name: "Contact" },
        { href: "https://github.com/instantdb", name: "InstantDB" },
    ]

    return (
        <div className="min-h-screen w-full">
            <TopNav items={navItems} />
            <BackgroundImageHeader height="h-96">
                <div className="flex flex-col justify-end h-full pb-12 px-4 max-w-3xl mx-auto">
                    <h1 className="text-6xl font-bold text-white leading-tight mb-4 max-w-3xl">
                        Writing
                    </h1>
                </div>
            </BackgroundImageHeader>
            <MinimalPostStyle />
            <BottomFooter />
        </div>
    )
}

export default BlogHome
