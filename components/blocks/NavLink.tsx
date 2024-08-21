'use client'

/*
 
NavLink: by default the active class is added when the href matches the start of the URL pathname.
Use the exact property to change it to an exact match with the whole URL pathname.
 
*/
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export const NavLink = ({ href, exact, children, className, ...props }) => {
    const pathname = usePathname()
    const isActive = exact ? pathname === href : pathname.startsWith(href)

    const combinedClassName = cn(
        className,
        isActive && 'font-bold text-green-500'
    )

    return (
        <Link href={href} className={combinedClassName} {...props}>
            {children}
        </Link>
    )
}