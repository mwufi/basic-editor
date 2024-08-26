import { db } from '@/lib/instantdb/client'
import { Outline, OutlineNode } from '@/lib/types'
import { tx, id } from '@instantdb/core'

export async function saveOutlineForUser(outline: Outline, userId: string) {
    const outlineId = id()
    const createOutlineTx = tx.outlines[outlineId].update({
        name: outline.title,
        content: {},
    }).link({
        author: userId
    });

    const createNodeTx = (node: OutlineNode, parentId: string, index: number, withChildren: boolean = true, depth: number = 0) => {
        const nodeId = id()
        // create the node
        const selfTx = tx.outlineNodes[nodeId].update({
            title: node.title,
            index: index,
            content: '',
        }).link({
            author: userId,
            ...(depth === 0 && { outline: outlineId }),
            ...(parentId && { parent: parentId })
        })
        // create the children
        const childrenTx = node.children?.flatMap((child, index) => createNodeTx(child, nodeId, index, withChildren, depth + 1)) || []
        return [selfTx, ...childrenTx]
    }

    const result = await db.transact([
        createOutlineTx,
        ...outline.children.flatMap((child, index) => createNodeTx(child, outlineId, index, true))
    ])
    return { result, outlineId }
}

export function getOutline(outlineId: string) {
    const query = {
        outlines: {
            $: {
                where: {
                    id: outlineId
                },
            },
            children: {
                children: {
                    children: {
                        children: {}
                    }
                }
            }
        }
    }
    const { isLoading, error, data } = db.useQuery(outlineId ? query : null)
    return { isLoading, error, data }
}