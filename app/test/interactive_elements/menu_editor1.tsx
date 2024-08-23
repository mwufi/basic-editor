"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Edit } from 'lucide-react';

interface MenuItem {
    id: string;
    label: string;
    url: string;
}

const MenuEditor = () => {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([
        { id: '1', label: 'Home', url: '/' },
        { id: '2', label: 'About', url: '/about' },
    ]);
    const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
    const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);

    const addMenuItem = (newItem: MenuItem) => {
        setMenuItems([...menuItems, { ...newItem, id: Date.now().toString() }]);
    };

    const removeMenuItem = (id: string) => {
        setMenuItems(menuItems.filter(item => item.id !== id));
    };

    const startEditing = (item: MenuItem) => {
        setEditingItem(item);
    };

    const saveEdit = () => {
        if (editingItem) {
            if (editingItem.id) {
                setMenuItems(menuItems.map(item => 
                    item.id === editingItem.id ? editingItem : item
                ));
            } else {
                addMenuItem(editingItem);
            }
            setEditingItem(null);
        }
    };

    return (
        <div className="space-y-8">
            <div className="bg-gray-100 p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-2">Preview</h2>
                <nav className="bg-white p-4 rounded-lg relative">
                    <ul className="flex space-x-4">
                        {menuItems.map((item) => (
                            <li 
                                key={item.id} 
                                className="relative"
                                onMouseEnter={() => setHoveredItemId(item.id)}
                                onMouseLeave={() => setHoveredItemId(null)}
                            >
                                <a href={item.url} className="text-blue-600 hover:underline">{item.label}</a>
                                {hoveredItemId === item.id && (
                                    <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded p-2">
                                        <Button variant="ghost" size="sm" onClick={() => startEditing(item)}>
                                            <Edit className="h-4 w-4 mr-1" /> Edit
                                        </Button>
                                        <Button variant="ghost" size="sm" onClick={() => removeMenuItem(item.id)}>
                                            <Trash2 className="h-4 w-4 mr-1" /> Delete
                                        </Button>
                                    </div>
                                )}
                            </li>
                        ))}
                        <li
                            className="relative w-24"
                            onMouseEnter={() => setHoveredItemId('new')}
                            onMouseLeave={() => setHoveredItemId(null)}
                        >
                            <div className="w-6 h-6 bg-transparent cursor-pointer"></div>
                            {hoveredItemId === 'new' && (
                                <div className="absolute left-0 top-0 mt-1 bg-white shadow-lg rounded p-2">
                                    <Button variant="ghost" size="sm" onClick={() => setEditingItem({ id: '', label: '', url: '' })}>
                                        <Plus className="h-4 w-4 mr-1" /> Add New Item
                                    </Button>
                                </div>
                            )}
                        </li>
                    </ul>
                </nav>
            </div>

            {editingItem && (
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h2 className="text-lg font-semibold mb-2">{editingItem.id ? 'Edit Item' : 'Add New Item'}</h2>
                    <div className="space-y-2">
                        <Input
                            value={editingItem.label}
                            onChange={(e) => setEditingItem({...editingItem, label: e.target.value})}
                            placeholder="Menu item label"
                        />
                        <Input
                            value={editingItem.url}
                            onChange={(e) => setEditingItem({...editingItem, url: e.target.value})}
                            placeholder="Menu item URL"
                        />
                        <Button onClick={saveEdit}>
                            {editingItem.id ? 'Save Changes' : 'Add Item'}
                        </Button>
                        <Button variant="ghost" onClick={() => setEditingItem(null)}>Cancel</Button>
                    </div>
                </div>
            )}

            <div className="bg-gray-100 p-4 rounded-lg fixed bottom-0 w-full">
                <h2 className="text-lg font-semibold mb-2">Menu Items</h2>
                <div className="space-y-2">
                    {menuItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between bg-white p-2 rounded">
                            <span>{item.label} - {item.url}</span>
                            <div>
                                <Button variant="ghost" size="sm" onClick={() => startEditing(item)}>
                                    <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => removeMenuItem(item.id)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default function HomePage() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Menu Editor</h1>
            <MenuEditor />
        </div>
    );
}
