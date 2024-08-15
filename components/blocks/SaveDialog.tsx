'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface SaveDialogProps {
    onSave: (title: string) => void;
}

export default function SaveDialog({ onSave }: SaveDialogProps) {
    const [title, setTitle] = useState("")

    const handleSave = () => {
        if (title.trim() !== "") {
            onSave(title)
            setTitle("")
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Save</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Save Document</DialogTitle>
                    <DialogDescription>
                        Please enter a title for your document.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                            Title
                        </Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Cancel
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button onClick={handleSave} type="submit" disabled={title.trim() === ""}>Save</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
