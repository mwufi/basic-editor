'use client'

import { useEffect, useState } from 'react';
import { saveThemeContent, themeContentAtom } from '../editor/atoms';
import { useAtom, useSetAtom } from 'jotai';
import { hexToRgb, rgbToHsl } from '@/lib/utils';

import FontPicker from 'react-fontpicker-ts-lite'
import 'react-fontpicker-ts-lite/dist/index.css'

const parseThemeContent = (css) => {
    const colors = {};
    const fontFamily = {};
    const regex = /--(.*?):\s*(.*?);/g;
    let match;
    while ((match = regex.exec(css)) !== null) {
        const [key, value] = [match[1], match[2]];
        if (key.startsWith('font-header')) {
            fontFamily['heading'] = value;
        } else if (key.startsWith('font-body')) {
            fontFamily['body'] = value;
        } else {
            colors[key] = value;
        }
    }
    return { colors, fontFamily };
};

const ThemeEditor = () => {
    const [themeContent, setThemeContent] = useAtom(themeContentAtom);

    const [fontFamily, setFontFamily] = useState({});
    const [colors, setColors] = useState({});

    useEffect(() => {
        const themeContent = localStorage.getItem('themeContent');
        if (themeContent) {
            const parsedTheme = parseThemeContent(themeContent);
            setFontFamily(parsedTheme.fontFamily);
            setColors(parsedTheme.colors);
        }
    }, []);

    const colorsAsCSSString = Object.entries(colors).map(([key, value]) => `--${key}: ${value};`).join('\n');
    const handleChange = (e) => {
        const { name, value } = e.target;

        const updateHslValue = (name, value) => {
            const [r, g, b] = hexToRgb(value);
            const [h, s, l] = rgbToHsl(r, g, b);
            console.log(`HSL for ${name}: h=${h}, s=${s}%, l=${l}%`);
            return `hsl(${h}, ${s}%, ${l}%)`;
        };

        const hslValue = updateHslValue(name, value);
        setColors((prevColors) => ({
            ...prevColors,
            [name]: hslValue,
        }));
        const fontBodyAsCSSString = `--font-body: ${fontFamily?.body};`;
        const fontHeadingAsCSSString = `--font-heading: ${fontFamily?.heading};`;
        setThemeContent(`:root{${colorsAsCSSString}\n${fontBodyAsCSSString}\n${fontHeadingAsCSSString}}`);

        // directly write to local storage!!
        saveThemeContent(`:root{${colorsAsCSSString}\n${fontBodyAsCSSString}\n${fontHeadingAsCSSString}}`);
    }

    const updateFontFamily = (newValue, type) => {
        setFontFamily((prev) => ({ ...prev, [type]: newValue }));
        let fontBodyAsCSSString = `--font-body: ${fontFamily?.body};`;
        let fontHeadingAsCSSString = `--font-heading: ${fontFamily?.heading};`;
        if (type === 'body') {
            fontBodyAsCSSString = `--font-body: ${newValue};`;
        } else {
            fontHeadingAsCSSString = `--font-heading: ${newValue};`;
        }
        const updatedThemeContent = `:root{${colorsAsCSSString}\n${fontBodyAsCSSString}\n${fontHeadingAsCSSString}}`;
        setThemeContent(updatedThemeContent);
        saveThemeContent(updatedThemeContent);
    }

    return (
        <div className="theme-editor">
            <div className="mb-4">
                <h2 className="text-2xl font-semibold mb-4">Font</h2>
                <FontPicker autoLoad value={(font) => updateFontFamily(font, 'body')} />
                <p className="text-lg font-body">{JSON.stringify(fontFamily?.body, null, 2)}</p>
            </div>
            <div className="mb-4">
                <h2 className="text-2xl font-semibold mb-4">Heading Font</h2>
                <FontPicker autoLoad value={(font) => updateFontFamily(font, 'heading')} />
                <p className="text-lg font-body">{JSON.stringify(fontFamily?.heading, null, 2)}</p>
            </div>
            <div className="mb-4">
                <h2 className="text-2xl font-semibold mb-4">Colors</h2>
                <div className="flex">
                    <div className="shrink-0 flex flex-col gap-2">
                        {Object.entries(colors).map(([key, value]) => (
                            <div key={key} className="color-input flex items-center">
                                <label htmlFor={key} className="mr-2">{key}</label>
                                <div
                                    style={{ backgroundColor: value }}
                                    className="w-6 h-6 rounded-full border cursor-pointer"
                                    onClick={() => document.getElementById(key)?.click()}
                                />
                                <input
                                    type="color"
                                    id={key}
                                    name={key}
                                    value={value}
                                    onChange={handleChange}
                                    className="hidden absolute top-0 left-0"
                                />
                            </div>
                        ))}
                    </div>
                    <pre className="text-sm max-w-1/2">{JSON.stringify(parseThemeContent(themeContent), null, 2)}</pre>
                </div>
            </div>
        </div>
    );
};

export default ThemeEditor;
