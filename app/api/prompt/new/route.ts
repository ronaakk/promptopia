import type { NextApiRequest, NextApiResponse } from "next";
import Prompt from '@/models/Prompt'
import { connectToDB } from "@/utils/database";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // save the new prompt to the model
    if (req.method === 'POST') {
        try {
            const { userId, prompt, tag } = req.body;
            await connectToDB();
            
            const newPrompt = Prompt.create({
                creator: userId,
                prompt: prompt,
                tag: tag
            })
            
            // returning the newly created prompt as json
            return res.status(201).json(newPrompt)

        } catch (error) {
            console.error('Error saving new prompt:', error);
            return res.status(500).json({ error: 'Error saving new prompt.' })
        }   
    }
}

