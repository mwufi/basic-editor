'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import IndexedDBNotesManager from "@/lib/IndexedDBNotesManager"
import Tiptap from "@/components/TipTap"
import { useAtom } from 'jotai'
import { noteAtom, uiStateAtom } from '@/components/editor/atoms'
import { saveNoteLocal } from '@/lib/instantdb/mutations'

const BlogPost = () => {
    const [note, setNote] = useAtom(noteAtom)
    const { id } = useParams()
    const [uiState, setUiState] = useAtom(uiStateAtom);

    const fetchPost = async () => {
        const notesManager = new IndexedDBNotesManager()
        const fetchedNote = await notesManager.getNote(parseInt(id as string))
        setNote(fetchedNote)
    }

    useEffect(() => {
        const saveInterval = setInterval(async () => {
            if (note) {
                try {
                    await saveNoteLocal(note);
                    console.log('Auto-saved note');
                } catch (error) {
                    console.error('Error auto-saving note:', error);
                }
            }
        }, 10000);

        return () => clearInterval(saveInterval);
    }, [note]);

    useEffect(() => {
        fetchPost()
    }, [id])

    useEffect(() => {
        setUiState({ ...uiState, isInserting: true })
        return () => {
            setUiState({ ...uiState, isInserting: false })
        }
    }, [])

    if (!note) {
        return <div>Loading...</div>
    }

    const noteContent = note.text || note.content
    if (!note.text && note.content) {
        console.log("Note has content but no text (legacy)")
    }

    return (
        <main className="max-w-3xl mx-auto p-4">
            <Tiptap />
        </main>
    )
}

export default BlogPost
