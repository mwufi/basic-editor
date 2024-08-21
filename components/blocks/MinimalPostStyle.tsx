import React from "react"
import { NavLink } from "./NavLink"

type Post = {
    title: string
    date: string
    description: string
}

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

function MobileFriendlyContainer({ children }: { children: React.ReactNode }) {
    return (
        <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-8">
            {children}
        </main>
    )
}

function BlogPost({ title, date, description }: Post) {
    return (
        <a href={`/blog/${title.toLowerCase().replace(/\s+/g, '-')}`}>
            <div className="px-4 py-2 transition-bg duration-500 hover:bg-green-50">
                <div className="mb-1 inline-flex items-baseline gap-3">
                    <h3 className="font-mono font-bold">
                        {title}
                    </h3>
                    <span className="font-mono text-zinc-400">
                        {date}
                    </span>
                </div>
                <p className="font-mono font-normal text-zinc-500 dark:text-zinc-400">
                    {description}
                </p>
            </div>
        </a>
    )
}

function BlogPostList({ posts }: { posts: Post[] }) {
    return (
        <div className="flex flex-col gap-4">
            {posts.map((post, index) => (
                <BlogPost key={index} {...post} />
            ))}
        </div>
    )
}

const PersonalBlogPage = () => {
    const postGroups = [
        {
            tag: '2024', posts: [
                {
                    title: "On finishing things",
                    date: "August 1",
                    description: "Why is it so difficult?",
                },
                {
                    title: "Ceramics with InstantDB",
                    date: "July 1",
                    description: "How I ended up using a graph database",
                },
                {
                    title: "Hello world",
                    date: "April 7",
                    description: 'Working "in public"',
                }]
        },
        {
            tag: '2023', posts: [
                {
                    title: "The Art of Code Refactoring",
                    date: "June 15",
                    description: "Improving code quality without changing functionality",
                },
                {
                    title: "Exploring Rust for Web Development",
                    date: "May 20",
                    description: "Can Rust compete with JavaScript frameworks?",
                },
                {
                    title: "Machine Learning in Production",
                    date: "March 10",
                    description: "Challenges and best practices for deploying ML models",
                }
            ]
        }
    ]

    const navItems = [
        { href: "/", name: "Home" },
        { href: "/about", name: "About" },
        { href: "/contact", name: "Contact" },
        { href: "https://github.com/instantdb", name: "InstantDB" },
    ]

    return (
        <div className="min-h-screen w-full">
            <Nav items={navItems} />
            <MobileFriendlyContainer>

                <section className="mb-16">
                    <h1 className="mt-16 text-4xl font-black text-zinc-900 dark:text-zinc-100">
                        writing
                    </h1>
                    <div className="mb-8 mt-6 space-y-8">
                        {postGroups.map((group, index) => (
                            <>
                                <div className="mb-3 font-mono text-xs font-medium tracking-wide text-zinc-400">
                                    {group.tag}
                                </div>
                                <BlogPostList posts={group.posts} />
                            </>
                        ))}
                    </div>
                </section>
            </MobileFriendlyContainer>
        </div>
    )
}

export default PersonalBlogPage
