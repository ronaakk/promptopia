"use client"

import Feed from "@/components/Feed"
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession()
  const searchParams = useSearchParams()
  const router = useRouter()
  let { toast } = useToast();

  // if we are visiting the home page right after creating a post, a success toast should be displayed
  useEffect(() => {
    if (searchParams.get('toast') === 'success') {
      toast({
        title: 'Prompt Created.',
        description: 'Your prompt has been successfully posted!'
      })
    }
    if (searchParams.get('toast') === 'updated') {
      toast({
        title: 'Prompt Updated.',
        description: 'Your prompt has been successfully updated!'
      })
    }

    // remove the query params from the url
    const params = new URLSearchParams(Array.from(searchParams.entries()))
    params.delete('toast')
    const newUrl = `${window.location.pathname}?${params.toString()}`
    router.replace(newUrl)

  }, [searchParams, router])

  return (
    <section className="w-full flex flex-col items-center text-center">
      <h1 className="head_text">
        Discover & Share
        <span className="block orange_gradient mt-2">
          AI-Powered Prompts
        </span>
      </h1>
      <p className="desc">
        Promptopia is an AI tool for the modern world to help discover, create, and share unique prompts
      </p>

      <Feed />
    </section>
  );
}
