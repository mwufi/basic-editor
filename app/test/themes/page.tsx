'use client'

import Component from "./Component";
import { ThemeProvider } from "./themeContext";

export default function Page() {
    return <ThemeProvider>
        <div className="max-w-3xl mx-auto p-4">
            <Component />
        </div>
    </ThemeProvider>
}