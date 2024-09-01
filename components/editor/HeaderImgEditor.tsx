'use client'

import { useState } from 'react'
import { useAtom, useAtomValue } from 'jotai'
import { noteMetadataAtom } from '@/components/editor/atoms'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export const HeaderImgDisplay = () => {
    const metadata = useAtomValue(noteMetadataAtom)
    if (!metadata?.headerImg) {
        return null
    }
    return (
        <img
            src={metadata.headerImg}
            alt="Header"
            className="w-full h-64 object-cover mb-2"
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
        <div className="mb-6">
            {metadata?.headerImg ? (
                <div>
                    <img
                        src={metadata.headerImg}
                        alt="Header"
                        className="w-full h-64 object-cover mb-2"
                    />
                    <Button onClick={handleRemoveImage} variant="outline" size="sm">
                        Remove Header Image
                    </Button>
                </div>
            ) : (
                <div className="flex flex-col space-y-2 max-w-3xl mx-auto">
                    <Input
                        type="text"
                        placeholder="Enter header image URL"
                        value={inputUrl}
                        onChange={(e) => setInputUrl(e.target.value)}
                    />
                    <Button onClick={handleAddImage} variant="outline" size="sm">
                        Add Header Image
                    </Button>
                </div>
            )}
        </div>
    )
}

export default HeaderImgEditor
