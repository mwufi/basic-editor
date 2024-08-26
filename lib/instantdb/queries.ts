
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