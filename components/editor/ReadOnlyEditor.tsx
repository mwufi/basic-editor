import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Youtube from '@tiptap/extension-youtube'

import { Libre_Baskerville, JetBrains_Mono } from 'next/font/google';
import NextImage from './NextImage';

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

const ReadOnlyEditor = ({ content, font = 'serif' }) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            NextImage,
            Youtube.configure({
                controls: false,
                nocookie: true,
            }),
        ],
        content: content,
        editorProps: {
            attributes: {
                class: `${font === 'serif' ? libreBaskerville.className : jetBrainsMono.className} h-full pb-10 min-h-[400px] focus:outline-none`,
            },
        },
        editable: false,
    })

    return (
        <EditorContent editor={editor} />
    )
}

export default ReadOnlyEditor
