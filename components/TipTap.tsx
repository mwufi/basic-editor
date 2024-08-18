'use client'

import CharacterCount from '@tiptap/extension-character-count';
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Youtube from '@tiptap/extension-youtube'

import { Libre_Baskerville, JetBrains_Mono } from 'next/font/google';
import CharacterCountMarker from './CharacterCountMarker';
import IndexedDBNotesManager from '@/lib/IndexedDBNotesManager';
import { toast } from 'sonner'

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

const Center = ({ children }: { children: React.ReactNode }) => {
    return <div className='relative h-full'><div className="mx-auto max-w-[600px] py-6">{children}</div></div>
}

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { Save, Share } from "lucide-react"
import { WelcomeMessage } from './WelcomeText';
import FileHandler from '@/components/editor/FileHandler'
import NextImage from '@/components/editor/NextImage';
import Image from '@tiptap/extension-image'
import { uploadImageToSupabase } from '@/lib/uploadImage';
import SimpleDialog from './blocks/SimpleDialog';

const TopBar = ({ onSave, onShare, isEditing, title, setTitle, handleRetitle }) => {
    return (
        <div className="sticky top-0 z-10 flex items-center justify-center p-2 rounded">
            {true ? (
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleRetitle();
                }} className='h-12'>
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className='w-[600px] text-lg font-semibold text-center focus-visible:ring-0 outline-none border-none hover:bg-orange-100'
                        placeholder='Untitled'
                        onBlur={handleRetitle}
                        autoFocus
                    />
                </form>
            ) : (
                <h1 className="text-lg font-semibold h-12" onClick={handleRetitle}>
                    {title}
                </h1>
            )}
            <div className="absolute right-0">
                <Button size="sm" variant="ghost" onClick={onSave}>
                    <Save className="mr-2 h-4 w-4" />
                    Save
                </Button>
                <Button size="sm" variant="ghost" onClick={onShare}>
                    <Share className="mr-2 h-4 w-4" />
                    Share
                </Button>
            </div>
        </div>
    )
}


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

const Tiptap = ({ note = undefined, editable = true, font = 'serif', wordcount = true }) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            CharacterCount,
            NextImage,
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
        content: WelcomeMessage,
        editorProps: {
            attributes: {
                class: `${font === 'serif' ? libreBaskerville.className : jetBrainsMono.className} h-full pb-10 min-h-[400px] focus:outline-none`,
            },
        },
        editable: editable,
    })


    const [title, setTitle] = useState(note?.title ?? "Untitled")
    const [isEditing, setIsEditing] = useState(false)

    // for interactive fun :)
    useEffect(() => {
        if (editor) {
            console.log("Use window.editor to interact with the editor. Have fun!")
            window.editor = editor;
        }
    }, [editor])

    useEffect(() => {
        if (note) {
            editor?.commands.setContent(note.content)
            setTitle(note.title)
        }
    }, [editor, note])

    const handleRetitle = () => {
        if (isEditing) {
            setIsEditing(false)
        } else {
            setIsEditing(true)
        }
    }

    const [createdId, setCreatedId] = useState(undefined)

    return (
        <div className="flex flex-col px-6">
            <TopBar
                isEditing={isEditing}
                title={title}
                setTitle={setTitle}
                handleRetitle={handleRetitle}
                onSave={async () => {
                    const notesManager = new IndexedDBNotesManager();
                    const noteId = note?.id ?? createdId
                    if (noteId) {
                        notesManager.updateNote(noteId, {
                            title: title,
                            content: editor?.getHTML() ?? '',
                        });
                        toast.success('Document saved! ' + title);
                    } else {
                        const id = await notesManager.addNote({
                            title: title,
                            content: editor?.getHTML() ?? '',
                        });
                        setCreatedId(id)
                        toast.success('Document created! ' + title);
                    }
                }} onShare={() => {
                    navigator.clipboard.writeText(editor?.getHTML() ?? '')
                    toast.success('Document copied to clipboard!');
                }} />

            <div className="fixed left-4 bottom-4 z-10">
                {wordcount && <CharacterCountMarker
                    current={editor?.storage.characterCount.words()}
                    limit={500}
                    display="words"
                />}
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
            </div>
            <Center>
                <EditorContent
                    editor={editor}
                    className="h-full [&_.ProseMirror-focused]:caret-[#4b494b] [&_.ProseMirror-focused]:caret-[4px]"
                />
            </Center>
        </div>

    )
}

export default Tiptap
