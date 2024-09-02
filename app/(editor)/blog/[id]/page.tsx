'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import IndexedDBNotesManager from "@/lib/IndexedDBNotesManager"
import { Button } from '@/components/ui/button'
import NoteHeader from '@/components/editor/NoteHeader'
import { useAtom, useAtomValue } from 'jotai'
import { noteAtom, noteMetadataAtom, themeContentAtom } from '@/components/editor/atoms'
import ReadOnlyEditor from '@/components/editor/ReadOnlyEditor'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Pencil } from 'lucide-react'
import { HeaderImgDisplay } from '@/components/editor/HeaderImgEditor'
import { useTheme } from '@/app/test/themes/themeContext'
import Buttons from '@/components/Buttons'

const BlogPost = () => {
    const [note, setNote] = useAtom(noteAtom)
    const { id } = useParams()
    const metadata = useAtomValue(noteMetadataAtom)
    const themeContent = useAtomValue(themeContentAtom)
    useEffect(() => {
        console.log('themeContent', themeContent)
    }, [themeContent])

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
        <main>
            <HeaderImgDisplay />
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0 * 0.1 }}
                    className="mb-4"
                >
                    <NoteHeader title={note.title} createdAt={note.createdAt} author={note.author?.handle} />
                </motion.div>

                <Buttons />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 2 * 0.1 }}
                    className="mb-4"
                >
                    <ReadOnlyEditor initialContent={noteContent} font="serif" />
                </motion.div>
            </div>
        </main>
    )
}

export default BlogPost
