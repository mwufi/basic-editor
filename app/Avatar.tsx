'use client'

import React from 'react';
import { db } from '@/lib/instantdb/client';
import Link from 'next/link';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { UserProfile } from '@/lib/instantdb/queries';

export default function Avatar() {
    const { user } = db.useAuth();
    const { isLoading, error, data } = db.useQuery(user ? UserProfile(user.email) : null)

    const handleLogout = () => {
        if (!user?.email) return;
        db.auth.signOut();
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    className="rounded-lg"
                >
                    <div className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                        {
                            data?.users[0].handle ? data?.users[0].handle : "hi there"
                        }
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {user ? (
                    <DropdownMenuItem asChild>
                        <button
                            onClick={() => {
                                handleLogout();
                                window.location.reload();
                            }}
                            className="w-full text-left"
                        >
                            Log out
                        </button>
                    </DropdownMenuItem>
                ) : (
                    <DropdownMenuItem asChild>
                        <Link href="/auth/login">Log in</Link>
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}