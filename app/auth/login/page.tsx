'use client';

import React, { useState } from 'react';
import { init } from '@instantdb/react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const APP_ID = '71186fbd-29c5-4d5f-bc04-68f6120e63c1';

const db = init({ appId: APP_ID });

const GOOGLE_CLIENT_ID = '913178836523-8afnre2lps045l979h1qrntufvceiqlj.apps.googleusercontent.com';

// Use the google client name in the Instant dashboard auth tab
const GOOGLE_CLIENT_NAME = 'owri-web-dev';

function App() {
    const { isLoading, user, error } = db.useAuth();
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Uh oh! {error.message}</div>;
    }
    if (user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-background">
                <div className="p-8 space-y-4 bg-card rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold text-center text-foreground">Hello, {user.email}!</h1>
                    <h2 className="text-xl text-center text-foreground">Welcome to our app!</h2>
                    <pre className="bg-gray-100 p-4 rounded-md overflow-auto w-[700px]">
                        {JSON.stringify(user, null, 2)}
                    </pre>
                    <button
                        onClick={() => db.auth.signOut()}
                        className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Log Out
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background">
            <div className="p-8 space-y-6 bg-card rounded-lg shadow-lg w-[400px] flex flex-col items-center">
                <h1 className="text-3xl font-bold text-center text-foreground">Welcome</h1>
                <p className="text-center text-muted-foreground">Please sign in to continue</p>
                <Login />
            </div>
        </div>
    );
}

function Login() {
    const [nonce] = useState(crypto.randomUUID());

    return (
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <GoogleLogin
                nonce={nonce}
                onError={() => alert('Login failed')}
                onSuccess={({ credential }) => {
                    db.auth
                        .signInWithIdToken({
                            clientName: GOOGLE_CLIENT_NAME,
                            idToken: credential,
                            // Make sure this is the same nonce you passed as a prop
                            // to the GoogleLogin button
                            nonce,
                        })
                        .catch((err) => {
                            alert('Uh oh: ' + err.body?.message);
                        });
                }}
            />
        </GoogleOAuthProvider>
    );
}

export default App;