'use client'

import React, { createContext, useContext, useState } from 'react';

const EditorContext = createContext(null);

export const EditorProvider = ({ children }) => {
    const [editor, setEditor] = useState(null);

    return (
        <EditorContext.Provider value={{ editor, setEditor }}>
            {children}
        </EditorContext.Provider>
    );
};

export const useEditor = () => useContext(EditorContext);