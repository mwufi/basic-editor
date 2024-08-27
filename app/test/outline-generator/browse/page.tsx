'use client'

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { db } from '@/lib/instantdb/client';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import NonFeaturedOutline from './Card';
import FeaturedOutline from './Featured';


const MiddlePanel = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('All');
    const { data } = db.useQuery({
        outlines: {
            children: {}
        }
    });
    const outlines = data?.outlines || [];

    const filteredOutlines = outlines.filter(outline =>
        outline.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const featuredOutlines = outlines.slice(0, 10); // Assuming first 5 are featured

    return (
        <div className="flex flex-col w-full mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Discover Outlines</h2>
                <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
                    <TabsList>
                        {['All', 'Recent', 'Popular'].map((tab) => (
                            <TabsTrigger key={tab} value={tab}>
                                {tab}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>
            </div>

            <div className="mb-8">
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
            <div className="mb-12">
                <h3 className="text-2xl font-semibold mb-4 text-gray-700">Featured Outlines</h3>
                <div className="relative">
                    <Carousel className="overflow-hidden">
                        <CarouselContent className="mx-6">
                            {featuredOutlines.map((outline) => (
                                <CarouselItem key={outline.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                                    <FeaturedOutline outline={outline} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2" />
                        <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2" />
                    </Carousel>
                </div>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-700">All Outlines</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredOutlines.map((outline) => (
                    <NonFeaturedOutline key={outline.id} outline={outline} />
                ))}
            </div>
        </div>
    )
}
const Outlines = () => {

    return (
        <div className="flex bg-gray-50 min-h-screen w-full">
            <MiddlePanel />
        </div>
    )
}

export default Outlines;

