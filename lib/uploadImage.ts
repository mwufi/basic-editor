
import { v4 as uuidv4 } from 'uuid';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export async function uploadImageToSupabase(file: File) {
    console.log("Uploading image to supabase?")
    const uuid = uuidv4();
    const fileName = `${uuid}.${file.name.split('.').pop()}`;

    const fileReader = new FileReader();

    return new Promise<string | null>((resolve) => {
        fileReader.onload = async () => {
            const dataUri = fileReader.result as string;

            // Convert data URI to Blob
            const res = await fetch(dataUri);
            const blob = await res.blob();

            const { data, error } = await supabase
                .storage
                .from('editorimages')
                .upload(`public/${fileName}`, blob, {
                    contentType: file.type,
                    cacheControl: '3600',
                    upsert: false
                });

            console.log("Uploaded image to supabase", data)
            if (error) {
                console.error('Error uploading image:', error);
                resolve(null);
            } else {
                resolve(data.path);
            }

        };

        fileReader.readAsDataURL(file);
    });
}