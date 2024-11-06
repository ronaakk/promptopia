"use client"

import Link from "next/link"
import Image from "next/image"
import { userState, useEffect, useState } from "react"
import { signIn, signOut, getProviders, useSession, getSession } from 'next-auth/react'

function Navbar() {
  const isUserLoggedIn = true;
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useSate(false);

  // useEffect runs a function after a component renders, the [] makes it only run once
  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders();
      setProviders(response)
    } 

    fetchProviders()
  }, [])

  const handleSignOut = () => {

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


      {/* Desktop navigation (these styles will be hidden in smaller screens) */}
      <div className="hidden sm:flex">
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <Link href='/create-prompt' className="black_btn">
              Create Post
            </Link>

            <button type="button" onClick={handleSignOut} className="outline_btn">
              Sign Out
            </button>
            
            <Link href='/profile' className="">
              <Image 
                src='/assets/images/logo.svg'
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
            Object.values(providers).map(provider => {
              <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
                <Link href={provider.Link}>
                  Continue with {provider.name}
                </Link>
              </button>
            })
          )}
          </>
        )}
      </div>

      {/* Mobile navigation */}
      <div className="flex relative sm:hidden">
        {isUserLoggedIn ? (
          <div className="flex">
            <Image 
              src='/assets/images/logo.svg'
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
                    signOut()
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
              Object.values(providers).map(provider => {
                <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
                  <Link href={provider.Link}>
                    Continue with {provider.name}
                  </Link>
                </button>
              })
            )}
          </>
        )}

      </div>

    </nav>
  )
}

export default Navbar