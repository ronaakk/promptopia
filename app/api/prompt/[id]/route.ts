import { connectToDB } from "@/utils/database";
import { NextRequest } from "next/server";
import Prompt from "@/models/Prompt";

export async function DELETE(req: NextRequest, { params }: { params: { id: string }}) {
    try {
        await connectToDB()

        // get the post associated with the id
        

    } catch (error) {
        
    }
}