"use client"

import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Profile from '@/components/Profile'

// create interface for Post to use in all functions, this will have the primary id associated with each Prompt
interface Post {
    _id: string,
}
function Page() {
    const router = useRouter()
    const [myPosts, setMyPosts] = useState([])
    const { data: session } = useSession()
    const userId = session?.user?.id

    useEffect(() => {
        const fetchMyPosts = async () => {
            const response = await fetch(`/api/users/${userId}/posts`)
            const posts = await response.json()
            const postsArray = JSON.parse(posts)
            setMyPosts(postsArray)
        }

        if (userId) {
            fetchMyPosts()
        }
    }, [userId]) // Only fetch when the session is retrieved (when user logs in)

    // redirect user to update prompt page
    const handleEdit = (post: Post) => {
        router.push(`/update-prompt?id=${post._id}`)
    }

    // once user confirms 
    // TODO: Need to implement this api route
    const handleDelete = async (post: Post) => {
        try {
            await fetch(`/api/prompt/${post._id}`, {
                method: 'DELETE'
            })

            const filteredPosts = myPosts.filter((item: Post) => item._id !== post._id)
            setMyPosts(filteredPosts)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <Profile 
        name='My'
        data={myPosts}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        desc='Welcome to your personalized profile page.'
    />
  )
}

export default Page