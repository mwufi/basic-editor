'use client'

import CommandPalette from "@/components/blocks/CommandPalette";
import FullPageOverlay from "@/components/blocks/FullPageOverlay";
// import ProfilePage from "@/components/blocks/ProfilePage";
import Tiptap from "@/components/TipTap";
import { useState } from "react";

export default function Home() {
  const [document, setDocument] = useState(undefined)
  return (
    <>
      <CommandPalette onLoadDocument={(doc) => {
        console.log(doc)
        setDocument(doc)
      }} />
      <FullPageOverlay trigger="Cmd+P">
        hi there
        {/* <ProfilePage /> */}
      </FullPageOverlay>
      <Tiptap note={document} editable={true} font="serif" />
    </>
  );
}
