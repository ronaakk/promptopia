import { NextRequest } from "next/server";
import { Prompt } from "@/models";
import { connectToDB } from "@/utils/database";

// prevent default caching
export const dynamic = 'force-dynamic'

// Get all posts
export async function GET(req: NextRequest) {
    try {  
        await connectToDB();
        
        const start = Date.now()
        // retrieve all posts from database, while populating the creator field with info about the user
        // .lean() converts the mongoose documents into plain javascript object
        const posts = await Prompt.find({}).populate({path: "creator", model: 'User'}).lean()
        console.log(`Query took ${Date.now() - start}ms`);
        return Response.json(posts || [], { status: 200 })
    } catch (error) {
        console.log('Error retrieving all posts: ', error)
        return Response.json([], { status: 500 })
    }
}