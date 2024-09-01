'use client'

import React from 'react'
import { FloatingMenu as TiptapFloatingMenu } from '@tiptap/react'
import { useEditor } from '@/components/editor/EditorContext'
import { Button } from '../ui/button'
import { insertGallery } from './Editor'

const FloatingMenu = () => {
    const { editor } = useEditor()

    if (!editor) {
        return null
    }

    return (
        <TiptapFloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
            <div className="floating-menu opacity-20 hover:opacity-100">
                <Button variant="outline"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
                >
                    H1
                </Button>
                <Button variant="outline"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
                >
                    H2
                </Button>
                <Button variant="outline"
                    onClick={() => insertGallery(editor)}
                    className={editor.isActive('bulletList') ? 'is-active' : ''}
                >
                    Insert Gallery
                </Button>
            </div>
        </TiptapFloatingMenu>
    )
}

export default FloatingMenu