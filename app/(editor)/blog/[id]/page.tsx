'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import IndexedDBNotesManager from "@/lib/IndexedDBNotesManager"
import { Button } from '@/components/ui/button'
import NoteHeader from '@/components/editor/NoteHeader'
import { useAtom, useAtomValue } from 'jotai'
import { noteAtom, noteMetadataAtom } from '@/components/editor/atoms'
import ReadOnlyEditor from '@/components/editor/ReadOnlyEditor'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Pencil } from 'lucide-react'

const BlogPost = () => {
    const [note, setNote] = useAtom(noteAtom)
    const { id } = useParams()
    const metadata = useAtomValue(noteMetadataAtom)

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
        <main className="max-w-3xl mx-auto">
            {metadata?.headerImg && (
                <img
                    src={metadata.headerImg}
                    alt="Header"
                    className="w-full h-64 object-cover mb-6"
                />
            )}

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

                <div className="mb-4 flex items-center gap-2">
                    {note.publishedId && (
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
                    )}
                    <Button
                        variant="outline"
                        size="sm"
                        asChild
                    >
                        <Link href={`/blog/${note.id}/edit`}>
                            <Pencil className="w-4 h-4 mr-1" />
                        </Link>
                    </Button>
                </div>
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
