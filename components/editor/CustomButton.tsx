'use client'

import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer, NodeViewWrapper } from '@tiptap/react'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'

const CustomButtonComponent = ({ node, updateAttributes, editor }) => {
    const [label, setLabel] = useState(node.attrs.label)
    const { onClick } = node.attrs

    useEffect(() => {
        setLabel(node.attrs.label)
    }, [node.attrs.label])

    return (
        <NodeViewWrapper className="custom-button-wrapper">
            <div className="flex justify-center w-full my-2 relative group">
                <Button
                    contentEditable={false}
                    onClick={() => {
                        if (onClick) {
                            new Function(onClick)()
                        }
                    }}
                >
                    {label}
                </Button>
                <input
                    type="text"
                    value={label}
                    onChange={(e) => {
                        setLabel(e.target.value)
                        updateAttributes({ label: e.target.value })
                    }}
                    className="absolute inset-0 opacity-0 cursor-text"
                />
                <div className="absolute inset-0 pointer-events-none border-2 border-transparent group-hover:border-blue-500 group-focus-within:border-blue-500 rounded transition-colors" />
            </div>
        </NodeViewWrapper>
    )
}

const CustomButton = Node.create({
    name: 'customButton',

    group: 'block',

    content: 'inline*',

    atom: true,

    addAttributes() {
        return {
            label: {
                default: 'Click me',
            },
            onClick: {
                default: null,
            },
        }
    },

    parseHTML() {
        return [
            {
                tag: 'div[data-custom-button]',
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ['div', mergeAttributes(HTMLAttributes, { 'data-custom-button': '' }), 0]
    },

    addNodeView() {
        return ReactNodeViewRenderer(CustomButtonComponent)
    },

    addKeyboardShortcuts() {
        return {
            Backspace: () => this.editor.commands.deleteSelection(),
            Delete: () => this.editor.commands.deleteSelection(),
        }
    },
})

export default CustomButton
