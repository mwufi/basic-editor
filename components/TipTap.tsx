'use client'

import { useEditor } from '@/components/editor/EditorContext';

import { Button } from "@/components/ui/button"
import { useEffect, useMemo } from "react"
import SimpleDialog from './blocks/SimpleDialog';
import Link from 'next/link';
import { useAtomValue } from 'jotai';

import Editor, { insertCustomButton, insertGallery } from '@/components/editor/Editor';
import EditorCharacterCount from '@/components/editor/CharacterCount';
import { noteAtom } from '@/components/editor/atoms';

const Center = ({ children }: { children: React.ReactNode }) => {
    return <div className='relative h-full'><div className="mx-auto max-w-3xl py-6">{children}</div></div>
}

const Tiptap = ({ wordcount = true }) => {
    const { editor } = useEditor();
    const note = useAtomValue(noteAtom);

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
        console.log("note memo  hit!")
        return <Editor initialContent={note.text || note.content} />
    }, [note.id])

    return (
        <div className="flex flex-col">
            <div className="fixed left-4 bottom-4 z-10">
                {wordcount && <EditorCharacterCount limit={500} display="words" />}
                <SimpleDialog
                    schema={[{ url: 'text' }]}
                    onSubmit={({ url }) => {
                        if (url) {
                            editor?.commands.setYoutubeVideo({ src: url });
                        }
                    }}
                    title="Insert YouTube Video"
                >

                    <Button
                        variant="outline"
                        size="sm"
                        className="mt-2"
                    >
                        Insert YouTube Video
                    </Button>
                </SimpleDialog>
                <Button onClick={() => insertCustomButton(editor, 'Click me', () => alert('Button clicked!'))}>Insert Custom Button</Button>
                <Button onClick={() => insertGallery(editor)}>Insert Gallery</Button>
            </div>
            <Center>
                {editorComponent}
            </Center>
        </div>

    )
}

export default Tiptap
