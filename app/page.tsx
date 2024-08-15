import Tiptap from "@/components/TipTap";

export default function Home() {
  return (
    <div className="h-full p-8">
      <div className="mx-auto max-w-[600px]">
        <Tiptap editable={true} font="serif" />
      </div>
    </div>
  );
}
