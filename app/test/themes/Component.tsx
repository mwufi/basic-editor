'use client'

import { useState } from 'react';
import { useTheme } from './themeContext';
import { predefinedThemes } from './themes';

const YourComponent = () => {
    const { currentTheme, changeTheme, loadCustomStylesheet } = useTheme();
    const [customUrl, setCustomUrl] = useState('');

    const handleCustomTheme = (e) => {
        e.preventDefault();
        if (customUrl) {
            loadCustomStylesheet(customUrl);
        }
    };

    return (
        <div>
            <select onChange={(e) => changeTheme(e.target.value)}>
                {Object.keys(predefinedThemes).map((themeName) => (
                    <option key={themeName} value={themeName}>
                        {predefinedThemes[themeName].name}
                    </option>
                ))}
            </select>

            <form onSubmit={handleCustomTheme}>
                <input
                    type="url"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    placeholder="Enter custom stylesheet URL"
                />
                <button type="submit">Load Custom Theme</button>
            </form>

            <div
                className={`${currentTheme.font.className} moof h-full p-6 pb-10 min-h-[400px] focus:outline-none`}
                style={
                    currentTheme.colors
                        ? {
                            color: currentTheme.colors.primary,
                            backgroundColor: currentTheme.colors.background,
                        }
                        : {}
                }
            >
                <h1 className="text-3xl font-bold mb-4">Welcome to Our Themed Page</h1>
                <p className="mb-4">This text is styled according to the current theme. You can see how different fonts and colors affect the appearance of the content.</p>
                <div className="flex flex-col space-y-2">
                    <button className="px-4 py-2 rounded border border-current hover:opacity-80">
                        Themed Button
                    </button>
                    <a href="#" className="underline hover:opacity-80">Themed Link</a>
                </div>
                <blockquote className="border-l-4 pl-4 italic my-4">
                    "This blockquote demonstrates how quotes might look in the current theme."
                </blockquote>
                <ul className="list-disc list-inside mb-4">
                    <li>Themed list item 1</li>
                    <li>Themed list item 2</li>
                    <li>Themed list item 3</li>
                </ul>
            </div>
        </div>
    );
};

export default YourComponent;