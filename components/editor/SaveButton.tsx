'use client'

import { useEditor } from '@/components/editor/EditorContext';

import IndexedDBNotesManager from '@/lib/IndexedDBNotesManager';
import { toast } from 'sonner'

import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"
import { useAtom } from 'jotai';
import { noteAtom } from './atoms';


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

export default SaveButton;