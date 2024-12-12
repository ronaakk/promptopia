import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true)
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'share_prompt',
        })
        isConnected = true
        console.log('Connected to database.')
    } catch (error) {
        console.log('Failed to connect to database: ', error)
    }
} 