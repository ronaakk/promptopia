"use client"

import { getProviders, signIn, signOut, useSession } from 'next-auth/react'
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

function Navbar() {
  // this will check whether a user is currently logged in
  const { data: session, status } = useSession();
  console.log("Client-side session:", session);
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  // useEffect runs a function after a component renders
  useEffect(() => {
    const fetchProviders = async () => {
      if (status === 'unauthenticated') {
        const response = await getProviders();
        setProviders(response)
      }
    } 
    fetchProviders();
  }, [status]) // now, it depends on the status variable from useSession before it runs (it will run anytime it changes)

  // Show a loading state while the session is being fetched
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // this function will render the skeleton loader if status still hasn't been finalized, and then load the proper ui
  const renderSignInContent = () => {
    if (status == 'unauthenticated' && providers) {
      return (
        Object.values(providers).map(provider => (
          <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
            Continue with {provider.name}
          </button>
        ))
      )
    }
    return null
  }

  const handleSignOut = () => {
    // redirect: false will prevent the page from reloading while also deleting the session data
    signOut({ redirect: false })
  }

  return (
    <nav className="flex justify-between items-center w-full mb-16 pt-3">
      <Link href='/' className="flex-center gap-2">
        <Image 
          src="/assets/images/logo.svg"
          alt="Promptopia Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo-text orange_gradient">Promptopia</p>
      </Link>


      {/* Desktop navigation (these styles will be hidden in smaller screens, but once past sm breakpoint, it will be shown) */}
      <div className="hidden sm:flex">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href='/create-prompt' className="black_btn">
              Create Prompt
            </Link>

            <button type="button" onClick={handleSignOut} className="outline_btn">
              Sign Out
            </button>
            
            <Link href='/profile' className="">
              <Image 
                src={session.user.image}
                alt="Profile picture"
                width={37}
                height={37}
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
          {renderSignInContent()}
          </>
        )}
      </div>

      {/* Mobile navigation */}
      <div className="flex relative sm:hidden">
        {session?.user ? (
          <div className="flex">
            <Image 
              src={session.user.image}
              alt="Profile picture"
              width={37}
              height={37}
              className="rounded-full"
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href='/profile'
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>

                <Link
                  href='/create-prompt'
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>

                <button 
                  type="button" 
                  onClick={() => {
                    setToggleDropdown(false)
                    handleSignOut()
                  }}
                  className="black_btn mt-4 w-full"
                  >
                    Sign Out
                </button>
              </div>
            )}


          </div>
        ) : (
          <>
            {renderSignInContent()}
          </>
        )}

      </div>
    </nav>
  )
}

export default Navbar