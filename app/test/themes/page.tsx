'use client'

import { useEffect, useState } from 'react';
import { EditorProvider } from '@/components/editor/EditorContext';
import ThemeEditor from '@/components/dev/ThemeEditor';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { themeAtom } from '@/components/editor/atoms';
import { useAtomValue } from 'jotai';
import { useUserProfile } from '@/lib/instantdb/queries';
import { getThemes, saveTheme } from '@/lib/instantdb/mutations';
import YourComponent from './Component';
import { toast } from 'sonner';

export default function ThemedEditorPage() {
    const theme = useAtomValue(themeAtom);
    const { user } = useUserProfile();
    const { isLoading, error, data } = getThemes();
    const [selectedTheme, setSelectedTheme] = useState(null);
    console.log(data);

    const handleSaveTheme = () => {
        const themeName = prompt("Please enter the theme name:");
        if (themeName) {
            theme.name = themeName; // Update the theme object with the entered name
        } else {
            toast.error("Theme name is required!");
            return; // Exit the function if no name is provided
        }
        try {
            saveTheme(theme, user.id);
            toast.success(`Theme ${theme.name} saved!`);
        } catch (e) {
            if (!user) {
                toast.error("Error saving theme!! Maybe you are not logged in?");
            } else {
                toast.error("Error saving theme!!");
            }
            console.error(e);
        }
    };

    const handleThemeSelect = (theme) => {
        setSelectedTheme(theme);
    };

    return (
        <EditorProvider>
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-6">Themed Editor</h1>
                <div className="grid grid-cols-[300px_1fr] gap-8 items-start">
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Available Themes</h2>
                        {isLoading && <p>Loading themes...</p>}
                        {error && <p>Error loading themes.</p>}
                        {data?.theme && (
                            <div className="flex flex-col">
                                {data.theme.map((theme) => (
                                    <label key={theme.id} className="flex items-center">
                                        <input
                                            type="radio"
                                            name="theme"
                                            value={theme.id}
                                            checked={selectedTheme?.id === theme.id}
                                            onChange={() => handleThemeSelect(theme)}
                                            className="mr-2"
                                        />
                                        <span>{theme.name} by {theme.author[0].handle}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                    <div>
                        <div className="flex items-center justify-end mb-4">
                            <Button onClick={handleSaveTheme}>Save theme as...</Button>
                        </div>
                        <h2 className="text-2xl font-semibold mb-4">Theme Controls</h2>
                        <Tabs defaultValue="ui" className="w-full">
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