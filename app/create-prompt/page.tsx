"use client"

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Form from '@/components/Form'
import 

export default function CreatePrompt() {
    const [submitting, isSubmitting] = useState(false) 
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    })
    
    // create the prompt and save it to db
    const createPrompt = async (e): Promise<void> => {
        e.preventDefault()
        isSubmitting(true)

        try {
            // try and save the new prompt to the model
            
        } catch (error: Error) {
            console.log('Failed to post/edit prompt: ', error.message)
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