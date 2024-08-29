'use client'

import { toast } from 'sonner'
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"
import { useAtom, useAtomValue } from 'jotai';
import { noteAtom } from './atoms';
import { saveNoteLocal, syncPost } from '@/lib/instantdb/mutations';
import { useUserProfile } from '@/lib/instantdb/queries';


const SaveButton = () => {
    const { user } = useUserProfile();
    const currentUserId = user?.id;
    const [note, setNote] = useAtom(noteAtom);

    const handleSave = async () => {
        try {
            if (note.isPublished) {
                const {updatedNote} = await syncPost(note, currentUserId)
                setNote(updatedNote)
            } else {
                await saveNoteLocal(note);
            }
            toast.success('Document saved! ' + note.title);
            console.log("document saved!")
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