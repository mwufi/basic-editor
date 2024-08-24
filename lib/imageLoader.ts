'use client'

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export const supabaseImageLoader = ({ src, width }) => {
    if (src.startsWith('public/')) {
        // Load from Supabase
        const { data } = supabase.storage.from('editorimages').getPublicUrl(src)
        return `${data.publicUrl}?width=${width}`
    } else {
        // Load from default (assuming it's a full URL or relative path)
        return `${src}?width=${width}`
    }
}
