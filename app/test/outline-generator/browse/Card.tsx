import Link from 'next/link';
import { Star, ThumbsUp } from "lucide-react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function NonFeaturedOutline({ outline }) {
    return (
        <Card className="border hover:shadow-md transition-shadow duration-300 group relative overflow-hidden">
            <CardHeader>
                <CardTitle>{outline.title}</CardTitle>
                <CardDescription>
                    {outline.description || "Explore this amazing outline!"}
                </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between items-center">
                <div className="flex space-x-4">
                    <button className="flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-300">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        <span className="text-sm">Like</span>
                    </button>
                    <button className="flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-300">
                        <Star className="h-4 w-4 mr-1" />
                        <span className="text-sm">Star</span>
                    </button>
                </div>
                <Link
                    href={`/test/outline-generator/${outline.id}`}
                    className="absolute right-4 bottom-4 text-blue-500 hover:text-blue-600 transition-colors duration-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                >
                    View
                </Link>
            </CardFooter>
        </Card>
    )
}