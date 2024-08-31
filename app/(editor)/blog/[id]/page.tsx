'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import IndexedDBNotesManager from "@/lib/IndexedDBNotesManager"
import { Button } from '@/components/ui/button'
import NoteHeader from '@/components/editor/NoteHeader'
import { useAtom } from 'jotai'
import { noteAtom } from '@/components/editor/atoms'
import ReadOnlyEditor from '@/components/editor/ReadOnlyEditor'
import Link from 'next/link'
import { motion } from 'framer-motion'

const BlogPost = () => {
    const [note, setNote] = useAtom(noteAtom)
    const { id } = useParams()

    const fetchPost = async () => {
        const notesManager = new IndexedDBNotesManager()
        const fetchedNote = await notesManager.getNote(parseInt(id as string))
        setNote(fetchedNote)
    }

    useEffect(() => {
        fetchPost()
    }, [id])


    if (!note) {
        return <div>Loading...</div>
    }

    const noteContent = note.text || note.content
    if (!note.text && note.content) {
        console.log("Note has content but no text (legacy)")
    }

    return (
        <main className="max-w-3xl mx-auto p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0 * 0.1 }}
                className="mb-4"
            >
                <NoteHeader title={note.title} createdAt={note.createdAt} author={note.author?.handle} />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 * 0.1 }}
                className="mb-4"
            >

                {note.isPublished && !note.publishedId && (
                    <div className="mb-4">
                        <p className="text-red-500 font-semibold">
                            Error: Note is marked as published but has no published ID.
                        </p>
                    </div>
                )}

                {note.publishedId && (
                    <div className="mb-4">
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-green-500 hover:text-green-600"
                            asChild
                        >
                            <a href={`/share/${note.publishedId}`}>
                                Published
                            </a>
                        </Button>
                    </div>
                )}
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 2 * 0.1 }}
                className="mb-4"
            >
                <ReadOnlyEditor initialContent={noteContent} font="serif" />
            </motion.div>
        </main>
    )
}

export default BlogPost
