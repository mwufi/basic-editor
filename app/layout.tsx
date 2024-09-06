import MobileMenu from "@/components/editor/MobileMenu";
import "./globals.css";
import 'react-fontpicker-ts-lite/dist/index.css'

import { Metadata } from "next";
import JotaiProvider from "@/components/providers/JotaiProvider";
import { ThemeProvider } from "./test/themes/themeContext";
import { FontLoader } from "./FontLoader";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Home - ",
  description: "make your ideas come to life",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
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
      <JotaiProvider>
        <ThemeProvider>
          <body className="min-h-full max-w-full overflow-x-hidden flex flex-col">
            <Toaster richColors position="top-center" expand={true} />
            {children}
            <MobileMenu />
            <FontLoader />
          </body>
        </ThemeProvider>
      </JotaiProvider>
    </html>
  );
}