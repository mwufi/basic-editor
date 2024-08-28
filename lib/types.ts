
export type OutlineNode = {
    id: string;
    title: string;
    content: string;
    children?: OutlineNode[];
};

export type Outline = {
    title: string;
    children: OutlineNode[];
};

export interface Note {
    id?: number;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;

    // for syncing to the cloud!
    isPublished: boolean;
    publishedId?: string;
    publishedAt?: Date;
    lastSyncedAt?: Date;
}