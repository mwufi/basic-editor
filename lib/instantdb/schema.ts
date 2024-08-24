
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

export default Schema;