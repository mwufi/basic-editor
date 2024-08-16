'use client'

import CharacterCount from '@tiptap/extension-character-count';
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

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

const Tiptap = ({ initialContent = '<p>Hello World! 🌎️</p>', editable = true, font = 'serif', wordcount = true }) => {
    const editor = useEditor({
        extensions: [StarterKit, CharacterCount],
        content: '',
        editorProps: {
            attributes: {
                class: `${font === 'serif' ? libreBaskerville.className : jetBrainsMono.className} h-full pb-10 min-h-[400px] focus:outline-none`,
            },
        },
        editable: editable,
    })

    useEffect(() => {
        editor?.commands.setContent(initialContent)
    }, [editor, initialContent])

    const [title, setTitle] = useState("Untitled")
    const [isEditing, setIsEditing] = useState(false)

    const handleRetitle = () => {
        if (isEditing) {
            setIsEditing(false)
        } else {
            setIsEditing(true)
        }
    }

    return (
        <div className="flex flex-col px-6">
            <TopBar
                isEditing={isEditing}
                title={title}
                setTitle={setTitle}
                handleRetitle={handleRetitle}
                onSave={() => {
                    const notesManager = new IndexedDBNotesManager();
                    notesManager.addNote({
                        title: title,
                        content: editor?.getHTML() ?? '',
                    });
                    toast.success('Document saved! ' + title);
                }} onShare={() => {
                    navigator.clipboard.writeText(editor?.getHTML() ?? '')
                    toast.success('Document copied to clipboard!');
                }} />

            <div className="fixed left-4 bottom-4">
                {wordcount && <CharacterCountMarker
                    current={editor?.storage.characterCount.words()}
                    limit={500}
                    display="words"
                />}
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
