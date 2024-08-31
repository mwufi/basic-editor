'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const IFrameTest = () => {
  const [url, setUrl] = useState('https://example.com')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // The URL is already set in state, so we don't need to do anything here
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <form onSubmit={handleSubmit} className="mb-4 w-full max-w-md">
        <div className="flex space-x-2">
          <Input
            type="url"
            placeholder="Enter URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit">Go</Button>
        </div>
      </form>
      <div className="w-[375px] h-[667px] border-2 border-gray-300 rounded-lg overflow-hidden">
        <iframe
          src={url}
          className="w-full h-full"
          title="iPhone-sized iframe"
        />
      </div>
    </div>
  )
}

export default IFrameTest
