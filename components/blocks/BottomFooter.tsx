import { Heart } from "lucide-react"

function Footer() {
    return (
        <nav className="border-b fixed bottom-0 w-full bg-white">
            <div className="flex justify-between items-center">
                <div className="flex justify-between items-center w-full max-w-3xl mx-auto p-4">
                    <span className="text-sm text-gray-600">© 2024</span>
                    <div className="flex items-center">
                        <span className="text-sm text-gray-600 mr-1">A vnjia project</span>
                        <Heart className="h-4 w-4 text-red-500" />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Footer