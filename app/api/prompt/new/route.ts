import Prompt from '@/models/Prompt'
import { connectToDB } from "@/utils/database";
import User from "@/models/User";
import { NextRequest } from 'next/server';

// use NextRequest as it's the standard for the app router in next 14
export async function POST(req: NextRequest) {
    // save the new prompt to the model 
    try {
        await connectToDB();

        // need to parse the req body
        const body = await req.json()
        const { email, prompt, tag } = body;
        
        // get the userId from the email
        const user = await User.findOne({ email: email })
        const userId = user?._id

        const newPrompt = await Prompt.create({
            creator: userId,
            prompt: prompt,
            tag: tag
        })

        // returning the newly created prompt as json
        return Response.json(newPrompt, { status: 201 })

    } catch (error) {
        console.error('Error saving new prompt:', error);
        return Response.json({ error: 'Error saving new prompt.'}, { status: 500 })
    }   
}


// You are a professional web developer. I want you to look over this snippet of code and make it more readable and efficient. Also let me know any errors you find! [insert snippet]