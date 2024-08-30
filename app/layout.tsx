import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner'
import JotaiProvider from "@/components/providers/JotaiProvider";
import Avatar from "./Avatar";
import PageHeader from "@/components/blocks/PageHeader";
import { EditorProvider } from "@/components/editor/EditorContext";
import { cn } from "@/lib/utils";
import ComposingMenubar from "@/components/blocks/ComposingMenubar";
import ShareMenu from "@/components/ShareMenu";
import BottomFooter from "@/components/blocks/BottomFooter";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Playground V0",
  description: "make your ideas come to life",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full pt-12 md:pt-0">
      <head>
        {process.env.NODE_ENV === 'production' && (
          <script
            defer
            data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
            data-api="/plausible/api/event"
            src="/api/plausible/js/script.js"
          ></script>
        )}
      </head>
      <body className={cn(inter.className, "bg-gradient-to-b from-orange-50 to-pink-50 min-h-screen flex flex-col p-4 md:p-8")}>
        <JotaiProvider>
          <EditorProvider>
            <div className="max-w-sm fixed top-0 left-0 p-4 z-50">
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
      </body>
    </html>
  );
}