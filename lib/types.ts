
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

export type Theme = {
    name: string;
    content: Record<string, any>;
}

export interface Note {
    id?: number;
    title: string;
    text: string;
    isNew: boolean;
    metadata?: Record<string, any>;
    content?: string; // legacy!!
    createdAt: Date;
    updatedAt: Date;

    // for syncing to the cloud!
    isPublished: boolean;
    publishedId?: string;
    publishedAt?: Date;
    lastSyncedAt?: Date;
}