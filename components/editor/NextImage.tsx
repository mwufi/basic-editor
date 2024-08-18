import Image from '@tiptap/extension-image'
import ImageFromNext from 'next/image'
import { createClient } from '@supabase/supabase-js'
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

const NextImage = Image.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            width: {
                default: null,
            },
            height: {
                default: null,
            },
        }
    },

    addNodeView() {
        return ReactNodeViewRenderer(({ node }) => {
            const { src, alt, title, width, height } = node.attrs
            const loader = ({ src, width }) => {
                if (src.startsWith('public/')) {
                    // Load from Supabase
                    const { data } = supabase.storage.from('editorimages').getPublicUrl(src)
                    return `${data.publicUrl}?width=${width}`
                } else {
                    // Load from default (assuming it's a full URL or relative path)
                    return `${src}?width=${width}`
                }
            }

            return (
                <NodeViewWrapper className="next-image">
                    <ImageFromNext
                        src={src}
                        alt={alt || ''}
                        title={title}
                        width={width || 600}
                        height={height || 400}
                        loader={loader}
                        style={{ width: 'auto', height: 'auto' }}
                    />
                </NodeViewWrapper>
            )
        })
    },
})

export default NextImage
