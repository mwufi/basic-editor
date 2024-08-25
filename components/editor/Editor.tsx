'use client'

import CharacterCount from '@tiptap/extension-character-count';
import StarterKit from '@tiptap/starter-kit'
import Youtube from '@tiptap/extension-youtube'
import Link from '@tiptap/extension-link'

import FileHandler from '@/components/editor/FileHandler'
import NextImage from '@/components/editor/NextImage';

import { EditorContent, useEditor as useTiptapEditor } from '@tiptap/react';
import { useEditor } from './EditorContext'; // Import the custom hook
import { useEffect } from 'react';

import { Libre_Baskerville, JetBrains_Mono } from 'next/font/google';
import { toast } from 'sonner'
import { uploadImageToSupabase } from '@/lib/uploadImage';
import CustomButton from './CustomButton';
import CustomImageGallery from './CustomImageGallery';
import { WelcomeMessage } from '../WelcomeText';

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


function getPos(editor) {
    return editor.state.selection.anchor
}

async function uploadAndInsertImage(editor, file, pos = null) {
    toast.info("Uploading image to cloud....")
    try {
        const supabasePath = await uploadImageToSupabase(file)
        console.log("Supabase path", supabasePath)

        editor.chain().insertContentAt(pos ?? getPos(editor), {
            type: 'image',
            attrs: {
                src: supabasePath,
            },
        }).focus().run()
    } catch (error) {
        toast.error('Error uploading image:', error.message);
    }
}

export const insertCustomButton = (editor, label, onClick) => {
    editor
        .chain()
        .focus()
        .insertContent([{
            type: 'customButton',
            attrs: {
                label,
                onClick: onClick ? onClick.toString() : null,
            },
        },
        {
            type: 'paragraph'
        }
        ])
        .run();
};

export const insertGallery = (editor) => {
    editor
        .chain()
        .focus()
        .insertContent([{
            type: 'customImageGallery',
            attrs: {
                layout: 'carousel',
                images: [],
                caption: '',
            },
        },
        {
            type: 'paragraph'
        }
        ])
        .run();
};


const Editor = ({ editable = true, content = null, font = 'serif' }) => {
    const { setEditor } = useEditor(); // Use the context

    const editor = useTiptapEditor({
        extensions: [
            StarterKit,
            CharacterCount,
            NextImage,
            Link,
            CustomButton,
            CustomImageGallery,
            Youtube.configure({
                controls: false,
                nocookie: true,
            }),
            FileHandler.configure({
                allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
                onDrop: (currentEditor, files, pos) => {
                    files.forEach(async file => {
                        uploadAndInsertImage(currentEditor, file, pos)
                    })
                },
                onPaste: (currentEditor, files, htmlContent) => {
                    if (htmlContent) {
                        // if there is htmlContent, stop manual insertion & let other extensions handle insertion via inputRule
                        // you could extract the pasted file from this url string and upload it to a server for example
                        console.log("you pasted", htmlContent) // eslint-disable-line no-console
                        return false
                    }

                    files.forEach(async file => {
                        uploadAndInsertImage(currentEditor, file)
                    })
                },
            }),
        ],
        content: content || WelcomeMessage,
        editorProps: {
            attributes: {
                class: `${font === 'serif' ? libreBaskerville.className : jetBrainsMono.className} h-full pb-10 min-h-[400px] focus:outline-none`,
            },
        },
        editable: editable,
    })

    useEffect(() => {
        if (editor) {
            setEditor(editor); // Set the editor in the context when it's created
        }
    }, [editor, setEditor]);

    return <div>{editor && <EditorContent editor={editor} />}</div>;
}

export function ReadOnlyEditor({ content, font = 'serif' }) {
    return <Editor content={content} editable={false} font={font} />
}

export default Editor