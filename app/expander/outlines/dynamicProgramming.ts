
const outline = [
    {
        title: "I. Introduction to Dynamic Programming (DP)",
        children: [
            { title: "A. Definition and core principles" },
            { title: "B. Comparison with other problem-solving techniques" },
            { title: "C. When to use dynamic programming" }
        ]
    },
    {
        title: "II. Key Components of Dynamic Programming",
        children: [
            { title: "A. Optimal substructure" },
            { title: "B. Overlapping subproblems" },
            { title: "C. Memoization vs. Tabulation" }
        ]
    },
    {
        title: "III. Simple Dynamic Programming Problems",
        children: [
            {
                title: "A. Fibonacci Sequence",
                children: [
                    { title: "1. Recursive approach" },
                    { title: "2. DP approach with memoization" },
                    { title: "3. DP approach with tabulation" }
                ]
            },
            {
                title: "B. Climbing Stairs Problem",
                children: [
                    { title: "1. Problem statement" },
                    { title: "2. Recursive solution" },
                    { title: "3. DP solution" }
                ]
            }
        ]
    },
    {
        title: "IV. Intermediate Dynamic Programming Problems",
        children: [
            {
                title: "A. Longest Common Subsequence (LCS)",
                children: [
                    { title: "1. Problem statement" },
                    { title: "2. Recursive approach" },
                    { title: "3. DP solution with matrix" }
                ]
            },
            {
                title: "B. Knapsack Problem (0/1 Knapsack)",
                children: [
                    { title: "1. Problem statement" },
                    { title: "2. Recursive approach" },
                    { title: "3. DP solution with table" }
                ]
            }
        ]
    },
    {
        title: "V. Advanced Dynamic Programming Problems",
        children: [
            {
                title: "A. Matrix Chain Multiplication",
                children: [
                    { title: "1. Problem statement" },
                    { title: "2. Recursive approach" },
                    { title: "3. DP solution with table" }
                ]
            },
            {
                title: "B. Longest Increasing Subsequence (LIS)",
                children: [
                    { title: "1. Problem statement" },
                    { title: "2. DP solution" },
                    { title: "3. Optimized solution using binary search" }
                ]
            }
        ]
    },
    {
        title: "VI. Dynamic Programming in Strings",
        children: [
            {
                title: "A. Edit Distance",
                children: [
                    { title: "1. Problem statement" },
                    { title: "2. DP solution" }
                ]
            },
            {
                title: "B. Palindrome Partitioning",
                children: [
                    { title: "1. Problem statement" },
                    { title: "2. DP solution" }
                ]
            }
        ]
    },
    {
        title: "VII. Dynamic Programming in Trees and Graphs",
        children: [
            {
                title: "A. Maximum Path Sum in Binary Tree",
                children: [
                    { title: "1. Problem statement" },
                    { title: "2. DP solution" }
                ]
            },
            {
                title: "B. Shortest Path Algorithms (e.g., Floyd-Warshall)",
                children: [
                    { title: "1. Problem statement" },
                    { title: "2. DP solution" }
                ]
            }
        ]
    },
    {
        title: "VIII. Multi-dimensional Dynamic Programming",
        children: [
            {
                title: "A. Traveling Salesman Problem",
                children: [
                    { title: "1. Problem statement" },
                    { title: "2. DP solution" }
                ]
            },
            {
                title: "B. Optimal Binary Search Tree",
                children: [
                    { title: "1. Problem statement" },
                    { title: "2. DP solution" }
                ]
            }
        ]
    },
    {
        title: "IX. Dynamic Programming Optimization Techniques",
        children: [
            { title: "A. Space optimization" },
            { title: "B. Time optimization" },
            { title: "C. State compression" }
        ]
    },
    {
        title: "X. Real-world Applications of Dynamic Programming",
        children: [
            { title: "A. Resource allocation problems" },
            { title: "B. Bioinformatics (sequence alignment)" },
            { title: "C. Financial modeling and decision making" }
        ]
    },
    {
        title: "XI. Practice and Resources",
        children: [
            { title: "A. Online platforms for DP problems (LeetCode, HackerRank, etc.)" },
            { title: "B. Books and tutorials" },
            { title: "C. Tips for approaching and solving DP problems" }
        ]
    }
];

import { createHash } from 'crypto';

interface OutlineNode {
    id: string;
    title: string;
    children?: OutlineNode[];
}

function generateHash(title: string): string {
    return createHash('md5').update(title).digest('hex').substring(0, 8);
}

function assignIds(node: OutlineNode): OutlineNode {
    const newNode: OutlineNode = { ...node, id: generateHash(node.title) };
    if (node.children) {
        newNode.children = node.children.map(assignIds);
    }
    return newNode;
}

function assignParents(node: OutlineNode, parentTitles: string[] = []): OutlineNode {
    const newNode: OutlineNode = { ...node, parents: parentTitles };
    if (node.children) {
        newNode.children = node.children.map(child => 
            assignParents(child, [...parentTitles, node.title])
        );
    }
    return newNode;
}

function processOutline(outline: OutlineNode[]): OutlineNode[] {
    return outline.map(node => assignParents(assignIds(node)));
}


export function loadOutline(): OutlineNode[] {
    const newOutline = outline.map((node) => assignIds(node as OutlineNode));
    const processedOutline = processOutline(newOutline);
    return processedOutline;
}
