'use client'

import { init, tx, id } from '@instantdb/react'

// ID for app: timothy
const APP_ID = '71186fbd-29c5-4d5f-bc04-68f6120e63c1'

type BlogPost = {
    id: string;
    title: string;
    subtitle: string;
    author: string;
    content: string;
    createdAt: number;
    likes: number;
}

// Optional: Declare your schema for intellisense!
type Schema = {
    blogPosts: BlogPost;
}

export const db = init<Schema>({ appId: APP_ID })
