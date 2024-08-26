
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
    posts: {
        id: string;
        title: string;
        text: string;
        createdAt: number;
        comments: Array<Schema['comments']>;
        author: Schema['users'];
        pin: Schema['pins'];
    };
    outlines: {
        id: string;
        name: string;
        content: object;
        author: Schema['users'];
        outlineNodes: Array<Schema['outlineNodes']>;
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