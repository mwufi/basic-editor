import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, Search, FileText } from "lucide-react";
import Link from "next/link";
import Avatar from "@/app/Avatar";
import NavigationMenuDemo from "./NavigationMenu";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import Username from "./Username";

export default function PageHeader() {
    return (
        <header className="z-20 sticky top-0 flex h-16 items-center gap-4 bg-transparent px-4 md:px-6">
            <div className="hidden md:block">
                <NavigationMenuDemo />
            </div>
            <Drawer>
                <DrawerTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden"
                    >
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle><Username /></DrawerTitle>
                        <DrawerDescription>Top Secret</DrawerDescription>
                    </DrawerHeader>
                    <nav className="grid gap-6 text-lg font-medium p-4">
                        <DrawerClose asChild>
                            <Link
                                href="/app"
                                className="flex items-center gap-2 text-lg font-semibold"
                            >
                                <FileText className="h-6 w-6" />
                            </Link>
                        </DrawerClose>
                        <DrawerClose asChild>
                            <Link
                                href="/app"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Dashboard
                            </Link>
                        </DrawerClose>
                        <DrawerClose asChild>
                            <Link href="/settings" className="hover:text-foreground">
                                Settings
                            </Link>
                        </DrawerClose>
                    </nav>
                    <DrawerFooter>
                        <DrawerClose asChild>
                            <Button variant="outline">Close</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
            <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                <form className="ml-auto flex-1 sm:flex-initial hidden md:block">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search notes..."
                            className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                        />
                    </div>
                </form>
                <Avatar />
            </div>
        </header>
    )
}