'use client'

import { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { db } from '@/lib/instantdb/client';
import OutlineDisplay from '../OutlineDisplay';
import { getOutline } from '../create/actions';

const MiddlePanel = ({ onSelectOutline }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('All');
    const { data } = db.useQuery({
        outlines: {
            children: {}
        }
    });
    const outlines = data?.outlines || [];

    const filteredOutlines = outlines.filter(outline =>
        outline.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-[400px] border-r flex flex-col flex-shrink-0">
            <div className="p-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Outlines</h2>
                <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
                    <TabsList>
                        {['All', 'Recent'].map((tab) => (
                            <TabsTrigger key={tab} value={tab}>
                                {tab}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>
            </div>
            <div className="p-4">
                <div className="relative">
                    <Input
                        type="search"
                        placeholder="Search outlines..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
            </div>
            <ScrollArea className="flex-grow">
                <div className="p-2">
                    {filteredOutlines.map((outline) => (
                        <div
                            key={outline.id}
                            className="mb-2 p-3 rounded border hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                            onClick={() => onSelectOutline(outline)}
                        >
                            <h3 className="font-semibold text-lg mb-1 truncate">{outline.name}</h3>
                            <p className="text-sm text-gray-600 mb-1">Nodes: {outline.children?.length || 0}</p>
                            {/* <p className="text-xs text-gray-400">{new Date(outline.createdAt).toLocaleDateString()}</p> */}
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    )
}

const RightPanel = ({ selectedOutline }) => {
    const { isLoading, error, data } = getOutline(selectedOutline?.id)

    if (!selectedOutline) {
        return <div className="flex-grow p-4">Select an outline to view details</div>
    }

    return (
        <div className="flex-grow p-4">
            <h2 className="text-2xl font-bold mb-4">{selectedOutline.name}</h2>
            <OutlineDisplay outline={data?.outlines[0]} />
        </div>
    )
}

function Outlines() {
    const [selectedOutline, setSelectedOutline] = useState(null)

    return (
        <>
            <MiddlePanel onSelectOutline={setSelectedOutline} />
            <RightPanel selectedOutline={selectedOutline} />
        </>
    )
}

export default Outlines;
