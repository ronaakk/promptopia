import { NextRequest } from "next/server";
import { connectToDB } from "@/utils/database";
import Prompt from "@/models/Prompt"

export async function GET(req: NextRequest, { params } : { params: { userId : string } }) {
    try {
        await connectToDB();
        
        // get the prompts associated with the userId
        const posts = await Prompt.find({ creator : params.userId }).populate('creator')

        return Response.json(posts, { status: 200 })
    } catch (error) {
        return Response.json({ error: 'Failed to fetch prompts created by user'}, { status: 500})
    }
}