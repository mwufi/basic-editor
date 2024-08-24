'use client'

import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer, NodeViewWrapper } from '@tiptap/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const CustomButtonComponent = ({ node, updateAttributes, editor }) => {
    const [label, setLabel] = useState(node.attrs.label)
    const [action, setAction] = useState(node.attrs.action)
    const [actionValue, setActionValue] = useState(node.attrs.actionValue)
    const editable = editor.isEditable

    useEffect(() => {
        setLabel(node.attrs.label)
        setAction(node.attrs.action)
        setActionValue(node.attrs.actionValue)
    }, [node.attrs])

    const handleAction = () => {
        switch (action) {
            case 'alert':
                alert(actionValue)
                break
            case 'message':
                console.log(actionValue)
                break
            case 'link':
                window.open(actionValue, '_blank')
                break
        }
    }

    if (!editable) {
        return (
            <NodeViewWrapper className="custom-button-wrapper">
                <div className="flex justify-center w-full my-2">
                    {action === 'link' ? (
                        <Link href={actionValue} target="_blank" passHref>
                            <Button>{label}</Button>
                        </Link>
                    ) : (
                        <Button onClick={handleAction}>
                            {label}
                        </Button>
                    )}
                </div>
            </NodeViewWrapper>
        )
    }

    return (
        <NodeViewWrapper className="custom-button-wrapper">
            <div className="flex flex-col items-center w-full my-2 p-4 border rounded">
                <Input
                    type="text"
                    value={label}
                    onChange={(e) => {
                        setLabel(e.target.value)
                        updateAttributes({ label: e.target.value })
                    }}
                    placeholder="Button Text"
                    className="mb-2"
                />
                <Select value={action} onValueChange={(value) => {
                    setAction(value)
                    updateAttributes({ action: value })
                }}>
                    <SelectTrigger className="w-full mb-2">
                        <SelectValue placeholder="Select action" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="alert">Alert</SelectItem>
                        <SelectItem value="message">Display Message</SelectItem>
                        <SelectItem value="link">Link</SelectItem>
                    </SelectContent>
                </Select>
                <Input
                    type="text"
                    value={actionValue}
                    onChange={(e) => {
                        setActionValue(e.target.value)
                        updateAttributes({ actionValue: e.target.value })
                    }}
                    placeholder={action === 'link' ? 'URL' : 'Message'}
                    className="mb-2"
                />
                <Button onClick={handleAction}>
                    {label}
                </Button>
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
            action: {
                default: 'alert',
            },
            actionValue: {
                default: 'Button clicked!',
            }
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
