import { useState } from 'react';
import { themeContentAtom } from '../editor/atoms';
import { useSetAtom } from 'jotai';

const ThemeEditor = () => {
    const setThemeContent = useSetAtom(themeContentAtom);
    const initialColors = {
        background: 'hsl(0, 0%, 100%)',
        foreground: 'hsl(240, 10%, 3.9%)',
        card: 'hsl(0, 0%, 100%)',
        'card-foreground': 'hsl(240, 10%, 3.9%)',
        popover: 'hsl(0, 0%, 100%)',
        'popover-foreground': 'hsl(240, 10%, 3.9%)',
        primary: 'hsl(240, 5.9%, 10%)',
        'primary-foreground': 'hsl(0, 0%, 98%)',
        secondary: 'hsl(240, 4.8%, 95.9%)',
        'secondary-foreground': 'hsl(240, 5.9%, 10%)',
        muted: 'hsl(240, 4.8%, 95.9%)',
        'muted-foreground': 'hsl(240, 3.8%, 46.1%)',
        accent: 'hsl(240, 4.8%, 95.9%)',
        'accent-foreground': 'hsl(240, 5.9%, 10%)',
        destructive: 'hsl(0, 84.2%, 60.2%)',
        'destructive-foreground': 'hsl(0, 0%, 98%)',
        border: 'hsl(240, 5.9%, 90%)',
        input: 'hsl(240, 5.9%, 90%)',
        ring: 'hsl(240, 10%, 3.9%)',
        radius: '0.5rem',
    };

    const [colors, setColors] = useState(initialColors);

    const colorsAsCSSString = Object.entries(colors).map(([key, value]) => `--${key}: ${value};`).join('\n');
    const handleChange = (e) => {
        const { name, value } = e.target;
        setColors((prevColors) => ({
            ...prevColors,
            [name]: value,
        }));
        setThemeContent(`:root{${colorsAsCSSString}}`);
    };

    return (
        <div className="theme-editor">
            <h2>Edit Theme Colors</h2>
            <div className="flex">
                <div>
                    {Object.entries(colors).map(([key, value]) => (
                        <div key={key} className="color-input">
                            <label htmlFor={key}>{key}</label>
                            <input
                                type="color"
                                id={key}
                                name={key}
                                value={value}
                                onChange={handleChange}
                                className="border p-1"
                            />
                        </div>
                    ))}
                </div>
                <pre>{colorsAsCSSString}</pre>
            </div>
        </div>
    );
};

export default ThemeEditor;
