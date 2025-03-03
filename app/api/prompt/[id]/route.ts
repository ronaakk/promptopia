import { connectToDB } from "@/utils/database";
import { NextRequest } from "next/server";
import { Prompt } from "@/models";

// to prevent default caching
export const dynamic = 'force-dynamic'

export async function DELETE(req: NextRequest, { params } : { params: { id: string }}) {
    try {
        await connectToDB()

        // get the post associated with the id and delete
        await Prompt.findByIdAndDelete(params.id)
        
        return Response.json("Prompt deleted successfully.", { status: 200 })
        
    } catch (error) {
        console.log("Failed to delete prompt: ", error)
        return Response.json({ error: "Failed to delete prompt." }, { status: 500 }) 
    }
}

// edit a prompt
export async function PATCH(req: NextRequest, { params } : { params: { id: string }}) {
    try {
        await connectToDB()

        // destructure req body
        const { prompt: updatedPrompt, tag: updatedTag } = await req.json()
        console.log(updatedPrompt, updatedTag)
        console.log('edit in progress')

        const existingPrompt = await Prompt.findById(params.id)
        if (!existingPrompt) {
            return Response.json({ error: "Prompt not found." }, { status: 404 })
        }

        // ensure tag meets the required limit
        if (updatedTag.length > 25) {
            return new Response(JSON.stringify({ error: "Tag exceeds the max length.", code: "MAX_LENGTH_EXCEEDED" }), { status: 400 })
        }

        const updatedDocument = await Prompt.findByIdAndUpdate(
            params.id,
            {
                prompt: updatedPrompt,
                tag: updatedTag,
                updatedAt: new Date()
            },
            { 
                new: true,
                runValidators: true // Ensures MongoDB schema validations run
            }
        )
        console.log('updated prompt: ', updatedDocument)

        return Response.json(updatedDocument, { status: 200 })

    } catch (error) {
        console.error('Error updating prompt: ', error)
        return Response.json({ error: "Failed to update prompt." }, { status: 500 })
    }
}

// get a single prompt
export async function GET(req: NextRequest, { params } : { params : { id: string }}) {
    try {
        await connectToDB()

        const promptObject = await Prompt.findById(params.id).populate("creator")
        if (!promptObject) {
            return Response.json({ error: "Prompt not found." }, { status: 404 })
        }

        const responseData = {
            prompt: promptObject.prompt,
            tag: promptObject.tag
        }

        console.log('Sending response:', responseData) // Add this to debug the response

        return Response.json(responseData, { status: 200 })

    } catch (error) {
        console.error('Error fetching prompt:', error)
        return Response.json({ error: 'Failed to retrieve prompt.'}, { status: 500})
    }
}