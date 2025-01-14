import { connectToDB } from "@/utils/database";
import { NextRequest } from "next/server";
import Prompt from "@/models/Prompt";

export async function DELETE(req: NextRequest, { params }: { params: { id: string }}) {
    try {
        await connectToDB()

        // get the post associated with the id
        const deletedPrompt = await Prompt.findByIdAndDelete(params.id)
        
        return Response.json("Prompt deleted successfully.", { status: 200 })
    } catch (error) {
        console.log("Failed to delete prompt: ", error)
        return Response.json({ error: "Failed to delete prompt." }, { status: 500 }) 
    }
}