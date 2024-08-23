'use client'

import CommandPalette from "@/components/blocks/CommandPalette";
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
      <Tiptap note={document} editable={true} font="serif" />
    </>
  );
}
