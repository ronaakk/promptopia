import mongoose, { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
    prompt: {
        type: String,
        required: true,
        
    },
    tag: {
        type: String,

    }
})



const Prompt = models.Prompt || mongoose.model('Prompt', PromptSchema)
export default Prompt