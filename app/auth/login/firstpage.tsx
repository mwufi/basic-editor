'use client'

import { Button } from '@/components/ui/button';
import { db } from '@/lib/instantdb/client'

export default function Login() {
    // create the authorization URL:
    const url = db.auth.createAuthorizationURL({
        clientName: "owri-web-dev",
        redirectURL: window.location.href,
    });

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background">
            <div className="p-8 space-y-4 bg-card rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center text-foreground">Login</h1>
                <Button asChild className="w-full">
                    <a href={url} className="flex items-center justify-center">
                        Log in with Google
                    </a>
                </Button>
            </div>
        </div>
    )
}