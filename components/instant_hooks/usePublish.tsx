import { UserProfile } from '@/lib/instantdb/queries';
import { db } from '@/lib/instantdb/client';
import { tx, id } from '@instantdb/core';
import { toast } from 'sonner';

interface Note {
    title: string;
    text: string;
}

export const usePublish = () => {
    const { user } = db.useAuth();
    const { data: profile } = db.useQuery(user ? UserProfile(user.email) : null);
    const currentUserId = profile?.users[0].id;

    const addPost = async (note: Note) => {
        if (note.text.trim()) {
            try {
                const postId = id()
                await db.transact([
                    tx.posts[postId].update({
                        text: note.text,
                        createdAt: Date.now()
                    }).link({
                        author: currentUserId
                    })
                ]);
                return postId
            } catch (error) {
                toast.error('Error adding post:', error);
                console.error('Error adding post:', error);
                return null
            }
        }
    };

    return addPost
};