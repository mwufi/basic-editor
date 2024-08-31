
'use client'

import Link from 'next/link'

const posts = [
    { slug: 'how-to-tame-your-dragon', title: 'How to Tame Your Dragon' },
    { slug: 'using-netlify-and-nextjs', title: 'Using Netlify and Next.js' },
    { slug: 'my-other-blog', title: 'My Other Blog' }
]

export default function BlogList() {
    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
            <ul className="space-y-4">
                {posts.map((post) => (
                    <li key={post.slug} className="border-b pb-4">
                        <Link href={`/test/static-generation/${post.slug}`} className="text-blue-600 hover:underline">
                            <h2 className="text-xl font-semibold">{post.title}</h2>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
