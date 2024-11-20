import { get } from "http"
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { connectToDB } from "../../../../utils/database"

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
    try {
      await connectToDB();

      // check if a user already exists


      // if not, create a new user, and save to db

      

      return true
    } catch (error) {
      console.log('Something went wrong when signing in, please try again. ', error)
      return False
    }
  }
}

export default NextAuth(authOptions)
// the [...nextauth] will capture all routes related to next auth