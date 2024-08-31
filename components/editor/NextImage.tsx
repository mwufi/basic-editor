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

const ResizableContainer = ({ children, width, height, minWidth = 200, maxWidth = 1400, isEditing, onResize }) => {
    const [isResizing, setIsResizing] = useState(false)
    const containerRef = useRef(null)

    const handleMouseDown = (e) => {
        if (!isEditing) return
        e.preventDefault()
        setIsResizing(true)
    }

    const handleMouseUp = () => {
        setIsResizing(false)
    }

    const handleMouseMove = (e) => {
        if (!isResizing) return
        const newWidth = Math.min(Math.max(e.clientX - containerRef.current?.getBoundingClientRect().left, minWidth), maxWidth)
        const newHeight = (height * newWidth) / width
        onResize(newWidth, newHeight)
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
        <div
            ref={containerRef}
            className="relative border-3 border-transparent hover:border-gray-300 rounded-xl mx-auto my-8"
            style={{ width: `${width}px`, height: `${height}px` }}
        >
            {children}
            {isEditing && (
                <>
                    <div
                        className="absolute right-[-5px] bottom-[-5px] w-[10px] h-[10px] cursor-se-resize opacity-0 rounded-full transition-all duration-200 bg-gradient-to-br from-indigo-500 to-blue-500 shadow-md hover:opacity-100 hover:scale-110"
                        onMouseDown={handleMouseDown}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.opacity = '1'
                            e.currentTarget.style.transform = 'scale(1.2)'
                        }}
                        onMouseLeave={(e) => !isResizing && (e.currentTarget.style.opacity = '0')}
                    />
                    {isResizing && (
                        <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-sm font-bold">
                            {Math.round(width)}x{Math.round(height)}
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

const FullWidthImage = ({ src, alt, title, width, height, loader }) => {
    return (
        <ImageFromNext
            src={src}
            alt={alt || ''}
            title={title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
            loader={loader}
        />
    )
}

const NextImageView = ({ node, updateAttributes, editor }) => {
    const { src, alt, title, width, height } = node.attrs
    const isEditing = editor.isEditable

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

    const handleResize = (newWidth, newHeight) => {
        updateAttributes({ width: newWidth, height: newHeight })
    }

    return (
        <NodeViewWrapper className="next-image-wrapper">
            <div className="relative w-screen left-1/2 right-1/2 -mx-[50vw]">
                <ResizableContainer
                    width={width}
                    height={height}
                    isEditing={isEditing}
                    onResize={handleResize}
                >
                    <FullWidthImage
                        src={src}
                        alt={alt}
                        title={title}
                        width={width}
                        height={height}
                        loader={loader}
                    />
                </ResizableContainer>
            </div>
        </NodeViewWrapper>
    )
}

export default NextImage
