'use client'

import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "@/components/ui/menubar"
import Link from "next/link"
import { useEditor } from '@/components/editor/EditorContext';
import { insertCustomButton, insertGallery } from '@/components/editor/Editor';
import { noteAtom, publishInfoAtom, uiStateAtom } from "../editor/atoms";
import { useAtom, useAtomValue } from "jotai";

function ComposingMenubar() {
    const { editor } = useEditor();
    const { isInserting } = useAtomValue(uiStateAtom);
    const note = useAtomValue(noteAtom);
    const [uiState, setUiState] = useAtom(uiStateAtom);
    const publishInfo = useAtomValue(publishInfoAtom);

    return (
        <Menubar>
            <MenubarMenu>
                <MenubarTrigger>File</MenubarTrigger>
                <MenubarContent>
                    <MenubarItem>
                        <Link href="/create">
                            New Note <MenubarShortcut>⌘T</MenubarShortcut>
                        </Link>
                    </MenubarItem>
                    {isInserting && (
                        <MenubarItem>
                            Save <MenubarShortcut>⌘S</MenubarShortcut>
                        </MenubarItem>
                    )}
                    {note.id && (
                        <MenubarItem>
                            <Link href={`/blog/${note.id}/edit`}>
                                Edit <MenubarShortcut>⌘V</MenubarShortcut>
                            </Link>
                        </MenubarItem>
                    )}
                    <MenubarSeparator />
                    <MenubarSub>
                        <MenubarSubTrigger>Share</MenubarSubTrigger>
                        <MenubarSubContent>
                            <MenubarItem>Email link</MenubarItem>
                            <MenubarItem>Messages</MenubarItem>
                            <MenubarItem>Notes</MenubarItem>
                        </MenubarSubContent>
                    </MenubarSub>
                    <MenubarSeparator />
                    <MenubarItem>
                        Print... <MenubarShortcut>⌘P</MenubarShortcut>
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>Home</MenubarTrigger>
                <MenubarContent>
                    <MenubarItem>
                        <Link href="/">
                            Home <MenubarShortcut>⌘Z</MenubarShortcut>
                        </Link>
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
            {isInserting && (
                <MenubarMenu>
                    <MenubarTrigger>Insert</MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem inset>
                            YouTube Video <MenubarShortcut>⌘V</MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem inset onClick={() => insertCustomButton(editor, 'Click me', () => alert('Button clicked!'))}>
                            Custom Button <MenubarShortcut>⌘V</MenubarShortcut>
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem inset onClick={() => insertGallery(editor)}>
                            Gallery <MenubarShortcut>⌘V</MenubarShortcut>
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            )}
            <MenubarMenu>
                <MenubarTrigger>Sharing</MenubarTrigger>
                <MenubarContent>
                    <MenubarItem onClick={() => setUiState({ ...uiState, isShareMenuOpen: true })}>
                        Share settings
                    </MenubarItem>
                    {publishInfo.publishedId && (
                        <MenubarItem>
                            <Link href={`https://owri.netlify.app/share/${publishInfo.publishedId}`} className="text-green-500 hover:text-green-600">
                                See public link
                            </Link>
                        </MenubarItem>
                    )}
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    )
}

export default ComposingMenubar;
