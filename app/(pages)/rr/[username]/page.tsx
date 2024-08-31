'use client'

import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { db } from '@/lib/instantdb/client'
import { UserProfileByHandle } from '@/lib/instantdb/queries'

export default function UserProfilePage() {
    const { username } = useParams()
    const { isLoading, error, data } = db.useQuery(UserProfileByHandle(username))

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>

    const user = data?.users[0]

    if (!user) return <div>User not found</div>

    return (
        <div className="container mx-auto p-4">
            <Card className="w-full max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">
                        Welcome to {user.handle}'s Profile
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-center text-gray-600 mb-4">
                        Member since {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
