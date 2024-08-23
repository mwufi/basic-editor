"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Save, Share } from "lucide-react"

const HeaderBar = () => {
    const [title, setTitle] = useState("Untitled")
    const [isEditing, setIsEditing] = useState(false)

    const handleRetitle = () => {
        setIsEditing(!isEditing)
    }

    const handleSave = () => {
        // Implement save functionality
        console.log("Saving...")
    }

    const handleShare = () => {
        // Implement share functionality
        console.log("Sharing...")
    }

    return (
        <header className="sticky top-0 z-10 flex items-center justify-between p-4 bg-background border-b">
            <div className="flex-1 flex justify-center">
                {isEditing ? (
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        handleRetitle()
                    }}>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-[300px] text-lg font-semibold text-center focus-visible:ring-0 border-none"
                            onBlur={handleRetitle}
                            autoFocus
                        />
                    </form>
                ) : (
                    <h1 className="text-lg font-semibold" onClick={handleRetitle}>
                        {title}
                    </h1>
                )}
            </div>
            <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={handleSave}>
                    <Save className="mr-2 h-4 w-4" />
                    Save
                </Button>
                <Button variant="ghost" size="sm" onClick={handleShare}>
                    <Share className="mr-2 h-4 w-4" />
                    Share
                </Button>
            </div>
        </header>
    )
}

export default function HomePage() {
    return (
        <div className="min-h-screen flex flex-col">
            <HeaderBar />
            {/* Rest of your page content */}
        </div>
    )
}
