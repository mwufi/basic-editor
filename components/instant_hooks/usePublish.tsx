import { useUserProfile } from '@/lib/instantdb/queries';
import { toast } from 'sonner';
import { syncPost } from '@/lib/instantdb/mutations';
import { Note } from '@/lib/types';

export const usePublish = () => {
    const { user } = useUserProfile();
    const currentUserId = user?.id;

    const addPost = async (note: Note) => {
        if (note.content.trim()) {
            try {
                return await syncPost(note, currentUserId)
            } catch (error) {
                toast.error('Error adding post:', error);
                console.error('Error adding post:', error);
                return null
            }
        }
    };

    return addPost
};