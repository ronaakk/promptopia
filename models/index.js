import mongoose from "mongoose";
import UserSchema from "./User"
import PromptSchema from "./Prompt"

// need to register all models before using them (in both environments)
// this line clears existing models to avoid using older versions of registered models, in case I make changes to schema
mongoose.models = {}
const User = mongoose.model('User', UserSchema)
const Prompt = mongoose.model('Prompt', PromptSchema)

export { User, Prompt }