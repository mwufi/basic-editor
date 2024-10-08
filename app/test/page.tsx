'use client'

import { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import IndexedDBNotesManager from '@/lib/IndexedDBNotesManager';

const notesManager = new IndexedDBNotesManager();

export default function Test() {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedNoteId, setSelectedNoteId] = useState(null);

    const loadNotes = useCallback(async () => {
        // it's easy to get all notes!!
        const allNotes = await notesManager.getAllNotes();
        setNotes(allNotes);
    }, []);

    useEffect(() => {
        loadNotes();
    }, [loadNotes]);

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
                                <div className="text-xs text-gray-500 mt-1">
                                    <span>{note.content.length} characters</span>
                                    <span className="mx-2">•</span>
                                    <span>Created: {new Date(note.createdAt).toLocaleString()}</span>
                                    <span className="mx-2">•</span>
                                    <span>Updated: {new Date(note.updatedAt).toLocaleString()}</span>
                                </div>
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