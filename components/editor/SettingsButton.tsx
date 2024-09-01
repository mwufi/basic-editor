'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Settings } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export default function SettingsButton() {
    const [zenMode, setZenMode] = useState(false)
    const [theme, setTheme] = useState('light')

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="secondary" className="text-gray-600">
                    <Settings className="h-[1.5rem] w-[1.5rem] mr-2" />
                    Settings
                </Button>
            </DialogTrigger>
            <DialogContent className="h-full">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold mb-4">Settings</DialogTitle>
                </DialogHeader>
                <Tabs defaultValue="editing" className="w-full h-full">
                    <TabsList className="grid w-full grid-cols-3 mb-6">
                        <TabsTrigger value="editing" className="text-lg py-3">Editing</TabsTrigger>
                        <TabsTrigger value="sharing" className="text-lg py-3">Sharing</TabsTrigger>
                        <TabsTrigger value="theme" className="text-lg py-3">Theme</TabsTrigger>
                    </TabsList>
                    <TabsContent value="editing" className="space-y-6">
                        <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg">
                            <Switch
                                id="zen-mode"
                                checked={zenMode}
                                onCheckedChange={setZenMode}
                                className="scale-125"
                            />
                            <Label htmlFor="zen-mode" className="text-lg">Zen Mode</Label>
                        </div>
                        <div className="p-4 bg-gray-100 rounded-lg">
                            <h3 className="text-xl font-semibold mb-3">Font Settings</h3>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span>Font Size</span>
                                    <input type="range" min="12" max="24" className="w-1/2" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Line Height</span>
                                    <input type="range" min="1" max="2" step="0.1" className="w-1/2" />
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="sharing" className="space-y-6">
                        <div className="p-4 bg-gray-100 rounded-lg">
                            <h3 className="text-xl font-semibold mb-3">Sharing Options</h3>
                            <p className="text-lg mb-4">Choose how you want to share your content:</p>
                            <div className="space-y-3">
                                <div className="flex items-center space-x-2">
                                    <input type="checkbox" id="public-share" />
                                    <label htmlFor="public-share">Make public</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input type="checkbox" id="allow-comments" />
                                    <label htmlFor="allow-comments">Allow comments</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input type="checkbox" id="enable-social-share" />
                                    <label htmlFor="enable-social-share">Enable social media sharing</label>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="theme" className="space-y-6">
                        <RadioGroup value={theme} onValueChange={setTheme} className="p-4 bg-gray-100 rounded-lg">
                            <h3 className="text-xl font-semibold mb-3">Choose Your Theme</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center space-x-2 p-3 border rounded-md">
                                    <RadioGroupItem value="light" id="light" className="scale-125" />
                                    <Label htmlFor="light" className="text-lg">Light</Label>
                                </div>
                                <div className="flex items-center space-x-2 p-3 border rounded-md">
                                    <RadioGroupItem value="dark" id="dark" className="scale-125" />
                                    <Label htmlFor="dark" className="text-lg">Dark</Label>
                                </div>
                                <div className="flex items-center space-x-2 p-3 border rounded-md">
                                    <RadioGroupItem value="system" id="system" className="scale-125" />
                                    <Label htmlFor="system" className="text-lg">System</Label>
                                </div>
                                <div className="flex items-center space-x-2 p-3 border rounded-md">
                                    <RadioGroupItem value="custom" id="custom" className="scale-125" />
                                    <Label htmlFor="custom" className="text-lg">Custom</Label>
                                </div>
                            </div>
                        </RadioGroup>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}
