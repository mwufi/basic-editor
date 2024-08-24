
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