import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"

/*
security
integrations
support
organizations
advanced
*/

export default function Dashboard() {
    return (
        <div className="grid gap-6">
            <Card x-chunk="dashboard-04-chunk-1">
                <CardHeader>
                    <CardTitle>Add Footer</CardTitle>
                    <CardDescription>
                        Choose whether to display a footer on your blog.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="flex flex-col gap-4">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="add-footer" />
                            <label
                                htmlFor="add-footer"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Display footer
                            </label>
                        </div>
                        <Input 
                            placeholder="Footer text" 
                            className="mt-2"
                        />
                    </form>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button>Save</Button>
                </CardFooter>
            </Card>
            <Card x-chunk="dashboard-04-chunk-2">
                <CardHeader>
                    <CardTitle>Blog Style</CardTitle>
                    <CardDescription>
                        Choose a style for your blog.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="grid gap-6">
                        <div className="flex items-center space-x-2">
                            <input type="radio" id="style1" name="blog-style" className="form-radio" />
                            <div>
                                <img src="https://picsum.photos/200/100?random=1" alt="Style 1" className="mb-2 rounded" />
                                <label htmlFor="style1" className="font-medium">Minimalist</label>
                                <p className="text-sm text-gray-500">Clean and simple design for a focused reading experience.</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <input type="radio" id="style2" name="blog-style" className="form-radio" />
                            <div>
                                <img src="https://picsum.photos/200/100?random=2" alt="Style 2" className="mb-2 rounded" />
                                <label htmlFor="style2" className="font-medium">Modern</label>
                                <p className="text-sm text-gray-500">Sleek and contemporary look with bold typography.</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <input type="radio" id="style3" name="blog-style" className="form-radio" />
                            <div>
                                <img src="https://picsum.photos/200/100?random=3" alt="Style 3" className="mb-2 rounded" />
                                <label htmlFor="style3" className="font-medium">Classic</label>
                                <p className="text-sm text-gray-500">Traditional blog layout with a timeless feel.</p>
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button>Save</Button>
                </CardFooter>
            </Card>
        </div>
    )
}
