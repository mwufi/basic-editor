'use client'

import { useState } from 'react';
import { useTheme } from './themeContext';
import { predefinedThemes } from './themes';
import { themeContentAtom } from '@/components/editor/atoms';
import { useAtom } from 'jotai';

const YourComponent = () => {
    const { changeTheme, loadCustomStylesheet } = useTheme();
    const [customUrl, setCustomUrl] = useState('');
    const [themeContent, setThemeContent] = useAtom(themeContentAtom);
    console.log('themeContent', themeContent);

    const handleCustomTheme = (e) => {
        e.preventDefault();
        if (customUrl) {
            loadCustomStylesheet(customUrl);
        }
    };

    const handleCustomCSS = (e) => {
        e.preventDefault();
        setThemeContent(e.target.value);
    };

    return (
        <div className="space-y-4">
            <select
                onChange={(e) => changeTheme(e.target.value)}
                className="border rounded-md p-2"
            >
                {Object.keys(predefinedThemes).map((themeName) => (
                    <option key={themeName} value={themeName}>
                        {predefinedThemes[themeName].name}
                    </option>
                ))}
            </select>

            <form onSubmit={handleCustomTheme} className="flex flex-col space-y-2">
                <input
                    type="url"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    placeholder="Enter custom stylesheet URL"
                    className="border rounded-md p-2"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600"
                >
                    Load Custom Theme
                </button>
            </form>
            <form onSubmit={handleCustomCSS} className="flex flex-col space-y-2">
                <textarea
                    value={themeContent}
                    onChange={(e) => {
                        handleCustomCSS(e);
                    }}
                    placeholder="Enter custom CSS"
                    className="border rounded-md p-2 resize-none overflow-hidden"
                    style={{ height: 'auto' }}
                    rows={themeContent.split('\n').length}
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600"
                >
                    Apply Custom CSS
                </button>
            </form>
        </div>
    );
};

export default YourComponent;