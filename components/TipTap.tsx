'use client'

import { useEditor } from '@/components/editor/EditorContext';
import { toast } from 'sonner'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect } from "react"
import { ArrowLeft, Share } from "lucide-react"
import SimpleDialog from './blocks/SimpleDialog';
import BottomMenu from './BottomMenu';
import Link from 'next/link';
import { useAtom } from 'jotai';

import Editor, { insertCustomButton, insertGallery } from '@/components/editor/Editor';
import SaveButton from '@/components/editor/SaveButton';
import EditorCharacterCount from '@/components/editor/CharacterCount';
import { noteTitleAtom } from '@/components/editor/atoms';


const Center = ({ children }: { children: React.ReactNode }) => {
    return <div className='relative h-full'><div className="mx-auto max-w-[600px] py-6">{children}</div></div>
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

                <BottomMenu button={
                    <Button size="sm" variant="ghost">
                        <Share className="mr-2 h-4 w-4" />
                        Share
                    </Button>
                } />
            </div>
        </div>
    )
}



const Tiptap = ({ wordcount = true }) => {
    const { editor } = useEditor();

    // for interactive fun :)
    useEffect(() => {
        if (editor) {
            console.log("Use window.editor to interact with the editor. Have fun!")
            window.editor = editor;
        }
    }, [editor])

    return (
        <div className="flex flex-col px-6">
            <TopBar
                onShare={() => {
                    navigator.clipboard.writeText(editor?.getHTML() ?? '')
                    toast.success('Document copied to clipboard!');
                }} />

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
                <Editor />
            </Center>
        </div>

    )
}

export default Tiptap
