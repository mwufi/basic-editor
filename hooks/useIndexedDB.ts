import { useState, useEffect } from 'react';

interface IndexedDBHook {
    getAll: () => Promise<any[]>;
    add: (item: any) => Promise<void>;
    remove: (id: string) => Promise<void>;
    update: (id: string, item: any) => Promise<void>;
}

export default function useIndexedDB(storeName: string, mode: IDBTransactionMode = 'readonly'): IndexedDBHook {
    const dbName = 'MyDatabase';
    const dbVersion = 1;

    const openDB = (): Promise<IDBDatabase> => {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(dbName, dbVersion);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);

            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;
                if (!db.objectStoreNames.contains(storeName)) {
                    db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
                }
            };
        });
    };

    const getAll = async (): Promise<any[]> => {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(storeName, mode);
            const store = transaction.objectStore(storeName);
            const request = store.getAll();

            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                db.close();
                resolve(request.result);
            };
        });
    };

    const add = async (item: any): Promise<void> => {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.add(item);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                db.close();
                resolve();
            };
        });
    };

    const update = async (id: string, item: any): Promise<void> => {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.put({ ...item, id });

            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                db.close();
                resolve();
            };
        });
    };

    const remove = async (id: string): Promise<void> => {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.delete(id);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                db.close();
                resolve();
            };
        });
    };

    return { getAll, add, remove, update };
}
