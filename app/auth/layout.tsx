import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
             <div className="absolute left-0 p-3">
                <Button size="sm" variant="ghost" asChild>
                    <Link href="/">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Home
                    </Link>
                </Button>
            </div>
            {children}
        </div>
    )
}