'use client'

import { useState } from "react"
import { Copy, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useEditor } from "@/components/editor/EditorContext"
import { noteAtom } from "./editor/atoms"
import { useAtomValue } from "jotai"
import { db } from "@/lib/instantdb/client"
import { usePublish } from "./instant_hooks/usePublish"

export default function ShareDialog({ button }: { button: React.ReactNode }) {
    const { editor } = useEditor();
    const [shareableLink, setShareableLink] = useState("")
    const [audience, setAudience] = useState("everyone")
    const [comments, setComments] = useState("everyone")
    const [commentOrder, setCommentOrder] = useState("top")
    const [tags, setTags] = useState("")
    const [linkGenerated, setLinkGenerated] = useState(false)
    const note = useAtomValue(noteAtom)

    // this part publishes to Instant!
    const addPost = usePublish();
    const handleGenerateLink = async () => {
        // const uniqueId = crypto.randomUUID()
        const result = await addPost({
            title: note.title,
            text: editor?.getHTML()
        })
        const newLink = `https://owri.netlify.app/share/${result}`
        setShareableLink(newLink)
        setLinkGenerated(true)

        // Log the contents of the current note
        const noteContent = editor?.getHTML()
        console.log("Current note content:", noteContent)
        console.log("Current note", note)


    }

    const handleCopyLink = () => {
        navigator.clipboard.writeText(shareableLink)
        toast.success("Link copied to clipboard")
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {button}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] w-[95vw] max-h-[90vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle className="text-xl sm:text-2xl">Share Your Document</DialogTitle>
                    <DialogDescription>Configure sharing settings for your document.</DialogDescription>
                </DialogHeader>
                <div className="flex-grow overflow-y-auto p-4 sm:p-6 space-y-6 sm:space-y-8 border border-gray-200 rounded-lg">
                    <div className="space-y-2 sm:space-y-4">
                        <Button onClick={handleGenerateLink} size="sm" className="w-full sm:w-auto">
                            Get a sharable link
                        </Button>
                        {linkGenerated && (
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
                    <div className="space-y-2 sm:space-y-4">
                        <h3 className="text-base sm:text-lg font-medium">This post is for...</h3>
                        <RadioGroup value={audience} onValueChange={setAudience}>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="everyone" id="everyone" />
                                <Label htmlFor="everyone">Everyone</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="paid" id="paid" />
                                <Label htmlFor="paid">People with the link only</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <div className="space-y-2 sm:space-y-4">
                        <h3 className="text-base sm:text-lg font-medium">Allow comments from...</h3>
                        <RadioGroup value={comments} onValueChange={setComments}>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="everyone" id="comments-everyone" />
                                <Label htmlFor="comments-everyone">Everyone</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="no-one" id="no-one" />
                                <Label htmlFor="no-one">No one (disable comments)</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <div className="space-y-2 sm:space-y-4">
                        <h3 className="text-base sm:text-lg font-medium">Order comments by…</h3>
                        <RadioGroup value={commentOrder} onValueChange={setCommentOrder}>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="top" id="top" />
                                <Label htmlFor="top">Top comments first</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="newest" id="newest" />
                                <Label htmlFor="newest">Newest comments first</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="oldest" id="oldest" />
                                <Label htmlFor="oldest">Oldest comments first</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <div className="space-y-2 sm:space-y-4">
                        <h3 className="text-base sm:text-lg font-medium">Add tags</h3>
                        <Textarea
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            placeholder="Enter tags separated by commas"
                            className="min-h-[80px] sm:min-h-[100px]"
                        />
                    </div>
                </div>
                <div className="p-4 sm:p-6 bg-gray-100 flex justify-end">
                    <Button variant="outline" size="sm" className="w-full sm:w-auto">
                        Save
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
