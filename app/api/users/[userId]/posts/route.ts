import { NextRequest } from "next/server";
import { connectToDB } from "@/utils/database";
import { Prompt } from "@/models"

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest, { params } : { params: { userId : string } }) {
    try {
        await connectToDB();
        
        // get the prompts associated with the userId
        const posts = await Prompt.find({ creator : params.userId }).populate({path: "creator", model: 'User'}).lean()

        return Response.json(posts || [], { status: 200 })
    } catch (error) {
        return Response.json([], { status: 500})
    }
}