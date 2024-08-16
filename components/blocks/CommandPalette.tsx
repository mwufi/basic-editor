'use client'

import { useEffect, useState } from 'react'
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import IndexedDBNotesManager from '@/lib/IndexedDBNotesManager'

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
                <CommandGroup heading="Actions">
                    <CommandItem onSelect={() => {
                        // Implement save functionality
                        console.log('Save document');
                        alert('Gotta click the save button to save the document!');
                        setOpen(false);
                    }}>
                        Save document
                    </CommandItem>
                    <CommandItem onSelect={() => {
                        // Implement share functionality
                        console.log('Share document');
                        alert('Gotta click the share button to share the document!');
                        setOpen(false);
                    }}>
                        Share document
                    </CommandItem>
                </CommandGroup>
                <CommandGroup heading="In this browser">
                    {documents.map((doc) => (
                        <CommandItem key={doc.id} onSelect={() => {
                            onLoadDocument(doc)
                            setOpen(false)
                        }}>
                            <div className="flex flex-col">
                                <div className="font-semibold">{doc.title}</div>
                                <div className="text-sm text-gray-500">
                                    Created: {new Date(doc.createdAt).toLocaleDateString()} | Words: {doc.wordCount}
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
