import { useAtom } from "jotai";
import { Input } from "@/components/ui/input";
import { noteTitleAtom } from "./editor/atoms";
import SaveButton from "./editor/SaveButton";

const TopBar = ({ children }: { children?: React.ReactNode }) => {
    const [title, setTitle] = useAtom(noteTitleAtom);
    return (
        <div className="sticky top-0 z-10 flex flex-col items-center justify-center rounded">
            <div className="flex items-center justify-between w-full">
                {children}
                <SaveButton />
            </div>
            <form onSubmit={(e) => {
                e.preventDefault();
            }} className='w-full mt-2 max-w-3xl'>
                <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='w-full rounded-lg text-3xl font-bold text-center focus-visible:ring-0 outline-none border-none hover:bg-orange-100 bg-transparent py-2'
                    placeholder='Untitled'
                    autoFocus
                />
            </form>
        </div>
    )
}

export default TopBar
