import { Button } from "@/components/ui/button"
import Link from 'next/link'

const NotePublishInfo = ({ note }) => {
    return (
        <>
            {note.publishedId ? (
                <Button
                    variant="outline"
                    size="sm"
                    className="text-green-500 hover:text-green-600 mb-4"
                    asChild
                >
                    <Link href={`/share/${note.publishedId}`}>
                        View Published
                    </Link>
                </Button>
            ) : note.isPublished ? (
                <div className="mb-4">
                    <p className="text-red-500 font-semibold">
                        Error: Note is marked as published but has no published ID.
                    </p>
                </div>
            ) : null}
        </>
    )
}

export default NotePublishInfo