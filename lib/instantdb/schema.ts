
// Schema definition based on the provided data model
type Schema = {
    users: {
        id: string;
        email: string;
        handle: string;
        createdAt: number;
        authId: string;
        posts: Array<Schema['posts']>;
        pin: Schema['pins'];
    };
    pages: {
        id: string;
        title: string;
        href: string;
        author: Schema['users'];
        post: Schema['posts'];
    };
    posts: {
        id: string;
        title: string;
        text: string;
        metadata: object;
        createdAt: number;
        updatedAt: number;
        comments: Array<Schema['comments']>;
        author: Schema['users'];
        pin: Schema['pins'];
    };
    outlines: {
        id: string;
        title: string;
        description: string;
        author: Schema['users'];
        children: Array<Schema['outlineNodes']>;
    };
    theme: {
        id: string;
        name: string;
        content: string;
        author: Schema['users'];
        themeConfirmations: Array<Schema['themeConfirmations']>;
        createdAt: number;
    };
    themeConfirmations: {
        id: string;
        theme: Schema['theme'];
        value: number;
        createdAt: number;
    };
    outlineNodes: {
        id: string;
        index: number;
        title: string;
        content: string;
        parent: Schema['outlineNodes'];
        children: Array<Schema['outlineNodes']>;
        textGenerations: Array<Schema['textGeneration']>;
        author: Schema['users'];
        outline: Schema['outlines'];
    };
    textGeneration: {
        id: string;
        text: string;
        createdAt: number;
        outlineNode: Schema['outlineNodes'];
        author: Schema['users'];
        prompt: Schema['prompt'];
        metadata: object;
    };
    prompt: {
        id: string;
        text: string;
        createdAt: number;
        author: Schema['users'];
        generatedContent: Array<Schema['textGeneration']>;
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

export default Schema;