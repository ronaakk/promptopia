"use client"

import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Profile from '@/components/Profile'

function ProfilePage() {
    const router = useRouter()
    const [myPosts, setMyPosts] = useState([])
    const { data: session } = useSession()
    const userId = session?.user?.id

    useEffect(() => {
        const fetchMyPosts = async () => {
            const response = await fetch(`/api/users/${userId}/posts`)
            const posts = await response.json()
            setMyPosts(posts)
        }

        if (userId) {
            fetchMyPosts()
        }
    }, [userId]) // Only fetch when the session is retrieved (when user logs in)

  return (
    <Profile 
        name='My'
    />
  )
}

export default ProfilePage