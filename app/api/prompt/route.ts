import { NextRequest } from "next/server";
import Prompt from "@/models/Prompt";
import { connectToDB } from "@/utils/database";

// Get all posts
export async function GET(req: NextRequest) {
    try {  
        await connectToDB();

        // retrieve all posts from database, while populating the creator field with info about the user
        const posts = await Prompt.find({}).populate("creator")
        console.log('getting all posts ...')

        return Response.json(posts, { status: 200 })
    } catch (error) {
        console.log('Error retrieving all posts: ', error)
        return Response.json({ error: "Error retrieving all posts." }, { status: 500 })
    }
}