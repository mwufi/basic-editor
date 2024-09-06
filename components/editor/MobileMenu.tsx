'use client'

import Link from 'next/link'
import { Home, PlusCircle, Settings } from 'lucide-react'

const MobileMenu = () => {
    return (
        <nav className="sticky bottom-0 z-50 bg-white border-t border-gray-200 py-2 px-4 flex justify-around items-center md:hidden">
            <Link href="/app" className="flex flex-col items-center">
                <Home size={24} />
                <span className="text-xs mt-1">Home</span>
            </Link>
            <Link href="/create" className="flex flex-col items-center">
                <PlusCircle size={24} />
                <span className="text-xs mt-1">New</span>
            </Link>
            <Link href="/settings" className="flex flex-col items-center">
                <Settings size={24} />
                <span className="text-xs mt-1">Settings</span>
            </Link>
        </nav>
    )
}

export default MobileMenu
