import { configDotenv } from "dotenv";
import mongoose from "mongoose"


configDotenv();

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.CONNECTION_STRING)
        console.log("MongoDB Connected successfully");
        console.log(`database :${mongoose.connection.db?.databaseName}`)
    } catch (error) {
        console.log("MongoDB Connection has got an error of: ", error)
        process.exit(1)
        
    }
}
export default connectDB;