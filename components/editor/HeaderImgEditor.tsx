'use client'

import { useState } from 'react'
import { useAtom, useAtomValue } from 'jotai'
import { noteMetadataAtom } from '@/components/editor/atoms'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export const HeaderImgDisplay = ({ url }: { url?: string }) => {
    const metadata = useAtomValue(noteMetadataAtom)
    const imgUrl = url || metadata?.headerImg
    return imgUrl && (
        <img
            src={imgUrl}
            alt="Header"
            className="full-width h-64 object-cover mb-2"
        />
    )
}

const HeaderImgEditor = () => {
    const [metadata, setMetadata] = useAtom(noteMetadataAtom)
    const [inputUrl, setInputUrl] = useState('')

    const handleAddImage = () => {
        if (inputUrl) {
            setMetadata({ ...metadata, headerImg: inputUrl })
            setInputUrl('')
        }
    }

    const handleRemoveImage = () => {
        setMetadata({ ...metadata, headerImg: undefined })
    }

    return (
        <div className="relative">
            {metadata?.headerImg ? (
                <div>
                    <img
                        src={metadata.headerImg}
                        alt="Header"
                        className="full-width h-64 object-cover mb-2"
                    />
                    <div className="absolute right-4 top-4 z-10">
                        <Button onClick={handleRemoveImage} variant="outline" size="sm">
                            Remove Header Image
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="flex gap-2 items-center max-w-3xl mx-auto pt-4">
                    <Input
                        type="text"
                        placeholder="Enter header image URL"
                        value={inputUrl}
                        onChange={(e) => setInputUrl(e.target.value)}
                    />
                    <Button onClick={handleAddImage} variant="secondary" size="sm">
                        Add Header Image
                    </Button>
                </div>
            )}
        </div>
    )
}

export default HeaderImgEditor
