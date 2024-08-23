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
                    <CardTitle>Blog Name</CardTitle>
                    <CardDescription>
                        Used to identify your website.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <Input placeholder="Blog Name" />
                    </form>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button>Save</Button>
                </CardFooter>
            </Card>
            <Card x-chunk="dashboard-04-chunk-2">
                <CardHeader>
                    <CardTitle>Blog Posts</CardTitle>
                    <CardDescription>
                        The directory within your project, in which your notes are
                        located.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="flex flex-col gap-4">
                        <Input
                            placeholder="Project Name"
                            defaultValue="/blog"
                        />
                        <div className="flex items-center space-x-2">
                            <Checkbox id="include" defaultChecked />
                            <label
                                htmlFor="include"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >

                                By default, publish new notes here.
                            </label>
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
