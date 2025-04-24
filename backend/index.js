import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from 'cloudinary';
import cookieParser from "cookie-parser";
import cors from "cors";


import userRoute from "./routes/user.route.js";
import blogRoute from "./routes/blog.route.js";

const app = express();
dotenv.config();

const port = process.env.PORT ;
const MONGO_URL = process.env.MONGO_URI;

//middleware
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods : ["GET" , "POST" , "PUT" , "DELETE"],
}));
  
app.use(express.json());
app.use(cookieParser());

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/temp"
}))

//Db code 

try{
    mongoose.connect(MONGO_URL)
    console.log("Connection established to " + MONGO_URL)
}catch(error){
    console.log("Connection error: " + error);
}

//define routes
app.use("/api/users", userRoute);
app.use("/api/blogs", blogRoute);

//Cloudinary
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.CLOUD_API_SECRET,
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})