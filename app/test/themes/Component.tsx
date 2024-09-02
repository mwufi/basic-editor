'use client'

import { useState } from 'react';
import { useTheme } from './themeContext';
import { predefinedThemes } from './themes';
import { saveThemeContent, themeContentAtom } from '@/components/editor/atoms';
import { useAtom } from 'jotai';

const YourComponent = () => {
    const { changeTheme } = useTheme();
    const [themeContent, setThemeContent] = useAtom(themeContentAtom);

    const handleCustomCSS = (e) => {
        e.preventDefault();
        setThemeContent(e.target.value);
        saveThemeContent(e.target.value);
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

            <form onSubmit={e => saveThemeContent(themeContent)} className="flex flex-col space-y-2">
                <button
                    type="submit"
                    className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600"
                >
                    Apply Custom CSS
                </button>
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
            </form>
        </div>
    );
};

export default YourComponent;