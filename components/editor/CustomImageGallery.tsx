'use client'

import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer, NodeViewWrapper } from '@tiptap/react'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import Image from 'next/image'

const CustomImageGalleryComponent = ({ node, updateAttributes, editor }) => {
    console.log("node attrs", node.attrs)
    const [layout, setLayout] = useState(node.attrs.layout)
    const [images, setImages] = useState(Array.isArray(node.attrs.images) ? node.attrs.images : [])
    const [caption, setCaption] = useState(node.attrs.caption)
    const editable = editor.isEditable

    useEffect(() => {
        setLayout(node.attrs.layout)
        setImages(Array.isArray(node.attrs.images) ? node.attrs.images : [])
        setCaption(node.attrs.caption)
    }, [node.attrs])

    const toggleLayout = () => {
        const newLayout = layout === 'carousel' ? 'grid' : 'carousel'
        setLayout(newLayout)
        updateAttributes({ layout: newLayout })
    }

    const handleImageSelection = () => {
        // For demonstration, we're just adding a new image URL
        // In a real application, you'd implement an image selection process here
        const newImage = `https://picsum.photos/200/300?random=${Math.random()}`
        const updatedImages = [...images, newImage]
        setImages(updatedImages)
        updateAttributes({ images: updatedImages })
    }

    const renderImages = () => {
        if (!images || images.length === 0) {
            return (
                <div className="flex justify-center items-center h-40 bg-gray-100 rounded-lg">
                    <p className="text-gray-500">No images in gallery</p>
                </div>
            )
        }

        if (layout === 'carousel') {
            return (
                <div className="flex overflow-x-auto space-x-4 p-4">
                    {images.map((src, index) => (
                        <Image key={index} src={src} alt={`Gallery image ${index + 1}`} width={200} height={300} className="rounded-lg" />
                    ))}
                </div>
            )
        } else {
            return (
                <div className="grid grid-cols-3 gap-4 p-4">
                    {images.map((src, index) => (
                        <Image key={index} src={src} alt={`Gallery image ${index + 1}`} width={200} height={300} className="rounded-lg" />
                    ))}
                </div>
            )
        }
    }

    if (!editable) {
        return (
            <NodeViewWrapper className="custom-image-gallery-wrapper">
                {renderImages()}
                {caption && <p className="text-center mt-2">{caption}</p>}
            </NodeViewWrapper>
        )
    }

    return (
        <NodeViewWrapper className="custom-image-gallery-wrapper border rounded p-4 my-4">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                    <Switch id="layout-switch" checked={layout === 'grid'} onCheckedChange={toggleLayout} />
                    <Label htmlFor="layout-switch">
                        {layout === 'carousel' ? 'Carousel' : 'Grid'} Layout
                    </Label>
                </div>
                <Button onClick={handleImageSelection}>Add Image</Button>
            </div>
            {renderImages()}
            <Input
                type="text"
                value={caption}
                onChange={(e) => {
                    setCaption(e.target.value)
                    updateAttributes({ caption: e.target.value })
                }}
                placeholder="Gallery Caption"
                className="mt-4"
            />
        </NodeViewWrapper>
    )
}

const CustomImageGallery = Node.create({
    name: 'customImageGallery',

    group: 'block',

    content: 'inline*',

    atom: true,

    addAttributes() {
        return {
            layout: {
                default: 'carousel',
            },
            images: {
                default: [],
                parseHTML: (element) => {
                    const images = element.getAttribute('data-images');
                    return images ? JSON.parse(images) : [];
                },
            },
            caption: {
                default: '',
            }
        }
    },

    parseHTML() {
        return [
            {
                tag: 'div[data-custom-image-gallery]',
                getAttrs: (element) => {
                    console.log("parseHTML", element.getAttribute('data-images'))
                    return ({
                        layout: element.getAttribute('data-layout') || 'carousel',
                        images: JSON.parse(element.getAttribute('data-images') || '[]'),
                        caption: element.getAttribute('data-caption') || '',
                    })
                },
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        const { layout, images, caption, ...rest } = HTMLAttributes;
        return ['div', mergeAttributes(
            rest,
            {
                'data-custom-image-gallery': '',
                'data-layout': layout,
                'data-images': JSON.stringify(images),
                'data-caption': caption,
            }
        ), 0]
    },

    addNodeView() {
        return ReactNodeViewRenderer(CustomImageGalleryComponent)
    },
})

export default CustomImageGallery
