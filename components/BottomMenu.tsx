'use client'

import { useState } from 'react'
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"

const BottomMenu = ({ children, onShare }) => {
    const [isPublic, setIsPublic] = useState(false)
    const [shareableLink, setShareableLink] = useState('')

    const handleSaveToSupabase = () => {
        // Logic to save to Supabase
        console.log('Saving to Supabase...')
    }

    return (
        <Drawer>
            <DrawerTrigger asChild>
                {children}
            </DrawerTrigger>
            <DrawerContent className="h-[50vh] max-w-lg mx-auto">
                <div className="p-4 space-y-4">
                    <h2 className="text-lg font-semibold">Publishing and Sharing Options</h2>
                    <div className="flex items-center justify-between">
                        <span>Make Public</span>
                        <Switch
                            checked={isPublic}
                            onCheckedChange={setIsPublic}
                            aria-label="Toggle public visibility"
                        />
                    </div>
                    <div>
                        <label htmlFor="shareable-link" className="block text-sm font-medium text-gray-700">
                            Shareable Link
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                            <Input
                                type="text"
                                name="shareable-link"
                                id="shareable-link"
                                value={shareableLink}
                                onChange={(e) => setShareableLink(e.target.value)}
                                className="flex-1"
                                placeholder="Generated link will appear here"
                                readOnly
                            />
                            <Button className="ml-2">Copy</Button>
                        </div>
                    </div>
                    <Button onClick={handleSaveToSupabase} className="w-full">
                        Save to Owri Cloud
                    </Button>
                    <Button onClick={onShare} className="w-full">
                        Copy to Clipboard
                    </Button>
                </div>
            </DrawerContent>
        </Drawer>
    )
}

export default BottomMenu
