'use client'

import { Note } from '@/lib/types';
import { atom } from 'jotai';


const createEmptyNote = (): Note => ({
    id: null,
    title: 'Untitled',
    text: '',
    metadata: {},
    createdAt: new Date(),
    updatedAt: new Date(),
    isPublished: false,
    publishedId: null,
    publishedAt: null,
    lastSyncedAt: null,
});

export const noteAtom = atom<Note>(createEmptyNote());

export const resetNoteAtom = atom(
    null,
    (_, set) => set(noteAtom, createEmptyNote())
);

export const noteMetadataAtom = atom(
    (get) => get(noteAtom).metadata,
    (get, set, newMetadata: Record<string, any>) => set(noteAtom, { ...get(noteAtom), metadata: { ...get(noteAtom).metadata, ...newMetadata } })
);

export const updatedAtAtom = atom(
    (get) => get(noteAtom).updatedAt,
    (get, set, newUpdatedAt: Date) => set(noteAtom, { ...get(noteAtom), updatedAt: newUpdatedAt })
);

export const uiStateAtom = atom({
    isSidebarOpen: false,
    isFullscreen: false,
    isInserting: false,
    isShareMenuOpen: false,
});

export const noteTitleAtom = atom(
    (get) => get(noteAtom).title,
    (get, set, newTitle: string) => set(noteAtom, { ...get(noteAtom), title: newTitle })
);

export const updateContentAtom = atom(
    null,
    (get, set, newContent: string) => set(noteAtom, { ...get(noteAtom), text: newContent })
);

export const publishInfoAtom = atom(
    (get) => ({
        isPublished: get(noteAtom).isPublished,
        publishedId: get(noteAtom).publishedId,
        lastSyncedAt: get(noteAtom).lastSyncedAt,
        publishedAt: get(noteAtom).publishedAt,
    }),
    (get, set, newPublishInfo: {
        isPublished?: boolean,
        publishedId?: string | null,
        lastSyncedAt?: Date | null,
        publishedAt?: Date | null,
    }) => {
        const currentNote = get(noteAtom);
        set(noteAtom, {
            ...currentNote,
            ...newPublishInfo,
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




