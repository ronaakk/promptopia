import NextAuth from "next-auth";

// adding the id field to prevent errors when using session object
declare module 'next-auth' {
    interface Session {
        user: {
            id: string,
            name? : string | null,
            email?: string | null,
            image?: string | null
        }
    }
}