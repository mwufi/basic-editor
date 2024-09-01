'use client'

import { useEditor } from '@/components/editor/EditorContext';

import { useEffect, useMemo } from "react"
import { useAtom, useAtomValue, useSetAtom } from 'jotai';

import Editor from '@/components/editor/Editor';
import EditorCharacterCount from '@/components/editor/CharacterCount';
import { noteAtom, noteMetadataAtom, noteTitleAtom, updatedAtAtom } from '@/components/editor/atoms';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import Link from 'next/link';
import { Eye, Pencil, Save } from 'lucide-react';
import HeaderImgEditor from './editor/HeaderImgEditor';
import { saveNoteLocal } from '@/lib/instantdb/mutations';
import SaveButton from './editor/SaveButton';

const Center = ({ children }: { children: React.ReactNode }) => {
    return <div className='relative h-full'><div className="mx-auto max-w-3xl py-6">{children}</div></div>
}

const Tiptap = ({ wordcount = true }) => {
    const { editor } = useEditor();
    const note = useAtomValue(noteAtom);
    const [title, setTitle] = useAtom(noteTitleAtom);
    const setUpdatedAt = useSetAtom(updatedAtAtom);

    // for interactive fun :)
    useEffect(() => {
        if (editor) {
            console.log("Use window.editor to interact with the editor. Have fun!")
            window.editor = editor;
        }
    }, [editor])

    useEffect(() => {
        const saveInterval = setInterval(async () => {
            if (note) {
                console.log("auto-saving note", note.id, note.title)
                /*
                try {
                    const { updatedNote } = await saveNoteLocal(note);
                    setUpdatedAt(updatedNote?.updatedAt);
                } catch (error) {
                    console.error('Error auto-saving note:', error);
                }
                    */
            }
        }, 1000);

        return () => clearInterval(saveInterval);
    }, [note]);

    const editorComponent = useMemo(() => {
        if (!note.text && note.content) {
            console.log("Note has content but no text (legacy)")
        }
        console.log("note memo hit!", note.id, note.title)
        return <Editor initialContent={note.text} />
    }, [note.id])

    return (
        <div className="flex flex-col">
            <div className="absolute left-4 bottom-4 z-10">
                {wordcount && <EditorCharacterCount limit={500} display="words" />}
            </div>
            <HeaderImgEditor />
            <Center>
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
                        <Button
                            variant="outline"
                            size="sm"
                            asChild
                        >
                            <Link href={`/blog/${note.id}`}>
                                <Eye className="w-4 h-4 mr-1" />
                            </Link>
                        </Button>
                        <SaveButton />
                    </div>
                </motion.div>
                <div className="mb-6">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                        className="w-full text-5xl font-bold focus:outline-none"
                        placeholder="Enter title..."
                    />
                </div>
                {editorComponent}
            </Center>
        </div>

    )
}

export default Tiptap
