import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { connectToDB } from "../../../../utils/database"
import User from "../../../../models/User"

const handler = NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    // updating the user session
    async session({ session }) {
      await connectToDB();
      const sessionUser = await User.findOne({email: session.user.email})
      session.user.id = sessionUser._id.toString()
      return session
    },

    // handling sign in
    async signIn({ profile }) {
      try {
        await connectToDB();

        // check if a user already exists
        const user = await User.findOne({email: profile.email})
        
        if (!user) {
          // if not, create a new user, and save to db
          await User.create({
            email: profile.email,
            username: profile.name.replace(' ', '').toLowerCase(),
            image: profile.picture
          })
        }
        
        return true
      } catch (error) {
        console.log('Something went wrong when signing in, please try again. ', error)
        return false
      }
    },

  }  
})

// this allows our handler object to handle get and post requests
export { handler as GET, handler as POST }
// the [...nextauth] will capture all routes related to next auth