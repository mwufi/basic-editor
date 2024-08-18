'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface SchemaItem {
    [key: string]: string
}

interface SimpleDialogProps {
    schema: SchemaItem[]
    onSubmit: (data: { [key: string]: string }) => void
    title?: string,
    children?: React.ReactNode
}

const SimpleDialog: React.FC<SimpleDialogProps> = ({ schema, onSubmit, title = "Enter Information", children }) => {
    const [open, setOpen] = useState(false)
    const [formData, setFormData] = useState<{ [key: string]: string }>({})

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(formData)
        setOpen(false)
        setFormData({})
    }

    const handleInputChange = (key: string, value: string) => {
        setFormData(prev => ({ ...prev, [key]: value }))
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    {schema.map((item, index) => {
                        const [key, type] = Object.entries(item)[0]
                        return (
                            <div key={index} className="mb-4">
                                <Label htmlFor={key} className="text-right">
                                    {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                </Label>
                                <Input
                                    id={key}
                                    type={type}
                                    value={formData[key] || ''}
                                    onChange={(e) => handleInputChange(key, e.target.value)}
                                    className="col-span-3"
                                />
                            </div>
                        )
                    })}
                    <DialogFooter>
                        <Button type="submit">OK</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default SimpleDialog
