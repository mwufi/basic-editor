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
import Placeholder from '@tiptap/extension-placeholder';
import Focus from '@tiptap/extension-focus';
import { WelcomeMessage } from '../WelcomeText';
import { useAtom, useSetAtom } from 'jotai';
import { noteAtom, updateContentAtom } from './atoms';

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

        editor.chain().insertContent([
            {
                type: 'nextImage',
                attrs: {
                    src: supabasePath,
                },
            },
            {
                type: 'paragraph'
            },
        ]).focus().run()
    } catch (error) {
        toast.error('Error uploading image:', error.message);
    }
}

function insertImageUrl(editor, url) {
    editor.chain().insertContent([
        {
            type: 'nextImage',
            attrs: {
                src: url,
            },
        },
        {
            type: 'paragraph'
        }
    ]).focus().run()
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


const Editor = ({ editable = true, initialContent = null, font = 'serif' }) => {
    const { setEditor } = useEditor(); // Use the context

    const editor = useTiptapEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: 'Write your note here...',
            }),
            Focus.configure({
                className: 'focus',
            }),
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
                        // Handle pasted HTML content
                        const parser = new DOMParser();
                        const doc = parser.parseFromString(htmlContent, 'text/html');
                        const imgElement = doc.querySelector('img');
                        console.log("pasted html content", htmlContent, imgElement)

                        if (imgElement && imgElement.src) {
                            insertImageUrl(currentEditor, imgElement.src)
                            return true;
                        }

                        // If no image in HTML content, allow default paste behavior
                        return false;
                    }

                    files.forEach(async file => {
                        uploadAndInsertImage(currentEditor, file)
                    })
                },
            }),
        ],
        content: initialContent,
        editorProps: {
            attributes: {
                class: `font-body h-full pb-10 min-h-[400px] focus:outline-none`,
            },
        },
        editable: editable,
    })

    useEffect(() => {
        if (editor && initialContent !== null) {
            editor.commands.setContent(initialContent);
        }
    }, [editor, initialContent]);

    const updateContent = useSetAtom(updateContentAtom);

    useEffect(() => {
        if (editor) {
            setEditor(editor); // Set the editor in the context when it's created

            const handleUpdate = () => {
                const content = editor.getHTML();
                updateContent(content);
            };

            editor.on('update', handleUpdate);

            return () => {
                editor.off('update', handleUpdate);
            };
        }
    }, [editor, setEditor]);

    return <div>{editor && <EditorContent editor={editor} />}</div>;
}

export default Editor