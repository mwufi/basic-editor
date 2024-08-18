import Image from 'next/image';
import { Globe, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ProfilePage: React.FC = async () => {
    return (
        <div className="max-w-4xl mx-auto p-8">
            <div className="flex flex-col items-center mb-8">
                <Image
                    src="/icon.webp"
                    alt="Profile Avatar"
                    width={200}
                    height={200}
                    className="rounded-full mb-4"
                />
                <h1 className="text-3xl font-bold mb-2">Solt Wagner</h1>
                <h2 className="text-xl text-gray-600 mb-4">Developer & Designer</h2>

                <div className="flex space-x-4 mb-4">
                    <a href="#" className="rounded-full p-2 bg-gray-200 hover:bg-gray-300">
                    </a>
                    <a href="#" className="rounded-full p-2 bg-gray-200 hover:bg-gray-300">
                    </a>
                    <a href="#" className="rounded-full p-2 bg-gray-200 hover:bg-gray-300">
                    </a>
                </div>

                <div className="flex space-x-4">
                    <a href="#" className="flex items-center text-blue-600 hover:underline">
                        <Globe size={16} className="mr-1" /> Website
                    </a>
                    <a href="#" className="flex items-center text-blue-600 hover:underline">
                        <Mail size={16} className="mr-1" /> Email
                    </a>
                </div>
            </div>

            <div className="bg-white rounded-xl border p-6 mb-8">
                <h3 className="text-2xl font-semibold mb-4">About Me</h3>
                <p>
                    Hey, I am Solt Wagner. I'm passionate about creating beautiful and functional digital experiences.
                    With a background in both development and design, I strive to bridge the gap between aesthetics and functionality.
                    My goal is to craft intuitive interfaces that not only look great but also provide seamless user experiences.
                </p>
            </div>

            <div className="bg-white rounded-xl border p-6 mb-8">
                <h3 className="text-2xl font-semibold mb-4">Featured Products</h3>
                <div className="flex mb-6">
                    <Image src="https://picsum.photos/150/150" alt="Minimal Dark Pack" width={150} height={150} className="rounded-lg mr-4" />
                    <div>
                        <h4 className="text-xl font-semibold mb-2">Minimal Dark Pack</h4>
                        <p className="mb-2">A sleek and modern design pack for your next project.</p>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">$49.99</span>
                    </div>
                </div>
                <div className="flex">
                    <Image src="https://picsum.photos/150/150" alt="Random Image" width={150} height={150} className="rounded-lg mr-4" />
                    <div>
                        <h4 className="text-xl font-semibold mb-2">Ultralink Bio Website Template</h4>
                        <p className="mb-2">Create a stunning bio website with this easy-to-use template.</p>
                        <Button>Get it now for free</Button>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border p-6 mb-8">
                <h3 className="text-2xl font-semibold mb-4">Blog Posts</h3>
            </div>

            <div className="bg-white rounded-xl border p-6 mb-8">
                <h3 className="text-2xl font-semibold mb-4">More Links</h3>
                <div className="flex items-center mb-4">
                    <Image src="https://picsum.photos/150/150" alt="Link" width={50} height={50} className="rounded-lg mr-4" />
                    <div>
                        <h4 className="text-lg font-semibold">Resource Title</h4>
                        <p className="text-gray-600">Brief description of the resource</p>
                    </div>
                </div>
                {/* Add more links as needed */}
            </div>

            <footer className="text-center text-gray-500 mt-8">
                <p>&copy; 2023 Solt Wagner. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default ProfilePage;
