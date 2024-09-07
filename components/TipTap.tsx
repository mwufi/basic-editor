'use client'

import { useEditor } from '@/components/editor/EditorContext';

import { useEffect, useMemo } from "react"
import { useAtom, useAtomValue, useSetAtom } from 'jotai';

import Editor from '@/components/editor/Editor';
import EditorCharacterCount from '@/components/editor/CharacterCount';
import Buttons from '@/components/Buttons';
import { noteAtom, noteTitleAtom, updatedAtAtom } from '@/components/editor/atoms';

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

    // useEffect(() => {
    //     const saveInterval = setInterval(async () => {
    //         if (note) {
    //             console.log("auto-saving note", note.id, note.title)
    //             /*
    //             try {
    //                 const { updatedNote } = await saveNoteLocal(note);
    //                 setUpdatedAt(updatedNote?.updatedAt);
    //             } catch (error) {
    //                 console.error('Error auto-saving note:', error);
    //             }
    //                 */
    //         }
    //     }, 1000);

    //     return () => clearInterval(saveInterval);
    // }, [note]);

    const editorComponent = useMemo(() => {
        if (!note.text && note.content) {
            console.log("Note has content but no text (legacy)")
        }
        console.log("note memo hit!", note.id, note.title)
        return <Editor initialContent={note.text} />
    }, [note.id])

    return (
        <div className="flex flex-col editor relative">
            <div className="absolute left-4 bottom-4 z-10">
                {wordcount && <EditorCharacterCount limit={500} display="words" />}
            </div>
            <Buttons />
            <Center>
                <div className="mb-6">
                    <textarea
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                        className="w-full text-5xl font-bold focus:outline-none title resize-none overflow-hidden"
                        placeholder="Enter title..."
                        rows={Math.max(2, Math.ceil(title.length / 50))}
                        style={{ minHeight: '1.2em' }}
                        onInput={(e) => {
                            e.currentTarget.style.height = 'auto';
                            e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
                        }}
                    />
                </div>
                {editorComponent}
            </Center>
        </div>

    )
}

export default Tiptap
