import Tiptap from "@/components/TipTap";

export default function Home() {
  return (
    <div className="h-full p-8">
      <Tiptap editable={true} font="serif" />
    </div>
  );
}
