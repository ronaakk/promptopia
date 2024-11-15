import { get } from "http"
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],

  async session({ session }) {

  },
  async signIn({ profile }) {

  }
}

export default NextAuth(authOptions)
// the [...nextauth] will capture all routes related to next auth