
export type OutlineNode = {
    title: string;
    children?: OutlineNode[];
};

export type Outline = {
    title: string;
    children: OutlineNode[];
};
