'use client'

import { useEffect, useState } from 'react';
import FontPicker from 'react-fontpicker-ts-lite';

const parseThemeContent = (css) => {
    const colors = {};
    const regex = /--(.*?):\s*(.*?);/g;
    let match;
    while ((match = regex.exec(css)) !== null) {
        colors[match[1]] = match[2];
    }
    return colors;
};

export const FontLoader = () => {
    const [fontToLoad, setFontToLoad] = useState<string | string[] | undefined>(undefined)

    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === 'themeContent' && event.newValue) {
                const themeContent = parseThemeContent(event.newValue);
                if ('font-family' in themeContent) {
                    console.log("themeContent.fontFamily", themeContent['font-family'])
                    setFontToLoad(themeContent['font-family']);
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return <FontPicker loadFonts={fontToLoad} />
}