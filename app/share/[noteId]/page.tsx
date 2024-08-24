'use client'

import { db } from '@/lib/instantdb/client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PageProps {
    params: {
        noteId: string
    }
}

export default function ShareNotePage({ params }: PageProps) {
    console.log("params", params.noteId)
    const { data, isLoading, error } = db.useQuery({ posts: { $: { where: { id: params.noteId } } } })
    const note = data?.posts[0] || null

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>{error.message}</div>

    console.log("note", note)
    return (
        <Card className="max-w-2xl mx-auto mt-8">
            <CardHeader>
                <CardTitle>{note?.title || 'Untitled Note'}</CardTitle>
            </CardHeader>
            <CardContent>
                <p>{note?.text}</p>
            </CardContent>
        </Card>
    )
}
