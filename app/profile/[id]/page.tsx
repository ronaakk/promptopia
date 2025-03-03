"use client"

import Profile from "@/components/Profile"
import { useSearchParams, useParams } from "next/navigation";
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react";
import Loading from "@/components/Loading";

function Page() {
    const { data: session } = useSession();
    const [isLoading, setIsLoading] = useState(true);
    const [userPosts, setUserPosts] = useState([]);
    
    // get user details from url
    const params = useSearchParams();
    const username = params.get["name"]
    const { userId } = useParams<{ userId: string }>()

    useEffect(() => {
        const fetchUserDetails = async () => {
            // set users posts
            const response = await fetch(`/api/users/${userId}/posts`)
            const postsArray = await response.json()
            setUserPosts(postsArray)
            setIsLoading(false)
        }

        if (userId) {
            fetchUserDetails();
        }

    }, [userId, session])

    if (isLoading) {
        return <Loading />
    }

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