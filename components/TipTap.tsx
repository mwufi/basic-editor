'use client'

import { useEditor } from '@/components/editor/EditorContext';

import { useEffect, useMemo } from "react"
import { useAtom, useAtomValue } from 'jotai';

import Editor from '@/components/editor/Editor';
import EditorCharacterCount from '@/components/editor/CharacterCount';
import { noteAtom, noteTitleAtom } from '@/components/editor/atoms';

const Center = ({ children }: { children: React.ReactNode }) => {
    return <div className='relative h-full'><div className="mx-auto max-w-3xl py-6">{children}</div></div>
}

const Tiptap = ({ wordcount = true }) => {
    const { editor } = useEditor();
    const note = useAtomValue(noteAtom);
    const [title, setTitle] = useAtom(noteTitleAtom);

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
