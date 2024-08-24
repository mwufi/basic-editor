'use client'

import { useEditor } from '@/components/editor/EditorContext';

import CharacterCountMarker from './CharacterCountMarker';
import IndexedDBNotesManager from '@/lib/IndexedDBNotesManager';
import { toast } from 'sonner'

const Center = ({ children }: { children: React.ReactNode }) => {
    return <div className='relative h-full'><div className="mx-auto max-w-[600px] py-6">{children}</div></div>
}

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { ArrowLeft, Save, Share } from "lucide-react"
import SimpleDialog from './blocks/SimpleDialog';
import BottomMenu from './BottomMenu';
import Link from 'next/link';
import Editor from './editor/Editor';
import { atom, useAtom } from 'jotai';


const noteAtom = atom({
    id: null,
    title: 'Untitled',
    text: '',
    published: false,
});

const noteTitleAtom = atom(
    (get) => get(noteAtom).title,
    (get, set, newTitle: string) => set(noteAtom, { ...get(noteAtom), title: newTitle })
);

const SaveButton = () => {
    const { editor } = useEditor()
    const [currentNote, setNote] = useAtom(noteAtom);
    return (
        <Button size="sm" variant="ghost" onClick={async () => {
            const notesManager = new IndexedDBNotesManager();
            const noteId = currentNote.id
            if (noteId) {
                notesManager.updateNote(noteId, {
                    title: currentNote.title,
                    content: editor?.getHTML() ?? '',
                });
                toast.success('Document saved! ' + currentNote.title);
            } else {
                const id = await notesManager.addNote({
                    title: currentNote.title,
                    content: editor?.getHTML() ?? '',
                });
                setNote({
                    ...currentNote,
                    id: id,
                });
                toast.success('Document created! ' + currentNote.title);
            }
        }}>
            <Save className="mr-2 h-4 w-4" />
            Save
        </Button>
    )
}

const TopBar = ({ onShare }) => {
    const [title, setTitle] = useAtom(noteTitleAtom);
    return (
        <div className="sticky top-0 z-10 flex items-center justify-center p-2 rounded">
            <div className="absolute left-0">
                <Button size="sm" variant="ghost" asChild>
                    <Link href="/">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Home
                    </Link>
                </Button>
            </div>
            {true ? (
                <form onSubmit={(e) => {
                    e.preventDefault();
                }} className='h-12'>
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className='w-[600px] text-lg font-semibold text-center focus-visible:ring-0 outline-none border-none hover:bg-orange-100'
                        placeholder='Untitled'
                        autoFocus
                    />
                </form>
            ) : (
                <h1 className="text-lg font-semibold h-12">
                    {title}
                </h1>
            )}
            <div className="absolute right-0">
                <SaveButton />

                <BottomMenu onShare={onShare}>
                    <Button size="sm" variant="ghost">
                        <Share className="mr-2 h-4 w-4" />
                        Share
                    </Button>
                </BottomMenu>
            </div>
        </div>
    )
}


const Tiptap = ({ note = undefined, wordcount = true }) => {
    const { editor } = useEditor();

    const [characterCount, setCharacterCount] = useState(0);

    useEffect(() => {
        if (editor) {
            const updateCharacterCount = () => {
                setCharacterCount(editor.storage.characterCount.words());
            };

            editor.on('update', updateCharacterCount);

            // Initial count
            updateCharacterCount();

            return () => {
                editor.off('update', updateCharacterCount);
            };
        }
    }, [editor]);

    const [currentNote, setNote] = useAtom(noteAtom);

    useEffect(() => {
        if (note) {
            setNote({
                ...note,
                title: note.title ?? 'Untitled',
                text: editor?.getHTML() ?? '',
            });
        }
    }, [note, setNote, editor]);

    const setNoteTitle = (newTitle) => {
        setNote((prevNote) => ({ ...prevNote, title: newTitle }));
    };

    const setNoteContent = (newContent) => {
        setNote((prevNote) => ({ ...prevNote, text: newContent }));
    };

    const setNotePublishStatus = (published) => {
        setNote((prevNote) => ({ ...prevNote, published: published }));
    };

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
            setNoteTitle(note.title)
            setNoteContent(note.content)
        }
    }, [editor, note])

    return (
        <div className="flex flex-col px-6">
            <TopBar
                onShare={() => {
                    navigator.clipboard.writeText(editor?.getHTML() ?? '')
                    toast.success('Document copied to clipboard!');
                }} />

            <div className="fixed left-4 bottom-4 z-10">
                {wordcount && <CharacterCountMarker
                    current={characterCount}
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
                <Editor />
            </Center>
        </div>

    )
}

export default Tiptap
