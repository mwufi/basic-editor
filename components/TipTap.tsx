'use client'

import { useEditor } from '@/components/editor/EditorContext';

import { useEffect, useMemo } from "react"
import { useAtom, useAtomValue } from 'jotai';

import Editor from '@/components/editor/Editor';
import EditorCharacterCount from '@/components/editor/CharacterCount';
import { noteAtom, noteMetadataAtom, noteTitleAtom } from '@/components/editor/atoms';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import Link from 'next/link';
import { Eye, Pencil } from 'lucide-react';

const Center = ({ children }: { children: React.ReactNode }) => {
    return <div className='relative h-full'><div className="mx-auto max-w-3xl py-6">{children}</div></div>
}

const Tiptap = ({ wordcount = true }) => {
    const { editor } = useEditor();
    const note = useAtomValue(noteAtom);
    const [title, setTitle] = useAtom(noteTitleAtom);
    const [metadata, setMetadata] = useAtom(noteMetadataAtom);

    // for interactive fun :)
    useEffect(() => {
        if (editor) {
            console.log("Use window.editor to interact with the editor. Have fun!")
            window.editor = editor;
        }
    }, [editor])

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
            <Center>
                {metadata?.headerImg ? (
                    <img
                        src={metadata.headerImg}
                        alt="Header"
                        className="w-full h-64 object-cover mb-6"
                    />
                ) : (
                    <button
                        onClick={() => {
                            const url = prompt("Enter header image URL:");
                            if (url) {
                                setMetadata({ ...metadata, headerImg: url });
                            }
                        }}
                        className="w-full h-64 border-2 border-dashed border-gray-300 flex items-center justify-center mb-6 hover:bg-gray-50 transition-colors"
                    >
                        Add Header Image
                    </button>
                )}
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
