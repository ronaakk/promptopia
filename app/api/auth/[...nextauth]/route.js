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
  
  // this are options for the session on the server side
  session: {
    maxAge: 60 * 60 // expire every 1 hour of inactivity
  },

  callbacks: {
    // will fire when a user signs in -> used to set a token and pass it to the client for creation of a session object
    // will receive a user object from the OAuth provider 
    async jwt({ user, token }) {
      // Persist user data (id) to the token, since we are using mongodb to save data
      if (user) {
        const dbUser = await User.findOne({ email: user.email })
        if (dbUser) {
          token.id = dbUser._id.toString()
        }
      } 
      // setting the token up for a 1 hour expiration on the server side
      token.exp = Math.floor(Date.now() / 1000) + 60 * 60;
      return token
    },

    // updating the user session when logged in, we are adding the id field to the session if user exists
    async session({ session, token }) {
      // Add user data to the session from the token
      session.user.id = token.id; // Use the database _id from the token

      return session;
    },

    // handling sign in
    async signIn({ profile }) {
      try {
        await connectToDB();

        // Use findOneAndUpdate with upsert to ensure atomicity
        const user = await User.findOneAndUpdate(
          { email: profile.email },
          {
            $setOnInsert: {
              username: profile.name.replace(" ", "").toLowerCase(),
              image: profile.picture,
            },
          },
          {
            upsert: true, // Create if doesn't exist
            new: true, // Return the document after update
          }
        );
        
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
      name: `next-auth.session-token`, // remove __Secure- prefix for localhost, since this is prob making 'secure' force to true in dev
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production' // only have this on in production
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET  // Needs to be set for signing and verifying JWTs and encrypting session cookies
})

// this allows our handler object to handle get and post requests to the /api/auth/[...nextauth] endpoint.
export { handler as GET, handler as POST }
// the [...nextauth] will capture all routes related to next auth