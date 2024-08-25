'use client'

import { useState } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import Link from 'next/link'

// Mock data for demonstration
const mockOutline = [
    {
        id: 1, title: "Introduction", children: [
            { id: 2, title: "Background" },
            { id: 3, title: "Objectives" },
        ]
    },
    {
        id: 4, title: "Methodology", children: [
            { id: 5, title: "Data Collection" },
            { id: 6, title: "Analysis" },
        ]
    },
    { id: 7, title: "Results" },
    { id: 8, title: "Conclusion" },
]

const OutlineItem = ({ item, depth = 0 }) => (
    <div style={{ paddingLeft: `${depth * 20}px` }}>
        <Link href={`/expander/${item.id}`}>
            <Button variant="ghost" className="w-full justify-start">
                <ChevronRight className="mr-2 h-4 w-4" />
                {item.title}
            </Button>
        </Link>
        {item.children?.map(child => (
            <OutlineItem key={child.id} item={child} depth={depth + 1} />
        ))}
    </div>
)

const Breadcrumbs = ({ path }) => (
    <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
        {path.map((item, index) => (
            <div key={index} className="flex items-center">
                {index > 0 && <ChevronRight className="h-4 w-4 mx-1" />}
                <span>{item}</span>
            </div>
        ))}
    </div>
)

export default function ExpanderPage() {
    const [selectedContent, setSelectedContent] = useState(null)
    const [breadcrumbs, setBreadcrumbs] = useState(['Home'])

    // In a real application, this would fetch content based on the ID
    const fetchContent = (id) => {
        setSelectedContent(`Content for item ${id}`)
        setBreadcrumbs([...breadcrumbs, `Item ${id}`])
    }

    return (
        <div className="flex h-screen">
            <div className="w-1/3 border-r">
                <ScrollArea className="h-full">
                    {mockOutline.map(item => (
                        <OutlineItem key={item.id} item={item} />
                    ))}
                </ScrollArea>
            </div>
            <div className="w-2/3 p-6">
                <ScrollArea className="h-full">
                    <Breadcrumbs path={breadcrumbs} />
                    <Separator className="my-4" />
                    {selectedContent ? (
                        <div>{selectedContent}</div>
                    ) : (
                        <div className="text-center text-muted-foreground">
                            Select an item from the outline to view its content
                        </div>
                    )}
                </ScrollArea>
            </div>
        </div>
    )
}
