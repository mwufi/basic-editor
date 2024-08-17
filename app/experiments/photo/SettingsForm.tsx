'use client'

import React, { useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const formSchema = z.object({
    prompt: z.string().min(2, {
        message: "Prompt must be at least 2 characters.",
    }),
    style: z.string().min(2, {
        message: "Style must be at least 2 characters.",
    }),
    negativePrompt: z.string(),
    steps: z.number().int().positive(),
    guidanceScale: z.number().positive(),
    strength: z.number().min(0).max(1),
    seed: z.number().int(),
})

const SettingsForm = ({ defaultSettings, onChange = undefined }) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultSettings,
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    useEffect(() => {
        const subscription = form.watch((value) => {
            const result = formSchema.safeParse(value);
            if (result.success && onChange) {
                onChange(result.data);
            }
        });
        return () => subscription.unsubscribe();
    }, [form, onChange]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="prompt"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Prompt</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Enter your prompt" {...field} />
                            </FormControl>
                            <FormDescription>
                                Describe the image you want to generate.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="style"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Style</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter the style" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="negativePrompt"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Negative Prompt</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Enter negative prompt" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="steps"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Steps</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="guidanceScale"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Guidance Scale</FormLabel>
                            <FormControl>
                                <Input type="number" step="0.1" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="strength"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Strength</FormLabel>
                            <FormControl>
                                <Input type="number" step="0.1" min="0" max="1" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="seed"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Seed</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}

export default SettingsForm;