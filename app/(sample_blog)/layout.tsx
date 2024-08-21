import React from "react"
import Nav from "@/components/blocks/TopNav"
const BlogLayout = ({ children }: { children: React.ReactNode }) => {

    const navItems = [
        { href: "/", name: "Home" },
        { href: "/about", name: "About" },
        { href: "/contact", name: "Contact" },
        { href: "https://github.com/instantdb", name: "InstantDB" },
    ]

    return (
        <div className="min-h-screen w-full">
            <Nav items={navItems} />
            {children}
        </div>
    )
}

export default BlogLayout
