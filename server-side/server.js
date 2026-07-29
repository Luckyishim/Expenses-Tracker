import expresss from "express";
import mongoose from "mongoose";
import cors from "cors";
import { configDotenv } from "dotenv";
import connectDB from "./config/db";
connectDB();
configDotenv();

const port = process.env.PORT || 5067;
const app = expresss()

app.listen(port, () => {
    console.log(`Server started successfullt at port: ${port}`)
})

