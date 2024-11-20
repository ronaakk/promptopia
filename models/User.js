import { Schema, model, models } from "mongoose";
import { type } from "os";

const UserSchema = new Schema({
    email: {
        type: String,
        // if it already exists, the second argument will be displayed
        unique: [true, 'Email already exists'],
        required: [true, 'Please provide your email!']
    },
    username: {
        unique: [true, 'Username already exists'],
        required: [true, 'Username is required to proceed!']
    }
})

const userModel = model('User', UserSchema)
export default userModel