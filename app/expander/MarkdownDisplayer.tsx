'use client'

import StarterKit from '@tiptap/starter-kit';
import { Markdown } from 'tiptap-markdown';

import React, { useCallback, useEffect, useRef } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';

const useMarkdownDisplay = (content = '') => {
    const editor = useEditor({
        extensions: [StarterKit, Markdown],
        content: content || '',
        editable: false,
    });

    const insertContent = (content: string | null) => {
        console.log(content)
        if (content) {
            editor?.commands.setContent(content);
        }
    };

    return {
        insertContent,
        editor: <EditorContent editor={editor} />
    };
};

export default useMarkdownDisplay;
