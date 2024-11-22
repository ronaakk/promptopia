"use client"

import { SessionProvider } from "next-auth/react"

// Using the supplied <SessionProvider> allows instances of useSession() to share the session object across components, 
// by using React Context under the hood. It also takes care of keeping the session updated and synced between tabs/windows.
export default function Provider({ children, session }) {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}