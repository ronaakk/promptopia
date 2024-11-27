"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { signIn, signOut, getProviders, useSession, getSession } from 'next-auth/react'

function Navbar() {
  // this will check whether a user is currently logged in
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  // useEffect runs a function after a component renders, the [] makes it only run once
  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders();
      console.log('providers fetched: ', response)
      setProviders(response)
    } 

    fetchProviders()
  }, [])

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
        <p className="logo-text">Promptopia</p>
      </Link>


      {/* Desktop navigation (these styles will be hidden in smaller screens, but once past sm breakpoint, it will be shown) */}
      <div className="hidden sm:flex">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href='/create-prompt' className="black_btn">
              Create Post
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
          {providers && (
            Object.values(providers).map(provider => (
              <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
                Continue with {provider.name}
              </button>
            ))
          )}
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
            {providers && (
              Object.values(providers).map(provider => (
                <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
                  Continue with {provider.name}
                </button>
              ))
            )}
          </>
        )}

      </div>

    </nav>
  )
}

export default Navbar