
// // Usage example
// const notesManager = new IndexedDBNotesManager();

// async function example() {
//     try {
//         // Add a note
//         const newNoteId = await notesManager.addNote({
//             title: 'My First Note',
//             content: 'This is a test note with a lot of content...'
//         });
//         console.log('New note added with ID:', newNoteId);

//         // Get the note
//         const note = await notesManager.getNote(newNoteId);
//         console.log('Retrieved note:', note);

//         // Update the note
//         await notesManager.updateNote(newNoteId, { title: 'Updated Note Title' });
//         console.log('Note updated');

//         // Get all notes
//         const allNotes = await notesManager.getAllNotes();
//         console.log('All notes:', allNotes);

//         // Delete the note
//         await notesManager.deleteNote(newNoteId);
//         console.log('Note deleted');
//     } catch (error) {
//         console.error('An error occurred:', error);
//     }
// }

// example();
'use client'

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import IndexedDBNotesManager from '@/lib/IndexedDBNotesManager';

export default function Test() {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedNoteId, setSelectedNoteId] = useState(null);
    const notesManager = new IndexedDBNotesManager();

    useEffect(() => {
        loadNotes();
    }, []);

    const loadNotes = async () => {
        // it's easy to get all notes!!
        const allNotes = await notesManager.getAllNotes();
        setNotes(allNotes);
    };

    const handleAddNote = async () => {
        await notesManager.addNote({ title, content });
        setTitle('');
        setContent('');
        loadNotes();
    };

    const handleUpdateNote = async () => {
        if (selectedNoteId) {
            // it's easy to update a note!!
            await notesManager.updateNote(selectedNoteId, { title, content });
            setSelectedNoteId(null);
            setTitle('');
            setContent('');
            loadNotes();
        }
    };

    const handleDeleteNote = async (id) => {
        await notesManager.deleteNote(id);
        loadNotes();
    };

    const selectNote = (note) => {
        setSelectedNoteId(note.id);
        setTitle(note.title);
        setContent(note.content);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Notes Manager</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>{selectedNoteId ? 'Edit Note' : 'Add New Note'}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Input
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mb-2"
                        />
                        <Textarea
                            placeholder="Content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="mb-2"
                        />
                        {selectedNoteId ? (
                            <Button onClick={handleUpdateNote}>Update Note</Button>
                        ) : (
                            <Button onClick={handleAddNote}>Add Note</Button>
                        )}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Notes List</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {notes.map((note) => (
                            <div key={note.id} className="mb-2 p-2 border rounded">
                                <h3 className="font-bold">{note.title}</h3>
                                <p className="text-sm">{note.content.substring(0, 50)}...</p>
                                <div className="mt-2">
                                    <Button variant="outline" size="sm" onClick={() => selectNote(note)} className="mr-2">
                                        Edit
                                    </Button>
                                    <Button variant="destructive" size="sm" onClick={() => handleDeleteNote(note.id)}>
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}