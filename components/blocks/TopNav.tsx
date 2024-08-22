import { cn } from "@/lib/utils"
import { NavLink } from "./NavLink"

type NavItem = {
    href: string
    name: string
}
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu"

function Nav({ items }: { items: NavItem[] }) {
    return (
        <NavigationMenu className="py-4">
            <NavigationMenuList>
                {items.map((item, index) => (
                    <NavigationMenuItem key={index}>
                        {item.href.startsWith("http") ? (
                            <NavigationMenuLink
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-4"
                            >
                                {item.name}
                            </NavigationMenuLink>
                        ) : (
                            <NavLink
                                href={item.href}
                                exact
                                className="font-medium p-4"
                            >
                                {item.name}
                            </NavLink>
                        )}
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    )
}

export default Nav