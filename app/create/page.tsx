'use client'

import CommandPalette from "@/components/blocks/CommandPalette";
import Tiptap from "@/components/TipTap";
import { useState } from "react";

export default function Home() {
  return (
    <>
      {/* <CommandPalette /> */}
      <Tiptap wordcount={true} />
    </>
  );
}
