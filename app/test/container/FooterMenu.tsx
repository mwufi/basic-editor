'use client'

import Link from 'next/link'

const FooterMenu = () => {
    return (
        <footer className="container mx-auto px-12 py-6">
            <div className="flex flex-col md:flex-row justify-between">
                <div className="mb-6 md:mb-0">
                    <ul className="flex flex-wrap gap-4">
                        <li><Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link></li>
                        <li><Link href="/book-a-call" className="text-gray-600 hover:text-gray-900">Book a call</Link></li>
                        <li><Link href="/follow" className="text-gray-600 hover:text-gray-900">Follow</Link></li>
                        <li><Link href="/who-and-why" className="text-gray-600 hover:text-gray-900">Who and why</Link></li>
                        <li><Link href="/privacy-policy" className="text-gray-600 hover:text-gray-900">Privacy Policy</Link></li>
                        <li><Link href="/terms-of-service" className="text-gray-600 hover:text-gray-900">Terms of Service</Link></li>
                        <li><Link href="/refund-policy" className="text-gray-600 hover:text-gray-900">Refund Policy</Link></li>
                    </ul>
                </div>
                <div className="mt-6 md:mt-0">
                    <p className="text-gray-600">© 2024 blocks.md | All rights reserved</p>
                </div>
            </div>
        </footer>
    )
}

export default FooterMenu
