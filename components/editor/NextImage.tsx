'use client'

import ImageFromNext from 'next/image'
import { createClient } from '@supabase/supabase-js'
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react'
import { useState, useRef, useEffect } from 'react'
import { Node, mergeAttributes } from '@tiptap/core'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

const NextImage = Node.create({
    name: 'nextImage',
    group: 'block',
    content: 'inline*',

    addAttributes() {
        return {
            src: {
                default: null,
            },
            alt: {
                default: null,
            },
            title: {
                default: null,
            },
            width: {
                default: 768,
            },
            height: {
                default: 400,
            },
        }
    },

    parseHTML() {
        return [
            {
                tag: 'div[data-type="next-image"]',
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'next-image' }), 0]
    },

    addNodeView() {
        return ReactNodeViewRenderer(NextImageView)
    },
})

const NextImageView = ({ node, updateAttributes }) => {
    const [isResizing, setIsResizing] = useState(false)
    const imageRef = useRef(null)
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

    const handleMouseDown = (e) => {
        e.preventDefault()
        setIsResizing(true)
    }

    const handleMouseUp = () => {
        setIsResizing(false)
    }

    const handleMouseMove = (e) => {
        if (!isResizing) return

        const newWidth = e.clientX - imageRef.current.getBoundingClientRect().left
        const newHeight = (height * newWidth) / width

        updateAttributes({ width: newWidth, height: newHeight })
    }

    useEffect(() => {
        document.addEventListener('mouseup', handleMouseUp)
        document.addEventListener('mousemove', handleMouseMove)

        return () => {
            document.removeEventListener('mouseup', handleMouseUp)
            document.removeEventListener('mousemove', handleMouseMove)
        }
    }, [isResizing])

    return (
        <NodeViewWrapper className="next-image-wrapper">
            <div
                ref={imageRef}
                className="next-image"
                style={{
                    position: 'relative',
                    width: `${width}px`,
                    height: `${height}px`,
                    marginLeft: `calc(-${width}px / 2)`,
                    left: '50%'
                }}
            >
                <ImageFromNext
                    src={src}
                    alt={alt || ''}
                    title={title}
                    width={width}
                    height={height}
                    loader={loader}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                    className="resize-handle"
                    style={{
                        position: 'absolute',
                        right: '-5px',
                        bottom: '-5px',
                        width: '10px',
                        height: '10px',
                        cursor: 'se-resize',
                        opacity: 1,
                        borderRadius: '50%',
                        transition: 'opacity 0.2s, background 0.2s',
                        background: 'linear-gradient(135deg, #6366f1, #3b82f6)',
                        boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)'
                    }}
                    onMouseDown={handleMouseDown}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = '1';
                        e.currentTarget.style.transform = 'scale(1.2)';
                    }}
                    onMouseLeave={(e) => !isResizing && (e.currentTarget.style.opacity = '0')}
                />
            </div>
        </NodeViewWrapper>
    )
}

export default NextImage
