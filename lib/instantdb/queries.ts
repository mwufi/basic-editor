
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

export const UserOutline = (userId, outlineId) => (
    {
        outlines: {
            $: {
                where: {
                    id: outlineId
                }
            },
            outlineNodes: {},
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