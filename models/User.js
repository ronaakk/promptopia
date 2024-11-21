import mongoose, { Schema, model, models } from "mongoose";


const UserSchema = new Schema({
    email: {
        type: String,
        // if it already exists, the second argument will be displayed
        unique: [true, 'Email already exists.'],
        required: [true, 'Please provide your email!']
    },
    username: {
        unique: [true, 'Username already exists.'],
        required: [true, 'Username is required to proceed!'],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    image: {
        type: String,
    }
})

// check whether the User model already exists, if not create one
const User = models.User || mongoose.model('User', UserSchema)
export default User