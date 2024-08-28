import { db } from '@/lib/instantdb/client'
import { Note, Outline, OutlineNode } from '@/lib/types'
import { tx, id } from '@instantdb/core'
import IndexedDBNotesManager from '../IndexedDBNotesManager';

export async function saveOutlineForUser(outline: Outline, userId: string) {
    const outlineId = id()
    const createOutlineTx = tx.outlines[outlineId].update({
        name: outline.title,
        content: {},
    }).link({
        author: userId
    });

    const createNodeTx = (node: OutlineNode, parentId: string, index: number, withChildren: boolean = true, depth: number = 0) => {
        const nodeId = id()
        // create the node
        const selfTx = tx.outlineNodes[nodeId].update({
            title: node.title,
            index: index,
            content: '',
        }).link({
            author: userId,
            ...(depth === 0 && { outline: outlineId }),
            ...(parentId && { parent: parentId })
        })
        // create the children
        const childrenTx = node.children?.flatMap((child, index) => createNodeTx(child, nodeId, index, withChildren, depth + 1)) || []
        return [selfTx, ...childrenTx]
    }

    const result = await db.transact([
        createOutlineTx,
        ...outline.children.flatMap((child, index) => createNodeTx(child, outlineId, index, true))
    ])
    return { result, outlineId }
}

export async function saveOutlineNodeContent(nodeId: string, content: string) {
    const updateNodeTx = tx.outlineNodes[nodeId].update({
        content: content,
    });

    try {
        const result = await db.transact([updateNodeTx]);
        return { success: true, result };
    } catch (error) {
        console.error('Error saving outline node content:', error);
        return { success: false, error };
    }
}


export function getOutline(outlineId: string) {
    const query = {
        outlines: {
            $: {
                where: {
                    id: outlineId
                },
            },
            children: {
                children: {
                    children: {
                        children: {}
                    }
                }
            }
        }
    }
    const { isLoading, error, data } = db.useQuery(outlineId ? query : null)
    return { isLoading, error, data }
}

export async function syncPost(note: Note, userId: string) {
    const noteId = note.publishedId || id();
    const updatePostTx = tx.posts[noteId].update({
        title: note.title,
        text: note.content,
        createdAt: note.createdAt || Date.now(),
        updatedAt: Date.now()
    }).link({
        author: userId
    });
    const result = await db.transact([updatePostTx]);
    return { success: true, result, noteId };
}

export function getPost(postId: string) {
    const query = {
        posts: {
            $: {
                where: {
                    id: postId
                },
            },
            author: {},
            comments: {
                author: {}
            }
        }
    }
    const { isLoading, error, data } = db.useQuery(postId ? query : null)
    return { isLoading, error, data }
}
export async function saveNoteLocal(note: Partial<Note>): Promise<{ success: boolean; noteId?: number; error?: any }> {
    const notesManager = new IndexedDBNotesManager();
    try {
        if (note.id) {
            await notesManager.updateNote(note.id, {
                title: note.title,
                content: note.content,
            });
            console.log("Note updated", note.id, note);
            return { success: true, noteId: note.id };
        } else {
            const id = await notesManager.addNote(note as Note);
            console.log("Note added", id, note);
            return { success: true, noteId: id };
        }
    } catch (error) {
        console.error("Error saving note", error);
        return { success: false, error };
    }
}

export async function updatePublishInfo(note: Note, publishedId: string) {
    const notesManager = new IndexedDBNotesManager();
    await notesManager.updateNote(note.id, { ...note, publishedId, isPublished: true, lastSyncedAt: new Date() });
}