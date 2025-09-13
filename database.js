import mongoose from "mongoose";

export const connectDB = async () => {
    const {connection} = await mongoose.connect('mongodb://127.0.0.1:27017/rasuTrip');
    console.log(`Mongodb is connected with ${connection.host}`);
}