import Link from 'next/link'
import { notFound } from 'next/navigation'

interface Post {
    id: string
    title: string
    content: string
}

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 3600 // invalidate every hour

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true

export async function generateStaticParams() {
    // let's pretend to only generate two posts
    const slugs = [
        'how-to-tame-your-dragon',
        'using-netlify-and-nextjs',
    ]

    return slugs.map((slug) => ({
        slug: slug,
    }))
}

export default function Page({ params }: { params: { slug: string } }) {
    const validSlugs = [
        'how-to-tame-your-dragon',
        'using-netlify-and-nextjs',
        'my-other-blog'
    ]

    if (!validSlugs.includes(params.slug)) {
        notFound()
    }
    return (
        <div className="max-w-2xl mx-auto">
            <Link href="/test/static-generation" className="inline-block mb-4 text-blue-600 hover:underline">
                ← Back to Blog List
            </Link>
            <h1 className="text-3xl font-bold mb-6">{params.slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</h1>
            <div className="prose">
                <p>This is the content for the blog post about {params.slug.split('-').join(' ')}.</p>
                <p>Add more detailed content here...</p>
            </div>
        </div>
    )
}
