'use client'

import CharacterCount from '@tiptap/extension-character-count';
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import { Libre_Baskerville, JetBrains_Mono } from 'next/font/google';
import CharacterCountMarker from './CharacterCountMarker';

const libreBaskerville = Libre_Baskerville({
    weight: ['400', '700'],
    subsets: ['latin'],
    display: 'swap',
});

const jetBrainsMono = JetBrains_Mono({
    weight: ['400', '700'],
    subsets: ['latin'],
    display: 'swap',
});

const Tiptap = ({ editable = true, font = 'serif' }) => {
    const editor = useEditor({
        extensions: [StarterKit, CharacterCount],
        content: '<p>Hello World! 🌎️</p>',
        editorProps: {
            attributes: {
                class: `${font === 'serif' ? libreBaskerville.className : jetBrainsMono.className} h-full pb-10 min-h-[400px] focus:outline-none`,
            },
        },
        editable: editable,
    })


    return (
        <div className="h-full">
            <div className="fixed top-0 left-0 p-6">
                <CharacterCountMarker
                    current={editor?.storage.characterCount.words()}
                    limit={500}
                    display="words"
                />
            </div>
            <EditorContent
                editor={editor}
                className="h-full [&_.ProseMirror-focused]:caret-[#4b494b] [&_.ProseMirror-focused]:caret-[4px]"
            />
        </div>
    )
}

export default Tiptap
