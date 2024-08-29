import { useUserProfile } from '@/lib/instantdb/queries';
import { toast } from 'sonner';
import { syncPost } from '@/lib/instantdb/mutations';
import { Note } from '@/lib/types';

export const usePublish = () => {
    const { user } = useUserProfile();
    const currentUserId = user?.id;

    const addPost = async (note: Note): Promise<{ success: boolean, result: any, updatedNote: Note }> => {
        if (note.content.trim()) {
            try {
                const result = await syncPost(note, currentUserId)
                return result
            } catch (error) {
                toast.error('Error adding post:', error);
                console.error('Error adding post:', error);
                return { success: false, result: null, updatedNote: null }
            }
        }
    };

    return addPost
};