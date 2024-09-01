import { Toaster } from 'sonner'
import JotaiProvider from "@/components/providers/JotaiProvider";
import Avatar from "../Avatar";
import { EditorProvider } from "@/components/editor/EditorContext";
import ShareMenu from "@/components/ShareMenu";
import MobileMenu from "@/components/editor/MobileMenu";
import SettingsButton from '@/components/editor/SettingsButton';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function EditorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <JotaiProvider>
      <EditorProvider>
        <div className="p-4 flex justify-between border-b">
          <Link href="/" className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md p-2 px-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
          <Avatar />
        </div>
        <main className="flex-grow min-h-full p-3 relative w-full">
          <Toaster richColors position="top-center" expand={true} />
          {children}
          <div className="fixed right-6 bottom-20 md:bottom-6 md:right-6 z-10 md:w-fit">
            <SettingsButton />
          </div>
        </main>
        <ShareMenu />
      </EditorProvider>
    </JotaiProvider>
  );
}