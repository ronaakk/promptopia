import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        // index's work like pages in a book, by giving each creator an index, it makes queries quicker
        index: true
    },
    prompt: {
        type: String,
        required: [true, 'Prompt is required.'], 
    },
    tag: {
        type: String,
        required: [true, 'A tag is required.'],
        maxLength: 25
    }
})

export default PromptSchema