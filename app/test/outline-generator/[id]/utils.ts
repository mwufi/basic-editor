import { Outline, OutlineNode } from "@/lib/types";

export const getNodePath = (nodeId: string, rootNode: any): { ancestors: string[], siblings: string[] } | null => {
    const stack: { node: any; parentNode: any | null; ancestorPath: string[] }[] = [{ node: rootNode, parentNode: null, ancestorPath: [] }];

    while (stack.length > 0) {
        const { node, parentNode, ancestorPath } = stack.pop()!;

        if (node.id === nodeId) {
            const siblings = parentNode?.children
                ?.filter((child: any) => child.id !== nodeId)
                .map((child: any) => child.title) || [];
            return { ancestors: ancestorPath, siblings };
        }

        if (node.children && node.children.length > 0) {
            const newAncestorPath = [...ancestorPath, node.title];
            for (let i = node.children.length - 1; i >= 0; i--) {
                stack.push({ node: node.children[i], parentNode: node, ancestorPath: newAncestorPath });
            }
        }
    }

    return null;
};

export function getOutlineAsText({ outline, selectedNode }: { outline: Outline, selectedNode: OutlineNode }): string {
    const result: string[] = [];

    function traverse(node: OutlineNode, depth: number, isSelected: boolean = false) {
        if (!node) return;

        const indent = '  '.repeat(depth);
        const prefix = isSelected ? '-> ' : '';

        if (node.id === selectedNode.id) {
            result.push(`${indent}${prefix}${node.title} (current)`);
            return true;
        } else {
            result.push(`${indent}${prefix}${node.title}`);
        }


        if (node.children) {
            for (const child of node.children) {
                if (traverse(child, depth + 1)) {
                    return true;
                }
            }
        }

        return false;
    }

    traverse(outline, 0);
    return result.join('\n');
}

export function getPrompt(currentContext: string, selectedNode: OutlineNode, additionalInstructions?: string): string {
    return `Generate an article for this section: ${selectedNode.title}\n\nTo help you understand the context, here are the preceding sections (already written):\n ${currentContext}\n\nAdditional instructions: ${additionalInstructions}`
}