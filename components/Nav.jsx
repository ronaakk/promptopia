"use client"

import Link from "next/link"
import Image from "next/image"
import { userState, useEffect } from "react"
import { signIn, signOut, getProviders, useSession } from 'next-auth/react'

function Navbar() {
  const isUserLoggedIn = true;

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
          </div>
        ) : (
          <>
          </>
        )}
      </div>


      {/* right handside with user */}

    </nav>
  )
}

export default Navbar