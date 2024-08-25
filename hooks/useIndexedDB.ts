import { useState, useEffect } from 'react';

interface IndexedDBHook {
    getAll: () => Promise<any[]>;
    add: (item: any) => Promise<void>;
    remove: (id: string) => Promise<void>;
    update: (id: string, item: any) => Promise<void>;
}

export default function useIndexedDB(storeName: string, mode: IDBTransactionMode = 'readonly'): IndexedDBHook {
    const dbName = 'MyDatabase';
    const dbVersion = 2;
    const openDB = (): Promise<IDBDatabase> => {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(dbName, dbVersion);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);

            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;
                const oldVersion = event.oldVersion;

                if (oldVersion < 1) {
                    // Create initial schema (v1)
                    db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
                }
                if (oldVersion < 2) {
                    // Upgrade v1 to v2 schema (if needed)
                    // Add new object stores or modify existing ones
                }
                if (oldVersion < 3) {
                    // Upgrade v2 to v3 schema (if needed)
                    // Add new object stores or modify existing ones
                }
                // Add more version checks as needed
            };
        });
    };

    const ensureObjectStore = async (db: IDBDatabase): Promise<void> => {
        if (!db.objectStoreNames.contains(storeName)) {
            const version = db.version + 1;
            db.close();
            return new Promise((resolve, reject) => {
                const request = indexedDB.open(dbName, version);
                request.onupgradeneeded = (event) => {
                    const db = (event.target as IDBOpenDBRequest).result;
                    const oldVersion = event.oldVersion;

                    if (oldVersion < version) {
                        db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
                    }
                };
                request.onsuccess = () => resolve();
                request.onerror = () => reject(request.error);
            });
        }
    };

    const performTransaction = async (
        mode: IDBTransactionMode,
        callback: (store: IDBObjectStore) => IDBRequest
    ): Promise<any> => {
        const db = await openDB();
        await ensureObjectStore(db);
        return new Promise((resolve, reject) => {
            try {
                const transaction = db.transaction(storeName, mode);
                const store = transaction.objectStore(storeName);
                const request = callback(store);

                request.onerror = () => {
                    db.close();
                    reject(request.error);
                };
                request.onsuccess = () => {
                    db.close();
                    resolve(request.result);
                };
            } catch (error) {
                db.close();
                reject(error);
            }
        });
    };

    const getAll = async (): Promise<any[]> => {
        return performTransaction(mode, (store) => store.getAll());
    };

    const add = async (item: any): Promise<void> => {
        return performTransaction('readwrite', (store) => store.add(item));
    };

    const update = async (id: string, item: any): Promise<void> => {
        return performTransaction('readwrite', (store) => store.put({ ...item, id }));
    };

    const remove = async (id: string): Promise<void> => {
        return performTransaction('readwrite', (store) => store.delete(id));
    };

    return { getAll, add, remove, update };
}
