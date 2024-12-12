"use client"

import Feed from "@/components/Feed"
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useSearchParams, useRouter } from "next/navigation";

export default function Home() {
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

    // remove the query param from the url
    const params = new URLSearchParams(Array.from(searchParams.entries()))
    params.delete('toast')
    const newUrl = `${window.location.pathname}?${params.toString()}`
    router.replace(newUrl)

  }, [searchParams, router])

  return (
    <section className="w-full flex flex-col items-center text-center">
      <h1 className="head_text">
        Discover & Share
      </h1>
      {/* going to be hidden on screen 768px and larger, (max-md targets breakpoints max-md and larger) */}
      <br className="max-md:hidden"/>
      <span className="orange_gradient text-2xl">
        AI-Powered Prompts
      </span>

      <p className="desc">
        Promptopia is an AI tool for the modern world to help discover, create, and share unique prompts
      </p>

      <Feed />
    </section>
  );
}
