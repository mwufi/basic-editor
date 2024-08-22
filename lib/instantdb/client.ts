'use client'

import { init, tx, id } from '@instantdb/react'

// ID for app: timothy
const APP_ID = '71186fbd-29c5-4d5f-bc04-68f6120e63c1'

// Schema definition based on the provided data model
type Schema = {
  users: {
    id: string;
    email: string;
    handle: string;
    createdAt: number;
    posts: Array<Schema['posts']>;
    pin: Schema['pins'];
  };
  posts: {
    id: string;
    text: string;
    createdAt: number;
    comments: Array<Schema['comments']>;
    author: Schema['users'];
    pin: Schema['pins'];
  };
  comments: {
    id: string;
    text: string;
    post: Schema['posts'];
    author: Schema['users'];
  };
  pins: {
    id: string;
    post: Schema['posts'];
    author: Schema['users'];
  };
};

export const db = init<Schema>({ appId: APP_ID })