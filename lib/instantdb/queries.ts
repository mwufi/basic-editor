import { db } from './client'

export const UserProfile = email => (
    {
        users: {
            $: {
                where: {
                    email: email
                }
            }
        }
    }
)

export const UserProfileByHandle = (handle) => (
    {
        users: {
            $: {
                where: {
                    handle: handle
                }
            }
        }
    }
)

export function useUserProfile() {
    const { user } = db.useAuth();
    const { data: profile } = db.useQuery(user ? UserProfile(user.email) : null);
    return { authUser: user, user: profile?.users[0] || null }
}

export const UserPosts = (userId) => (
    {
        posts: {
            author: {
                $: {
                    where: {
                        id: userId
                    }
                }
            }
        }
    }
)

export const UserOutline = (outlineId) => (
    {
        outlines: {
            $: {
                where: {
                    id: outlineId
                }
            },
            outlineNodes: {
                children: {
                    children: {
                        children: {},
                        parent: {}
                    },
                    parent: {}
                },
                parent: {}
            },
            author: {}
        }
    }
)