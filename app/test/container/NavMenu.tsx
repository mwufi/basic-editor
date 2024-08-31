"use client"

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu as MenuIcon, X as CloseIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";

export default function NavMenu() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const menuItems = [
        { href: "#pricing", label: "Pricing" },
        { href: "#docs", label: "Docs" },
        { href: "#how-to-use", label: "How to Use" },
        { href: "#g-sheets-integration", label: "G-Sheets Integration" },
    ];

    return (
        <header className={`container flex flex-col bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-opacity-90' : ''}`}>
            <div className="flex justify-between items-center py-2 px-4">
                <div className="flex items-center space-x-4">
                    <h1 className="text-2xl font-bold">blocks.md</h1>
                    <div className="hidden md:flex items-center space-x-4">
                        <nav>
                            <ul className="flex space-x-4">
                                {menuItems.map((item) => (
                                    <li key={item.href}>
                                        <a href={item.href} className="text-sm text-gray-600 hover:text-gray-900">
                                            {item.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>
                <div className="flex items-center space-x-2 md:space-x-4">
                    <Button variant="outline" size="sm" className="hidden md:inline-flex">
                        Follow
                    </Button>
                    <Button size="sm">
                        Buy Now
                    </Button>
                    <Dialog open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                        <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                {isMenuOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="w-screen h-screen max-w-none m-0 p-0">
                            <nav className="flex flex-col items-center justify-center h-full space-y-8 py-8">
                                {menuItems.map((item, index) => (
                                    <motion.div
                                        key={item.href}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <a
                                            href={item.href}
                                            className="text-2xl text-gray-800 hover:text-gray-900 relative group"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {item.label}
                                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-900 transition-all group-hover:w-full"></span>
                                        </a>
                                    </motion.div>
                                ))}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: menuItems.length * 0.1 }}
                                >
                                    <Button variant="outline" size="lg" onClick={() => setIsMenuOpen(false)}>
                                        Follow
                                    </Button>
                                </motion.div>
                            </nav>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </header>
    )
}