'use client'

import { ThemeProvider } from './themeContext'
import YourComponent from './Component'
import Tiptap from '@/components/TipTap'
import { EditorProvider } from '@/components/editor/EditorContext'

export default function ThemedEditorPage() {
    return (
        <ThemeProvider>
            <EditorProvider>
                <div className="container mx-auto p-4">
                    <h1 className="text-3xl font-bold mb-6">Themed Editor Demo</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h2 className="text-2xl font-semibold mb-4">Theme Controls</h2>
                            <YourComponent />
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold mb-4">Tiptap Editor</h2>
                            <Tiptap />
                        </div>
                    </div>
                </div>
            </EditorProvider>
        </ThemeProvider>
    )
}