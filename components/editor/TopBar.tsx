'use client'

import Avatar from "@/app/Avatar";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { updatedAtAtom } from "./atoms";
import { useAtomValue } from "jotai";

export default function TopBar() {
    const updatedAt = useAtomValue(updatedAtAtom)
    return (
        <div className="p-4 flex justify-between border-b">
            <div>
                <Link href="/" className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md p-2 px-4">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                </Link>
                {updatedAt && <span className="text-xs text-gray-500">Last updated {new Date(updatedAt).toLocaleString()}</span>}
            </div>
            <Avatar />
        </div>
    )
}