'use client'

import { Heart } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

function Footer() {
    return (
        <nav className="border-t fixed bottom-0 w-full bg-white">
            <div className="max-w-3xl mx-auto p-2 flex justify-between items-center text-sm">
                <span className="text-gray-600">© 2024</span>
                <div className="flex items-center space-x-3">
                    <Link href="/share/67f362d2-c03e-4c99-8c6d-c291e41224ed" className="hover:underline">About</Link>
                    <Link href="/share/67f362d2-c03e-4c99-8c6d-c291e41224ed" className="hover:underline">Privacy</Link>
                    <div className="flex items-center">
                        <Link href="/" className="hover:underline">
                            <motion.div
                                whileHover={{ scale: 1.2 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <Heart className="h-4 w-4 text-red-500 ml-1" />
                            </motion.div>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Footer