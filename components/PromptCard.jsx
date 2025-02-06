"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"
import { useToast } from '@/hooks/use-toast'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

// handleTagClick is passed as a function reference here from Feed
function PromptCard({ post, handleEdit, handleDelete, handleTagClick }) {
  const router = useRouter()
  const pathName = usePathname()
  const { data: session } = useSession({ required: true })
  const [isSessionReady, setIsSessionReady] = useState(false)
  const [copied, setCopied] = useState('')
  const { toast } = useToast();

  useEffect(() => {
    if (session) {
        setIsSessionReady(true)
    }
  }, [session])

  const handleProfileClick = () => {
    if (!session) {
      toast({
        variant: 'destructive',
        description: 'Please login to continue.'
      })
    }
    else if (session?.user?.id === post.creator._id) {
      router.push('/profile')
    } 
    else {
      router.push(`/profile/${post.creator._id}?name=${post.creator.username}`)
    }
  }

  // handlers to copy, edit, and delete
  const handleCopy = () => {
    toast({
      'title': 'Copied to clipboard.'
    })
    setCopied(post.prompt)
    navigator.clipboard.writeText(post.prompt)
    setTimeout(() => {
      setCopied('')
    }, 3000)
  }

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-center gap-2">
        {/* flex-1 will allow the name to grow and shrink */}
        <div className="flex flex-1 justify-start items-center gap-3 cursor-pointer" onClick={() => handleProfileClick()}>
          <Image 
            src={post.creator.image}
            alt="profile picture"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-500">
              {post.creator.username}
            </h3>
          </div>
        </div>
        

        <div className="copy_btn" onClick={() => handleCopy()}>
          <Image 
            src={
              copied === post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'
            }
            alt={copied === post.prompt ? 'tick_icon' : 'copy_icon'}
            width={12}
            height={12}
          />
        </div>
      </div>
    

      {/* the prompt itself */}
      <p className="font-satoshi text-sm text-gray-700 my-3 text-start">{post.prompt}</p>
      <div className="flex justify-between items-center">
        {/* calling handleTagClick only if it is defined/exists */}
        <p className="font-inter text-sm blue_gradient cursor-pointer" onClick={() => handleTagClick && handleTagClick(post.tag)}>
          #{post.tag}
        </p>
      </div>

      {/* check if the logged in user can edit/delete their own tag */}
      {post.creator.email === session?.user?.email && pathName === '/profile' && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p className="font-inter text-sm cursor-pointer green_gradient" onClick={() => handleEdit(post)}>
            Edit
          </p>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <p className="font-inter text-sm cursor-pointer orange_gradient">
                Delete
              </p>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete this prompt and remove it from our servers.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDelete(post)}>
                    Confirm
                </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    
    </div>
  )
}

export default PromptCard