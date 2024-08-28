'use client'

import { Note } from '@/lib/types';
import { atom } from 'jotai';

export const noteAtom = atom<Note>({
    id: null,
    title: 'Untitled',
    content: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    isPublished: false,
    publishedId: null,
    publishedAt: null,
    lastSyncedAt: null,
});

export const noteTitleAtom = atom(
    (get) => get(noteAtom).title,
    (get, set, newTitle: string) => set(noteAtom, { ...get(noteAtom), title: newTitle })
);

export const updatePublished = atom(
    null,
    (get, set, publishedId: string) => {
        const currentNote = get(noteAtom);
        const now = new Date();
        set(noteAtom, {
            ...currentNote,
            publishedId: publishedId,
            publishedAt: currentNote.publishedAt || now,
            lastSyncedAt: now,
            isPublished: true,
        });
    }
);


// To use these atoms, you can import them in your components like this:
// import { noteAtom, noteTitleAtom, updatePublished } from '@/components/editor/atoms';

// Then, in your component:
// import { useAtom, useSetAtom } from 'jotai';

// const [note, setNote] = useAtom(noteAtom);
// const [title, setTitle] = useAtom(noteTitleAtom);
// const updatePublishedState = useSetAtom(updatePublished);

// Example usage:
// setNote({ ...note, content: 'New content' });
// setTitle('New Title');
// updatePublishedState('publishedId123');

// These atoms provide a centralized state management for your note,
// allowing you to easily access and update the note's properties
// across different components in your application.




