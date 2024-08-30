'use client'

import { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { db } from '@/lib/instantdb/client';
import Link from 'next/link';
import { motion } from 'framer-motion';

const FeaturedOutline = ({ outline }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-accent p-6 rounded-lg shadow-md mb-8"
    >
        <h3 className="text-2xl font-bold mb-2">{outline.title}</h3>
        <p className="text-muted-foreground mb-4">{outline.description}</p>
        <Link href={`/test/outline-generator/${outline.id}`} className="text-primary hover:underline">
            View Outline
        </Link>
    </motion.div>
);

const OutlineList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('All');
    const { data } = db.useQuery({
        outlines: {
            children: {}
        }
    });
    const [featuredOutline, setFeaturedOutline] = useState(null);
    const [otherOutlines, setOtherOutlines] = useState([]);

    useEffect(() => {
        if (data?.outlines) {
            // Assuming the first outline is featured for simplicity
            // You might want to add a 'featured' field to your data model for a real app
            const sortedOutlines = [...data.outlines].sort((a, b) => b.id.localeCompare(a.id));
            setFeaturedOutline(sortedOutlines[0]);
            setOtherOutlines(sortedOutlines.slice(1));
        }
    }, [data]);

    const filteredOutlines = otherOutlines.filter(outline =>
        outline.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col w-full max-w-3xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">Discover Outlines</h2>
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

            {featuredOutline && <FeaturedOutline outline={featuredOutline} />}

            <div className="mb-8">
                <div className="relative">
                    <Input
                        type="search"
                        placeholder="Search outlines..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
            </div>

            <motion.ul className="space-y-4">
                {filteredOutlines.map((outline, index) => (
                    <motion.li
                        key={outline.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="border-b pb-4"
                    >
                        <Link href={`/test/outline-generator/${outline.id}`} className="block hover:bg-accent p-2 rounded">
                            <h3 className="text-lg font-semibold">{outline.title}</h3>
                            <p className="text-sm text-muted-foreground">{outline.description}</p>
                        </Link>
                    </motion.li>
                ))}
            </motion.ul>
        </div>
    )
}

const Outlines = () => {
    return (
        <div className="flex min-h-screen w-full">
            <OutlineList />
        </div>
    )
}

export default Outlines;
