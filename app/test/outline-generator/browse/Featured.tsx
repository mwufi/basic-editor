import Link from 'next/link';
import { Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function FeaturedOutline({ outline }) {
    return (
        <Card className="h-full bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">
            <CardHeader>
                <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-900">{outline.title}</CardTitle>
                <CardDescription className="text-gray-600">
                    {outline?.description || "Explore this amazing outline!"}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-gray-600">Nodes: {outline.children?.length || 0}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Badge variant="secondary" className="bg-gradient-to-r from-gray-300 to-gray-400 text-gray-700">
                    <Star className="h-4 w-4 mr-1" /> Featured
                </Badge>
                <Link href={`/test/outline-generator/${outline.id}`} className="text-blue-500 hover:underline">
                    View
                </Link>
            </CardFooter>
        </Card>
    )
}
