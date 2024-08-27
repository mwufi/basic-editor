import { Editor } from '@tiptap/core';
import { EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Markdown } from 'tiptap-markdown';

export function MarkdownPreview({ content }: { content: string }) {
    const editor = new Editor({
        content: content,
        extensions: [
            StarterKit,
            Markdown,
        ],
    });

    return <EditorContent editor={editor} />

}