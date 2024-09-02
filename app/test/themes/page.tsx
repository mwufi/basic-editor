'use client'

import YourComponent from './Component';
import Tiptap from '@/components/TipTap';
import { EditorProvider } from '@/components/editor/EditorContext';
import ThemeEditor from '@/components/dev/ThemeEditor';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'; // Assuming you have a Tabs component

export default function ThemedEditorPage() {


    return (
        <EditorProvider>
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-6">Themed Editor</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Theme Controls</h2>
                        <Tabs defaultValue="ui" className="w-[400px]">
                            <TabsList>
                                <TabsTrigger value="text">Edit via Text Box</TabsTrigger>
                                <TabsTrigger value="ui">Edit via UI</TabsTrigger>
                            </TabsList>
                            <TabsContent value="text">
                                <YourComponent />
                            </TabsContent>
                            <TabsContent value="ui">
                                <ThemeEditor />
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </EditorProvider>
    )
}