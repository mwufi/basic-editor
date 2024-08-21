import React from "react"
import { NavLink } from "@/components/blocks/NavLink"

type NavItem = {
    href: string
    name: string
}

function Nav({ items }: { items: NavItem[] }) {
    return (
        <nav className="border-b">
            <ul className="flex space-x-8 mx-auto max-w-3xl p-4">
                {items.map((item, index) =>
                    item.href.startsWith("http") ? (
                        <li key={index}>
                            <a
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 font-medium"
                            >
                                {item.name}
                            </a>
                        </li>
                    ) : (
                        <li key={index}>
                            <NavLink
                                href={item.href}
                                exact
                                className="text-gray-600 font-medium transition-colors duration-300"
                            >
                                {item.name}
                            </NavLink>
                        </li>
                    )
                )}
            </ul>
        </nav>
    )
}

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
