import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Markdown } from 'tiptap-markdown';

export function MarkdownPreview({ content }: { content: string }) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Markdown,
        ],
        content: content || '',
        editable: false, // Make it read-only
    });

    useEffect(() => {
        let c = content || ''
        if (editor && c !== editor.getHTML()) {
            editor.commands.setContent(c);
        }
    }, [content, editor]);

    return <EditorContent editor={editor} />;
}