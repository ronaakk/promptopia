"use client"

import Profile from "@/components/Profile"
import { useSearchParams, useParams } from "next/navigation";
import { useEffect, useState } from "react"

function Page() {
    const [userPosts, setUserPosts] = useState([]);
    
    // get user details from url
    const params = useSearchParams();
    const username = params.get["name"]
    const { userId } = useParams<{ userId: string }>()

    useEffect(() => {
        const fetchUserDetails = async () => {
            // set users posts
            const response = await fetch(`/api/users/${userId}/posts`)
            const data = await response.json()
            const postsArray = JSON.parse(data)
            setUserPosts(postsArray)
        }

        if (userId) {
            fetchUserDetails();
        }

    }, [userId])

    return (
    <Profile 
        name={username}
        data={userPosts}
        desc={`Welcome to the profile of ${username}. Find their unique prompts all in one place.`}
        handleDelete
        handleEdit
    />
    )
}

export default Page