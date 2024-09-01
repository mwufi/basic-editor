'use client'

import { useState } from 'react';
import { useTheme } from './themeContext';
import { predefinedThemes } from './themes';
import { MarkdownPreview } from '@/components/MarkdownPreview';

const longerText = `
over the past five years, me + the team have poured our hearts into this thing. 

we&ve created some of the coolest things i&ve ever seen that have touched the lives of millions of people – from the four houses, to our wacky live streams, to our physical campus in sf.

all with the purpose of helping people build their own ideas.

and, this includes the two years at zipschool where we got to do something similar...but for kids.

it&s been a long journey for me.

i love this company. i can&t say that enough.

and look -- i am really happy and proud of all of it.

buildspace is literally like the realization of the dreams i had when i was 13. at this point my passion for the work isn&t gone, but, more...content. in a weird way, buildspace feels "done" to me.

the fire to push isn&t there. and i&m not enjoying the work as i once did.
on top of that, i don&t have a clear new direction, or vision that would take this company to the next level that would reignite that passion within me.

tldr: (and it&s embarrassing to say) at this point i&m out of ideas to try that i can really put my all behind to take us further. all the paths i wanted to explore, i did. and i don't have a clear idea on the next path to go down. the desire to push like hell isn't burning as it once did.

but hey, those of you who know me know i wouldn&t walk away if a couple months are hard.
`

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
                style={{
                    color: currentTheme.colors?.primary,
                    backgroundColor: currentTheme.colors?.background,
                    fontSize: currentTheme.fontSize || 'inherit',
                }}
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
                <MarkdownPreview
                    content={longerText}
                />
            </div>
        </div>
    );
};

export default YourComponent;