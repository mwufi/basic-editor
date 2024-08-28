// File: indexedDBNotesManager.ts

import { Note } from '@/lib/types';

export default class IndexedDBNotesManager {
    private dbName = 'NotesDatabase';
    private dbVersion = 1;
    private storeName = 'notes';

    private openDB(): Promise<IDBDatabase> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);

            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;
                const objectStore = db.createObjectStore(this.storeName, { keyPath: 'id', autoIncrement: true });
                objectStore.createIndex('title', 'title', { unique: false });
                objectStore.createIndex('createdAt', 'createdAt', { unique: false });
            };
        });
    }

    async addNote(note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Promise<number> {
        console.log("trying to add note", note);
        const db = await this.openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(this.storeName, 'readwrite');
            const store = transaction.objectStore(this.storeName);

            const newNote: Note = {
                ...note,
                createdAt: new Date(),
                updatedAt: new Date()
            };

            const request = store.add(newNote);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result as number);
        });
    }

    async getNote(id: number): Promise<Note | undefined> {
        const db = await this.openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(this.storeName, 'readonly');
            const store = transaction.objectStore(this.storeName);
            const request = store.get(id);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result as Note | undefined);
        });
    }

    async getAllNotes(): Promise<Note[]> {
        const db = await this.openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(this.storeName, 'readonly');
            const store = transaction.objectStore(this.storeName);
            const request = store.getAll();

            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result as Note[]);
        });
    }

    async updateNote(id: number, updates: Partial<Omit<Note, 'id' | 'createdAt'>>): Promise<void> {
        const db = await this.openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(this.storeName, 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.get(id);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                const note = request.result as Note;
                const updatedNote = {
                    ...note,
                    ...updates,
                    updatedAt: new Date()
                };
                const updateRequest = store.put(updatedNote);
                updateRequest.onerror = () => reject(updateRequest.error);
                updateRequest.onsuccess = () => resolve();
            };
        });
    }

    async deleteNote(id: number): Promise<void> {
        const db = await this.openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(this.storeName, 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.delete(id);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve();
        });
    }
}
