'use client'

import { atom } from 'jotai';

export const noteAtom = atom({
    id: null,
    title: 'Untitled',
    text: '',
    published: false,
});

export const noteTitleAtom = atom(
    (get) => get(noteAtom).title,
    (get, set, newTitle: string) => set(noteAtom, { ...get(noteAtom), title: newTitle })
);

