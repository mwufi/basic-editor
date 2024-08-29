import { useAtom } from "jotai";
import { Input } from "@/components/ui/input";
import { noteTitleAtom } from "./editor/atoms";
import SaveButton from "./editor/SaveButton";
import ShareMenu from "./ShareMenu";
import { Button } from "@/components/ui/button";

const TopBar = ({ children }: { children?: React.ReactNode }) => {
    const [title, setTitle] = useAtom(noteTitleAtom);
    return (
        <div className="sticky top-0 z-10 flex flex-col items-center justify-center p-2 rounded">
            <div className="flex items-center justify-between w-full">
                <div className="flex gap-2">
                    {children}
                </div>
                <div className="flex gap-2">
                    <Button variant="ghost" size="sm"><SaveButton /></Button>
                    <Button variant="ghost" size="sm"><ShareMenu /></Button>
                </div>
            </div>
            <form onSubmit={(e) => {
                e.preventDefault();
            }} className='w-full mt-2'>
                <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='w-full rounded-lg text-2xl font-bold text-center focus-visible:ring-0 outline-none border-none hover:bg-orange-100'
                    placeholder='Untitled'
                    autoFocus
                />
            </form>
        </div>
    )
}

export default TopBar
