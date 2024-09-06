export default function MarketingLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
                {children}
            </main>
            <footer className="bg-gray-100 py-12">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-between items-center">
                        <div className="w-full md:w-auto mb-4 md:mb-0">
                            <a href="/" className="text-xl font-bold text-gray-800">Wordy</a>
                        </div>
                        <div className="flex flex-wrap justify-center">
                            <a href="#" className="text-gray-600 hover:text-gray-800 mx-3">Affiliates</a>
                            <a href="#" className="text-gray-600 hover:text-gray-800 mx-3">Contact</a>
                            <a href="/terms-of-service" className="text-gray-600 hover:text-gray-800 mx-3">Terms of Service</a>
                            <a href="/privacy-policy" className="text-gray-600 hover:text-gray-800 mx-3">Privacy Policy</a>
                        </div>
                        <div className="w-full md:w-auto mt-4 md:mt-0">
                            <p className="text-gray-600">Made with <span className="text-red-400 font-bold">&lt;4</span> in New York</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}