
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
