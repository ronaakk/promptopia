"use client"

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Form from '@/components/Form'

export default function CreatePrompt() {
    const [submitted, isSubmitted] = useState(false) 
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    })
    
    // create the prompt and save it to db
    const createPrompt = () => {

    }

    return (
        <Form 
            type = "Create"
            post = {post}
            setPost = {setPost}
            submitting = {submitted}
            handleSubmit = {createPrompt}
        />
    )

}