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
                const { updatedNote } = await syncPost(note, currentUserId)
                setNote(updatedNote)
            } else {
                // since a human clicked it, we force-save!
                const { updatedNote } = await saveNoteLocal(note, true);
                setNote(updatedNote)
            }
            toast.success('Document saved! ' + note.title);
            console.log("document saved!")
        } catch (error) {
            console.error("Error saving note", error)
            console.log(note)
            toast.error('Failed to save document');
        }
    }

    return (
        <Button
            size="sm"
            variant="outline"
            onClick={handleSave}
            className={note.isPublished ? " text-green-500" : ""}
        >
            <Save className="h-4 w-4 mr-1" />
        </Button>
    )
}

export default SaveButton;