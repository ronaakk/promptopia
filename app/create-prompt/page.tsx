"use client"

import { ReactElement, ReactEventHandler, ReactNode, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Form from '@/components/Form'


export default function CreatePrompt() {
    const [submitting, isSubmitting] = useState(false) 
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    })
    
    // create the prompt and save it to db
    const createPrompt = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault()
        isSubmitting(true)

        try {
            // try and save the new prompt to the model using api
            const response = await fetch('/api/prompt/new', {
                method: 'POST',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag.split('')
                })
            })
            
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log('Failed to post/edit prompt: ', error.message)
            } else {
                console.log('Unknown error: ', error)
            }

        }
    }

    return (
        <Form 
            type = "Create"
            post = {post}
            setPost = {setPost}
            submitting = {isSubmitting}
            handleSubmit = {createPrompt}
        />
    )

}