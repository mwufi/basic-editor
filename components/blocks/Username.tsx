'use client'

import { db } from "@/lib/instantdb/client";

export default function Username() {
    const { user } = db.useAuth();
    return <span>Welcome, {user?.email}</span>;
}