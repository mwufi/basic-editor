import { cn } from "@/lib/utils"
import { NavLink } from "./NavLink"

type NavItem = {
    href: string
    name: string
}

function Nav({ items }: { items: NavItem[] }) {
    const styles = {
        fullWhite: "bg-white border-b",
        white: "bg-gradient-to-b from-white/10 to-transparent text-white",
        black: "bg-black/10 text-white",
    }

    return (
        <nav className={cn(styles.white, "absolute top-0 w-full")}>
            <ul className="flex space-x-8 mx-auto max-w-3xl p-4">
                {items.map((item, index) =>
                    item.href.startsWith("http") ? (
                        <li key={index}>
                            <a
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium"
                            >
                                {item.name}
                            </a>
                        </li>
                    ) : (
                        <li key={index}>
                            <NavLink
                                href={item.href}
                                exact
                                className="font-medium transition-colors duration-300"
                            >
                                {item.name}
                            </NavLink>
                        </li>
                    )
                )}
            </ul>
        </nav>
    )
}

export default Nav