export default function NoteHeader({ title, createdAt, author }: { title: string, createdAt: string, author: string | null }) {
    return (
        <header className="mb-12 mt-20">
            <h1 className="text-5xl font-bold mb-4 title">{title}</h1>
            <div className="flex items-center text-gray-600 mb-2">
                {author && <p className="mr-4">By {author}</p>}
                <p>{new Date(createdAt).toLocaleDateString()}</p>
            </div>
        </header>
    )
}