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
import { Trash2 } from 'lucide-react'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel'
import { uploadImageToSupabase } from '@/lib/uploadImage'
import { supabaseImageLoader } from '@/lib/imageLoader'

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

    const removeImage = (index) => {
        const updatedImages = images.filter((_, i) => i !== index)
        setImages(updatedImages)
        updateAttributes({ images: updatedImages })
    }

    const onDrop = useCallback(async (acceptedFiles) => {
        const newImages = await Promise.all(acceptedFiles.map(async (file) => {
            const uploadedImage = await uploadImageToSupabase(file)
            return uploadedImage
        }));
        const validNewImages = newImages.filter(img => img !== null);
        const updatedImages = [...images, ...validNewImages]
        setImages(updatedImages)
        updateAttributes({ images: updatedImages })
    }, [images, updateAttributes])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    const renderImages = () => {
        if (!images || images.length === 0) {
            return (
                <div className="flex justify-center items-center h-40 bg-gray-100">
                    <p className="text-gray-500">No images in gallery</p>
                </div>
            )
        }

        const imageComponent = (src, index) => (
            <div key={index} className="relative group">
                <Image src={src} alt={`Gallery image ${index + 1}`} loader={supabaseImageLoader} width={800} height={600} className="object-cover w-full h-auto" style={{ maxHeight: `${maxHeight}px` }} />
                {editable && (
                    <button
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeImage(index)}
                    >
                        <Trash2 size={16} />
                    </button>
                )}
            </div>
        )

        if (layout === 'carousel') {
            return (
                <Carousel className="w-full">
                    <CarouselContent>
                        {images.map((src, index) => (
                            <CarouselItem key={index} className="md:basis-2/5">
                                {imageComponent(src, index)}
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            )
        } else {
            return (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-1 p-2">
                    {images.map((src, index) => imageComponent(src, index))}
                </div>
            )
        }
    }

    if (!editable) {
        return (
            <NodeViewWrapper>
                <div className="custom-image-gallery-wrapper relative left-1/2 right-1/2 -mx-[45vw] w-[90vw]">
                    {renderImages()}
                    {caption && <p className="text-center mt-2">{caption}</p>}
                </div>
            </NodeViewWrapper>
        )
    }

    return (
        <NodeViewWrapper>
            <div className="custom-image-gallery-wrapper border rounded p-4 my-4">
                <h3 className="text-lg font-semibold mb-4">Gallery</h3>

                {/* Settings section */}
                <div className="settings-section mb-4">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                            <Switch id="layout-switch" checked={layout === 'grid'} onCheckedChange={toggleLayout} />
                            <Label htmlFor="layout-switch">
                                {layout === 'carousel' ? 'Carousel' : 'Grid'} Layout
                            </Label>
                        </div>
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

                {/* Dropzone section */}
                <div {...getRootProps()} className="dropzone-section mb-4 border-2 border-dashed border-gray-300 p-4 text-center cursor-pointer">
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p>Drop the images here ...</p>
                    ) : (
                        <p>Drag 'n' drop some images here, or click to select files</p>
                    )}
                </div>

                {/* Gallery preview */}
                <div className="gallery-preview relative left-1/2 right-1/2 -mx-[45vw] w-[90vw]">
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
