import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { connectToDB } from "../../../../utils/database"
import User from "../../../../models/User"

export const authOptions = NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  // this option will revalidate the session when it expires
  session: {
    maxAge: 60 * 30 // expire every 30 mins of inactivity
  },
  callbacks: {
    // updating the user session when logged in, we are adding the id field to the session if user exists
    async session({ session }) {
      try {
        await connectToDB();
        const sessionUser = await User.findOne({email: session.user.email})

        if (sessionUser) {
          // add the id field
          session.user.id = sessionUser._id.toString()
        } else {
          console.error('Could not find user in database. ', session.user.email)
        }
      } catch (error) {
        console.error('Error in session callback. ', error)
      }
      
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
  },
  cookies: {
    // this token is used to store the users session id and JWT on the client side,
    // with each request which is sent back to the server to authenticate them
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET  // Needs to be set for signing and verifying JWTs and encrypting session cookies
})

const handler = NextAuth(authOptions)
// this allows our handler object to handle get and post requests
export { handler as GET, handler as POST }
// the [...nextauth] will capture all routes related to next auth