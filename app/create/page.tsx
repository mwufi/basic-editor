'use client'

import Tiptap from "@/components/TipTap";
import TopBar from "@/components/TopBar";

export default function Home() {
  return (
    <>
      {/* <CommandPalette /> */}
      <TopBar />
      <Tiptap wordcount={true} />
    </>
  );
}
