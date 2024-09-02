import { motion } from 'framer-motion';
import { Button } from './ui/button';
import Link from 'next/link';
import { Eye, Pencil } from 'lucide-react';
import SaveButton from './editor/SaveButton';
import { useAtomValue } from 'jotai';
import { noteAtom } from './editor/atoms';

export default function Buttons() {
    const note = useAtomValue(noteAtom);
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 * 0.1 }}
            className="mb-4 absolute top-4 right-4 z-10"
        >

            {note.isPublished && !note.publishedId && (
                <div className="mb-4">
                    <p className="text-red-500 font-semibold">
                        Error: Note is marked as published but has no published ID.
                    </p>
                </div>
            )}

            <div className="mb-4 flex items-center gap-2">
                {note.publishedId && (
                    <Button
                        variant="outline"
                        size="sm"
                        className="text-green-500 hover:text-green-600"
                        asChild
                    >
                        <a href={`/share/${note.publishedId}`}>
                            Published
                        </a>
                    </Button>
                )}
                <Button
                    variant="outline"
                    size="sm"
                    asChild
                >
                    <Link href={`/blog/${note.id}/edit`}>
                        <Pencil className="w-4 h-4 mr-1" />
                    </Link>
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    asChild
                >
                    <Link href={`/blog/${note.id}`}>
                        <Eye className="w-4 h-4 mr-1" />
                    </Link>
                </Button>
                <SaveButton />
            </div>
        </motion.div>
    )
}