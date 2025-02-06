"use client"

import { useSearchParams } from "next/navigation"
import Form from "@/components/Form"
import { useState, useEffect } from "react"
import { sanitizeTag } from '@/utils/helpers'
import { useToast } from "@/hooks/use-toast"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

function Page() {
    // will be used to set current fields of prompt, and save new fields
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    })
    const { toast } = useToast()
    const [submitting, isSubmitting] = useState(false) 
    const searchParams = useSearchParams()
    const promptId = searchParams.get('id')
    const { data: session } = useSession({ required: true })
    const router = useRouter()

    useEffect(() => {
        const fetchCurrentFields = async () => {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            
            const data = await response.json()
            setPost({
                prompt: data.prompt,
                tag: data.tag
            })
        }

        if (promptId) {
            fetchCurrentFields()
        }
    }, [promptId])

    const editPrompt = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault()
        if (!session) {
            toast({
                variant: 'destructive',
                description: 'Please login to post a prompt.',
            })
            return
        }

        isSubmitting(true)

        try {
            const sanitizedTag = sanitizeTag(post.tag)

            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: sanitizedTag,
                })
            })

            if (!response.ok) {
                const errorData = await response.json()
                if (errorData.code === 'MAX_LENGTH_EXCEEDED') {
                    toast({ 
                        title: 'Invalid Input.', 
                        description: 'Tag exceeds the maximum length of 25 characters' 
                    });
                } else {
                    toast({ 
                        title: 'Invalid Input.', 
                        description: 'Please check your prompt ensure the fields are filled.' 
                    });
                }
                isSubmitting(false)
            } else {
                // TODO: Need to implement the updated toast on homepage
                router.push(`/?toast=updated`)
            } 
        } catch (error: unknown) {
            if (error instanceof Error) {              
                toast({
                    title: 'Uh oh! Something went wrong.',
                    description: 'There was a problem editing your prompt. Please try again.'
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
        type = "Edit"
        post = {post}
        setPost = {setPost}
        submitting = {submitting}
        handleSubmit = {editPrompt}
    />
  )
}

export default Page