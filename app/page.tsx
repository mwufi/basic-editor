'use client'

import CommandPalette from "@/components/blocks/CommandPalette";
import Tiptap from "@/components/TipTap";
import { useState } from "react";

export default function Home() {
  const [document, setDocument] = useState('<p>Hello World! 🌎️</p>')
  return (
    <>
      <CommandPalette onLoadDocument={(doc) => {
        console.log(doc)
        setDocument(doc.content)
      }} />
      <Tiptap initialContent={document} editable={true} font="serif" />
    </>
  );
}
