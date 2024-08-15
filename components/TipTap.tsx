'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import { Libre_Baskerville } from 'next/font/google';

const libreBaskerville = Libre_Baskerville({
    weight: ['400', '700'],
    subsets: ['latin'],
    display: 'swap',
});
const Tiptap = () => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: '<p>Hello World! 🌎️</p>',
        editorProps: {
            attributes: {
                class: `${libreBaskerville.className} h-full focus:outline-none`,
            },
        },
    })

    return (
        <div className="h-full">
            <EditorContent 
                editor={editor} 
                className="h-full [&_.ProseMirror-focused]:caret-[#FF00FF] [&_.ProseMirror-focused]:caret-[4px]" 
            />
        </div>
    )
}

export default Tiptap
