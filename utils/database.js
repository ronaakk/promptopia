import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true)
    if (isConnected) {
        console.log('Already connected to database.')
    } 

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'share_prompt',
        })
        isConnected = true
        console.log('Now connected to database.')
    } catch (error) {
        console.log('Failed to connect to database: ', error)
    }
} 