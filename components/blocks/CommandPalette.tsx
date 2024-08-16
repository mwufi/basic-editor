'use client'

import { useEffect, useState } from 'react'
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import IndexedDBNotesManager from '@/lib/IndexedDBNotesManager'

import { formatDistanceToNow, format } from 'date-fns';

const formatCreatedAt = (createdAt: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60));

    if (diffInMinutes < 60) {
        return `${diffInMinutes}min ago`;
    } else if (diffInMinutes < 24 * 60) {
        return formatDistanceToNow(createdAt, { addSuffix: true });
    } else {
        return format(createdAt, 'M/d h:mma');
    }
};

const CommandPalette = ({ onLoadDocument }) => {
    const [open, setOpen] = useState(false)

    const [documents, setDocuments] = useState([])

    useEffect(() => {
        if (!open) return
        const fetchDocuments = async () => {
            const notesManager = new IndexedDBNotesManager()
            try {
                const allNotes = await notesManager.getAllNotes()
                setDocuments(allNotes)
            } catch (error) {
                console.error("Error fetching documents:", error)
            }
        }

        fetchDocuments()
    }, [open])

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }

        document.addEventListener('keydown', down)
        return () => document.removeEventListener('keydown', down)
    }, [])

    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Hey! What're you looking for?" />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="In this browser">
                    {documents.map((doc) => (
                        <CommandItem key={doc.id} onSelect={() => {
                            onLoadDocument(doc)
                            setOpen(false)
                        }}>
                            <div className="flex flex-col">
                                <div className="font-semibold">{doc.title}</div>
                                <div className="text-sm text-gray-500">
                                    Created: {formatCreatedAt(doc.createdAt)} | Words: {doc.wordCount}
                                </div>
                            </div>
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    )
}

export default CommandPalette
