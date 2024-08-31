import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Toaster } from 'sonner'
import JotaiProvider from "@/components/providers/JotaiProvider";
import Avatar from "../Avatar";
import PageHeader from "@/components/blocks/PageHeader";
import { EditorProvider } from "@/components/editor/EditorContext";
import { cn } from "@/lib/utils";
import ComposingMenubar from "@/components/blocks/ComposingMenubar";
import ShareMenu from "@/components/ShareMenu";
import BottomFooter from "@/components/blocks/BottomFooter";

const inter = Inter({ subsets: ["latin"] });

export default function EditorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <JotaiProvider>
      <EditorProvider>
        <div className="hidden md:block max-w-sm fixed top-0 left-0 p-4 z-50">
          <ComposingMenubar />
        </div>
        <div className="fixed top-0 right-0 p-4 z-50">
          <Avatar />
        </div>
        <main className="flex-grow">
          <Toaster richColors position="top-center" expand={true} />
          {children}
        </main>
        <ShareMenu />
        <BottomFooter />
      </EditorProvider>
    </JotaiProvider>
  );
}