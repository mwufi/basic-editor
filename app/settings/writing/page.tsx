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
                    <CardTitle>Theme</CardTitle>
                    <CardDescription>
                        Choose the theme for your writing interface.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="flex flex-col gap-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <input type="radio" id="light-mode" name="theme" className="form-radio" />
                                <label htmlFor="light-mode" className="text-sm font-medium">Light Mode</label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <input type="radio" id="dark-mode" name="theme" className="form-radio" />
                                <label htmlFor="dark-mode" className="text-sm font-medium">Dark Mode</label>
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button>Save</Button>
                </CardFooter>
            </Card>
            <Card x-chunk="dashboard-04-chunk-2">
                <CardHeader>
                    <CardTitle>Editor Settings</CardTitle>
                    <CardDescription>
                        Customize your writing experience.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="flex flex-col gap-4">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="show-toolbar" />
                            <label
                                htmlFor="show-toolbar"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Show toolbar
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
