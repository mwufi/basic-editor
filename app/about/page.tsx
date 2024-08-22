'use client'

import BackgroundImageHeader from "@/components/blocks/BackgroundImageHeader";
import TopNav from "@/components/blocks/TopNav";
import ReadOnlyEditor from "@/components/editor/ReadOnlyEditor";
import { AboutText } from "@/components/WelcomeText";

export default function About() {
    return (
        <div>
            <BackgroundImageHeader height="h-96">
                <div className="flex flex-col justify-end h-full pb-12 px-4 max-w-3xl mx-auto">
                    <h1 className="text-6xl font-bold text-white leading-tight mb-4 max-w-3xl">
                        About
                    </h1>
                </div>
            </BackgroundImageHeader>
            <div className="max-w-3xl mx-auto p-4">
                <TopNav items={[
                    { href: "/", name: "Home" },
                    { href: "/about", name: "About" },
                    { href: "/new", name: "New Post" },
                ]} />
                <div className="mt-12">
                    <ReadOnlyEditor content={AboutText} font="serif" />
                </div>
            </div>
        </div>
    )
}