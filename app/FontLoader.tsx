'use client'

import { useEffect, useState } from 'react';
import FontPicker from 'react-fontpicker-ts-lite';

const parseThemeContent = (css) => {
    const fonts = {};
    const regex = /--(.*?):\s*(.*?);/g;
    let match;
    while ((match = regex.exec(css)) !== null) {
        fonts[match[1]] = match[2];
    }
    return fonts;
};

export const FontLoader = () => {
    const [fontsToLoad, setFontsToLoad] = useState<string | string[] | undefined>(undefined)

    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === 'themeContent' && event.newValue) {
                const themeContent = parseThemeContent(event.newValue);
                const bodyFont = themeContent['font-body'];
                const headingFont = themeContent['font-heading'];
                if (bodyFont || headingFont) {
                    const loadedFonts = [bodyFont, headingFont].filter(Boolean);
                    console.log("Loaded fonts:", loadedFonts);
                    setFontsToLoad(loadedFonts);
                }
            }
        };

        const themeContent = localStorage.getItem('themeContent');
        if (themeContent) {
            const parsedFonts = parseThemeContent(themeContent);
            const bodyFont = parsedFonts['font-body'];
            const headingFont = parsedFonts['font-heading'];
            const loadedFonts = [bodyFont, headingFont].filter(Boolean);
            console.log("Loaded fonts from localStorage:", loadedFonts);
            setFontsToLoad(loadedFonts);
        }

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return <div style={{ width: 0, height: 0, overflow: 'hidden' }}>
        <FontPicker loadFonts={fontsToLoad} />
    </div>
}