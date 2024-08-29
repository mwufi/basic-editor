'use client'

import { useEditor } from '@/components/editor/EditorContext';

import { toast } from 'sonner'
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"
import { useAtom, useAtomValue } from 'jotai';
import { noteAtom } from './atoms';
import { saveNoteLocal, syncPost } from '@/lib/instantdb/mutations';
import { useUserProfile } from '@/lib/instantdb/queries';


const SaveButton = () => {
    const { editor } = useEditor()
    const { user } = useUserProfile();
    const currentUserId = user?.id;
    const [note, setNote] = useAtom(noteAtom);

    const handleSave = async () => {
        try {
            console.log("Saving note...", note)
            let updatedNote = {
                ...note,
                content: editor?.getHTML() ?? ''
            };

            let updatedNoteFromCloud = updatedNote;
            if (note.isPublished) {
                const { result, updatedNote: updatedNoteFromCloud } = await syncPost(updatedNote, currentUserId)
                console.log("syncPost result", result)
                setNote(updatedNoteFromCloud)
            }
            await saveNoteLocal(updatedNoteFromCloud);
            toast.success('Document saved! ' + note.title);
            console.log("SUCCESS!", note)
        } catch (error) {
            console.error("Error saving note", error)
            toast.error('Failed to save document');
        }
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