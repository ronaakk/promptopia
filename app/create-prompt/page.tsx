"use client"

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Form from '@/components/Form'
import { useToast } from '@/hooks/use-toast'

export default function CreatePrompt() {
    const router = useRouter()
    const { data: session } = useSession()
    const { toast } = useToast()
    const [submitting, isSubmitting] = useState(false) 
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    })

    // regex helper to prevent weird tags on prompts
    const sanitizeTag = (tag: string): string => {
        return tag
          .toLowerCase()                // Convert to lowercase
          .replace(/\s+/g, '')          // Remove all whitespace characters
          .replace(/[^a-z0-9]/g, '');   // Remove all non-alphanumeric characters
    };
    
    // create the prompt and save it to db
    const createPrompt = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault()
        if (!session) {
            toast({
                title: 'Please login to post a prompt.',
            })
            return
        }

        isSubmitting(true)

        try {
            // sanitize the tag first
            const sanitizedTag = sanitizeTag(post.tag)

            // try and save the new prompt to the model using api
            const response = await fetch('/api/prompt/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: sanitizedTag,
                    // pass the email here to the api then get the id in the backend
                    email: session?.user?.email,
                })
            })

            if (!response.ok) {
                const errorText = await response.text();
                console.error(errorText);
                toast({ 
                    title: 'Invalid input', 
                    description: 'Please check your prompt and tag.' 
                });
                isSubmitting(false)
            } else {
                // redirect the user to the homepage with query parameter to show creating the prompt was a success
                router.push('/?toast=success')
            }
        } catch (error: unknown) {
            if (error instanceof Error) {              
                toast({
                    title: 'Uh oh! Something went wrong.',
                    description: 'There was a problem creating your prompt. Please try again.'
                })

            } else {
                toast({
                    title: 'Uh oh! Something went wrong.',
                    description: 'Something unexpected occured. Please try again'
                })
            }

        } finally {
            isSubmitting(false)
        }
    }

    return (
        <Form 
            type = "Create"
            post = {post}
            setPost = {setPost}
            submitting = {submitting}
            handleSubmit = {createPrompt}
        />
    )

}