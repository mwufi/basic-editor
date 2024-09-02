import { EditorProvider } from "@/components/editor/EditorContext";
import ShareMenu from "@/components/ShareMenu";
import SettingsButton from '@/components/editor/SettingsButton';
import TopBar from '@/components/editor/TopBar';

export default function EditorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <EditorProvider>
      <TopBar />
      <main className="flex-grow min-h-full px-3 relative w-full">
        {children}
        <div className="fixed right-6 bottom-20 md:bottom-6 md:right-6 z-10 md:w-fit">
          <SettingsButton />
        </div>
      </main>
      <ShareMenu />
    </EditorProvider>
  );
}