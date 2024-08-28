'use client'

import { useEditor } from '@/components/editor/EditorContext';

import IndexedDBNotesManager from '@/lib/IndexedDBNotesManager';
import { toast } from 'sonner'

import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"
import { useAtom } from 'jotai';
import { noteAtom } from './atoms';
import { saveNoteLocal, syncPost } from '@/lib/instantdb/mutations';
import { useUserProfile } from '@/lib/instantdb/queries';

const SaveButton = () => {
    const { editor } = useEditor()
    const [note, setNote] = useAtom(noteAtom);
    const { user } = useUserProfile();
    const currentUserId = user?.id;

    const handleSave = async () => {
        // add some fields to the note
        let updatedNote = {
            ...note,
            content: editor?.getHTML() ?? '',
            updatedAt: new Date()
        };
        if (note.publishedId) {
            console.log("note.isPublished -- Syncing post...")
            await syncPost(updatedNote, currentUserId)
            updatedNote = {
                ...updatedNote,
                lastSyncedAt: new Date()
            }
        }
        const { noteId } = await saveNoteLocal(updatedNote);
        setNote({
            ...updatedNote,
            id: noteId,
        });

        toast.success('Document saved! ' + updatedNote.title);
        console.log("Document saved!", updatedNote)
    }

    return (
        <Button
            size="sm"
            variant={note.isPublished ? "outline" : "ghost"}
            onClick={handleSave}
            className={note.isPublished ? " text-green-500" : ""}
        >
            <Save className="mr-2 h-4 w-4" />
            {note.isPublished ? "Update" : "Save"}
        </Button>
    )
}

export default SaveButton;