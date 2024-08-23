"use client"

import { useState } from 'react';
import { Input } from "@/components/ui/input";

interface NavItem {
    display: string;
    url: string;
}

const SimpleNav = ({ items }: { items: NavItem[] }) => (
    <nav className="bg-gray-100 p-4 rounded-lg mb-4">
        <ul className="flex space-x-4">
            {items.map((item, index) => (
                <li key={index}>
                    <a href={'#'} className="text-blue-600 hover:underline">{item.display}</a>
                </li>
            ))}
        </ul>
    </nav>
);

const PillNav = ({ items }: { items: NavItem[] }) => (
    <nav className="bg-white shadow-md p-4 rounded-full mb-4">
        <ul className="flex space-x-2">
            {items.map((item, index) => (
                <li key={index}>
                    <a href={'#'} className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">{item.display}</a>
                </li>
            ))}
        </ul>
    </nav>
);

const VerticalNav = ({ items }: { items: NavItem[] }) => (
    <nav className="bg-gray-800 text-white p-4 rounded-lg mb-4 w-48">
        <ul className="space-y-2">
            {items.map((item, index) => (
                <li key={index}>
                    <a href={'#'} className="block py-2 px-4 hover:bg-gray-700 rounded transition-colors">{item.display}</a>
                </li>
            ))}
        </ul>
    </nav>
);

const NavDisplay = () => {
    const [navItems, setNavItems] = useState<NavItem[]>([
        { display: "Home", url: "/" },
        { display: "About", url: "/about" },
        { display: "Contact", url: "/contact" }
    ]);
    const [jsonInput, setJsonInput] = useState(JSON.stringify(navItems, null, 2));

    const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setJsonInput(e.target.value);
        try {
            const parsedItems = JSON.parse(e.target.value);
            setNavItems(parsedItems);
        } catch (error) {
            console.error("Invalid JSON input");
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Nav Display Options</h1>
            
            <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Simple Nav</h2>
                <SimpleNav items={navItems} />
            </div>
            
            <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Pill Nav</h2>
                <PillNav items={navItems} />
            </div>
            
            <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Vertical Nav</h2>
                <VerticalNav items={navItems} />
            </div>
            
            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-2">Edit Nav Items (JSON)</h2>
                <textarea
                    value={jsonInput}
                    onChange={handleJsonChange}
                    className="w-full h-48 p-2 border rounded"
                    placeholder="Enter JSON for nav items"
                />
            </div>
        </div>
    );
};

export default function HomePage() {
    return <NavDisplay />;
}
