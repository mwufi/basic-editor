'use client'

import { useState, useEffect } from 'react'
import { db } from '@/lib/instantdb/client'
import { tx, id } from '@instantdb/core'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UserPosts, UserProfile } from '@/lib/instantdb/queries'
import { toast } from 'sonner'

export default function InstantNoteReader() {
    const [posts, setPosts] = useState([])
    const [newPostText, setNewPostText] = useState('')

    const { user } = db.useAuth();
    const { data: profile } = db.useQuery(user ? UserProfile(user.email) : null)
    const { data, isLoading } = db.useQuery(profile?.users[0] ? UserPosts(profile?.users[0].id) : null)

    const currentUserId = profile?.users[0].id

    useEffect(() => {
        if (data && data.posts) {
            setPosts(data.posts)
        }
    }, [data])

    const handleAddPost = async () => {
        if (newPostText.trim()) {
            try {
                await db.transact([
                    tx.posts[id()].update({
                        text: newPostText,
                        createdAt: Date.now(),
                    }).link({
                        author: currentUserId
                    })
                ])
                setNewPostText('')
            } catch (error) {
                console.error('Error adding post:', error)
            }
        }
    }

    if (isLoading) {
        return (
            <div className="flex flex-col justify-center items-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500 mb-4"></div>
                <div className="flex flex-col items-center">
                    <p className="text-lg font-semibold mb-4">Log in to continue</p>
                    <Button onClick={() => window.location.href = '/auth/login'}>
                        Log In
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Instant Note Reader</h1>
            <Card className="mb-4">
                <CardHeader>
                    <CardTitle>auth.id</CardTitle>
                </CardHeader>
                <CardContent>
                    <pre className="whitespace-pre-wrap overflow-x-auto">
                        {JSON.stringify(user?.id, null, 2)}
                    </pre>
                </CardContent>
            </Card>
            <Card className="mb-4">
                <CardHeader>
                    <CardTitle>Current Profile</CardTitle>
                    <p className="text-gray-400 mb-4">Matched to auth by email</p>
                </CardHeader>
                <CardContent>
                    <pre className="whitespace-pre-wrap overflow-x-auto">
                        {JSON.stringify(profile?.users[0], null, 2)}
                    </pre>
                    {!profile?.users[0]?.authIds && (
                        <Button
                            onClick={async () => {
                                try {
                                    db.transact([
                                        tx.users[profile.users[0].id].update({
                                            authId: user.id
                                        })
                                    ])
                                    toast.success('Auth ID added to profile')
                                } catch (error) {
                                    toast.error('Error updating authIds:', error.message)
                                }
                            }}
                            className="mt-4"
                        >
                            Add Auth ID to Profile
                        </Button>
                    )}
                </CardContent>
            </Card>
            <Card className="mb-4">
                <CardHeader>
                    <CardTitle>Add New Post</CardTitle>
                </CardHeader>
                <CardContent>
                    <Textarea
                        placeholder="Write your post here..."
                        value={newPostText}
                        onChange={(e) => setNewPostText(e.target.value)}
                        className="mb-2"
                    />
                    <Button onClick={handleAddPost}>Add Post</Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Posts</CardTitle>
                </CardHeader>
                <CardContent>
                    <pre className='mb-4'>
                        {JSON.stringify(profile?.users[0] ? UserPosts(profile?.users[0].id) : null, null, 2)}
                    </pre>
                    {posts.length === 0 ? (
                        <p>No posts found!</p>
                    ) : (
                        <>
                            <p className='mb-4'>Here are your posts:</p>
                            {posts.map((post) => (
                                <div key={post.id} className="mb-4 p-2 border rounded">
                                    <pre>{JSON.stringify(post, null, 2)}</pre>
                                    <div className="text-xs text-gray-500 mt-1">
                                        Created: {new Date(post.createdAt).toLocaleString()}
                                    </div>
                                    <Button
                                        onClick={() => {
                                            db.transact([
                                                tx.posts[post.id].delete()
                                            ]);
                                        }}
                                        className="mt-2"
                                        variant="destructive"
                                        size="sm"
                                    >
                                        Delete Post
                                    </Button>
                                </div>
                            ))}
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
