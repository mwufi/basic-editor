'use client'

import { Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { useEditor } from "@/components/editor/EditorContext"
import { noteAtom, publishInfoAtom, uiStateAtom } from "./editor/atoms"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { usePublish } from "./instant_hooks/usePublish"
import NotePublishInfo from "./NotePublishInfo"

export default function ShareMenu() {
    const { editor } = useEditor();
    const [publishInfo, setPublishInfo] = useAtom(publishInfoAtom)
    const note = useAtomValue(noteAtom)
    const [uiState, setUiState] = useAtom(uiStateAtom)

    const shareableLink = publishInfo.publishedId ? `https://owri.netlify.app/share/${publishInfo.publishedId}` : ""

    // this part publishes to Instant!
    const addPost = usePublish();
    const handleGenerateLink = async () => {
        console.log("generating link")
        const { updatedNote } = await addPost({
            ...note,
            content: editor?.getHTML()
        })
        setPublishInfo({
            ...publishInfo,
            publishedId: updatedNote.publishedId,
            lastSyncedAt: updatedNote.lastSyncedAt,
            publishedAt: updatedNote.publishedAt,
        })

        // Log the contents of the current note
        const noteContent = editor?.getHTML()
        console.log("Current note content:", noteContent)
        console.log("Current note", note)
    }

    const handleCopyLink = () => {
        navigator.clipboard.writeText(shareableLink)
        toast.success("Link copied to clipboard")
    }

    const handleCloseDialog = () => {
        setUiState({ ...uiState, isShareMenuOpen: false })
    }

    return (
        <Dialog open={uiState.isShareMenuOpen} onOpenChange={handleCloseDialog}>
            <DialogContent className="sm:max-w-[600px] w-[95vw] max-h-[90vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle className="text-xl sm:text-2xl">Share Your Document</DialogTitle>
                    <DialogDescription>Configure sharing settings for your document.</DialogDescription>
                </DialogHeader>
                <div className="flex-grow overflow-y-auto p-2 space-y-6 sm:space-y-8">
                    <div className="space-y-2 sm:space-y-4">
                        {shareableLink ? (
                            <NotePublishInfo note={note} />
                        ) : (
                            <Button onClick={handleGenerateLink} size="sm" className="w-full sm:w-auto">
                                Get a sharable link
                            </Button>
                        )}
                        {shareableLink != "" && (
                            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                                <Input
                                    value={shareableLink}
                                    readOnly
                                    className="flex-grow text-sm sm:text-base"
                                />
                                <Button onClick={handleCopyLink} size="sm" className="w-full sm:w-auto">
                                    <Copy className="h-4 w-4 mr-2" />
                                    Copy link
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
