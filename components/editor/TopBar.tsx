'use client'

import Avatar from "@/app/Avatar";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { updatedAtAtom } from "./atoms";
import { useAtomValue } from "jotai";
import { getRelativeTime } from "@/lib/utils";

export default function TopBar() {
    const updatedAt = useAtomValue(updatedAtAtom)
    return (
        <div className="p-4 flex justify-between">
            <div className="flex items-center">
                <Link href="/" className="flex items-center text-sm font-medium rounded-md p-2 px-4">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                </Link>
                {updatedAt && <span className="text-xs opacity-50">Last updated {getRelativeTime(updatedAt)}</span>}
            </div>
            <Avatar />
        </div>
    )
}