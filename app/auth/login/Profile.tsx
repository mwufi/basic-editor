import { Button } from '@/components/ui/button';
import { tx, id } from '@instantdb/core'
import { db } from '@/lib/instantdb/client';

async function createUserIfNotExists(user: any) {
    try {
        const result = await db.transact([
            tx.users[id()].update({
                email: user.email,
                handle: user.email.split("@")[0],
                createdAt: Date.now()
            })
        ])
        console.log("Created user!", result)
    } catch (error) {
        console.error("Error creating user:", error.message)
    }
}

export default function Profile({ user }: { user: any }) {
    const { data, isLoading } = db.useQuery({
        users: {
            $: {
                where: {
                    email: user?.email
                }
            }
        }
    })

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
            </div>
        )
    }
    return (
        <div>
            {data && data.users && data.users.length > 0 ? (
                <div className="">
                    <div className="mb-4">
                        <p className="text-3xl font-semibold">Welcome, {data.users[0].handle}!</p>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="handle" className="block text-sm font-medium text-gray-700 mb-1">
                            Change username:
                        </label>
                        <div className="flex items-center">
                            <span className="text-gray-500 mr-2">@</span>
                            <input
                                type="text"
                                id="handle"
                                name="handle"
                                className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                defaultValue={data.users[0].email.split("@")[0]}
                            />
                            <Button
                                onClick={() => {
                                    // TODO: Implement handle update logic
                                }}
                                className="ml-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out"
                            >
                                Update
                            </Button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center space-y-4">
                    <p className="text-lg text-gray-600">You are not registered yet!</p>
                    <Button
                        onClick={() => {
                            createUserIfNotExists(user);
                        }}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
                    >
                        Create User Profile
                    </Button>
                </div>
            )}

        </div>
    )
}