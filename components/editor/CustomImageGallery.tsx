'use client'

import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer, NodeViewWrapper } from '@tiptap/react'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import Image from 'next/image'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const CustomImageGalleryComponent = ({ node, updateAttributes, editor }) => {
    const [layout, setLayout] = useState(node.attrs.layout)
    const [images, setImages] = useState(Array.isArray(node.attrs.images) ? node.attrs.images : [])
    const [caption, setCaption] = useState(node.attrs.caption)
    const [maxHeight, setMaxHeight] = useState(node.attrs.maxHeight || 600)
    const editable = editor.isEditable

    useEffect(() => {
        setLayout(node.attrs.layout)
        setImages(Array.isArray(node.attrs.images) ? node.attrs.images : [])
        setCaption(node.attrs.caption)
        setMaxHeight(node.attrs.maxHeight || 600)
    }, [node.attrs])

    const toggleLayout = () => {
        const newLayout = layout === 'carousel' ? 'grid' : 'carousel'
        setLayout(newLayout)
        updateAttributes({ layout: newLayout })
    }

    const handleImageSelection = () => {
        const newImage = `https://picsum.photos/800/600?random=${Math.random()}`
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
                        <div key={index} className="flex-shrink-0 w-4/5 max-w-[800px]">
                            <Image src={src} alt={`Gallery image ${index + 1}`} width={800} height={600} className="rounded-lg object-cover w-full h-auto" style={{ maxHeight: `${maxHeight}px` }} />
                        </div>
                    ))}
                </div>
            )
        } else {
            return (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
                    {images.map((src, index) => (
                        <div key={index}>
                            <Image src={src} alt={`Gallery image ${index + 1}`} width={800} height={600} className="rounded-lg object-cover w-full h-auto" style={{ maxHeight: `${maxHeight}px` }} />
                        </div>
                    ))}
                </div>
            )
        }
    }

    if (!editable) {
        return (
            <NodeViewWrapper>
                <div className="custom-image-gallery-wrapper">
                    {renderImages()}
                    {caption && <p className="text-center mt-2">{caption}</p>}
                </div>
            </NodeViewWrapper>
        )
    }

    return (
        <NodeViewWrapper>
            <div className="custom-image-gallery-wrapper border rounded p-4 my-4">
                <div className="control mb-4">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                            <Switch id="layout-switch" checked={layout === 'grid'} onCheckedChange={toggleLayout} />
                            <Label htmlFor="layout-switch">
                                {layout === 'carousel' ? 'Carousel' : 'Grid'} Layout
                            </Label>
                        </div>
                        <Button onClick={handleImageSelection}>Add Image</Button>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Label htmlFor="max-height">Max Height (px):</Label>
                        <Input
                            id="max-height"
                            type="number"
                            value={maxHeight}
                            onChange={(e) => {
                                const newMaxHeight = parseInt(e.target.value, 10)
                                setMaxHeight(newMaxHeight)
                                updateAttributes({ maxHeight: newMaxHeight })
                            }}
                            className="w-20"
                        />
                    </div>
                </div>
                <div className="gallery">
                    {renderImages()}
                </div>
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
            </div>
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
            },
            maxHeight: {
                default: 400,
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
                        maxHeight: parseInt(element.getAttribute('data-max-height') || '400', 10),
                    })
                },
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        const { layout, images, caption, maxHeight, ...rest } = HTMLAttributes;
        return ['div', mergeAttributes(
            rest,
            {
                'data-custom-image-gallery': '',
                'data-layout': layout,
                'data-images': JSON.stringify(images),
                'data-caption': caption,
                'data-max-height': maxHeight,
            }
        ), 0]
    },

    addNodeView() {
        return ReactNodeViewRenderer(CustomImageGalleryComponent)
    },
})

export default CustomImageGallery
