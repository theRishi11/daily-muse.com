import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate:[validator.isEmail, "Please enter a valid email address"]
    },
    password: {
        type: String,
        required: true,
        minlength:6,
        select:false
    },
    phone: {
        type: Number,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
        required: true
    },
    photo:{
       public_id:{
        type: String,
        required: true
       },
       url:{
        type: String,
        required: true,
       }
    },
    education: {
        type: String,
        required: true
    },
    token:{
        type: String,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    
    }

    
})

export const User=mongoose.model("User",userSchema)