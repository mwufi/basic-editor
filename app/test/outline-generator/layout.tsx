'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { Compass, Headphones, Radio, Library, PlusCircle, Clock, Music, User, Disc, Settings, Search } from 'lucide-react';

const LeftPanel = () => {
  return (
    <div className="w-64 border-r p-4 flex-shrink-0">
      <nav className="space-y-6">
        <div>
          <h3 className="mb-2 text-sm font-semibold text-gray-500">Outline Generator</h3>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Outline
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Compass className="mr-2 h-4 w-4" />
              Browse Outlines
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Library className="mr-2 h-4 w-4" />
              Prompt Library
            </Button>
          </div>
        </div>
        <div>
          <h3 className="mb-2 text-sm font-semibold text-gray-500">Library</h3>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              <Disc className="mr-2 h-4 w-4" />
              Favorites
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Clock className="mr-2 h-4 w-4" />
              Currently Studying
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Radio className="mr-2 h-4 w-4" />
              Recent Outlines
            </Button>
          </div>
        </div>
        <div>
          <h3 className="mb-2 text-sm font-semibold text-gray-500">Study Tools</h3>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              <Headphones className="mr-2 h-4 w-4" />
              Notes
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Clock className="mr-2 h-4 w-4" />
              Study Sessions
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <User className="mr-2 h-4 w-4" />
              Friends
            </Button>
          </div>
        </div>
        <div>
          <h3 className="mb-2 text-sm font-semibold text-gray-500">Community</h3>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              <User className="mr-2 h-4 w-4" />
              Following
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Compass className="mr-2 h-4 w-4" />
              Discover
            </Button>
          </div>
        </div>
        <Button variant="ghost" className="w-full justify-start">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </nav>
    </div>
  )
}


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-grow">
        <LeftPanel />
        {children}
      </div>
    </div>
  )
}
