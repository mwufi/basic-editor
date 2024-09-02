'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import IndexedDBNotesManager from "@/lib/IndexedDBNotesManager"
import Tiptap from "@/components/TipTap"
import { useAtom, useSetAtom } from 'jotai'
import { noteAtom, uiStateAtom, updatedAtAtom } from '@/components/editor/atoms'
import HeaderImgEditor from '@/components/editor/HeaderImgEditor'

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

    if (!note.text && note.content) {
        console.log("Note has content but no text (legacy)")
    }

    return (
        <>
            <HeaderImgEditor />
            <Tiptap />
        </>
    )
}

export default BlogPost
