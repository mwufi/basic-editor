'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import IndexedDBNotesManager from "@/lib/IndexedDBNotesManager"
import Link from 'next/link'
import MinimalPostStyle from '@/components/blocks/MinimalPostStyle'

const EmptyState = () => {
    return (
        <Card className="col-span-full">
            <CardContent className="flex flex-col items-center justify-center py-12">
                <p className="text-xl text-gray-500 mb-4">You haven't created any blog posts yet.</p>
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
        <div className="">
            <MinimalPostStyle />
        </div>
    )
}

export default BlogHome
