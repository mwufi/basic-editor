import Tiptap from "@/components/TipTap";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-full p-8">
      <div className="mx-auto max-w-prose h-[500px]">
        <Tiptap />
      </div>
    </div>
  );
}
