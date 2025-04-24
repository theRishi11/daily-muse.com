import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

//Authentication

export const isAunthicated = async(req, res, next) =>{
    try{
        const token = req.cookies.jwt;
        console.log("Middleware token", token);
        if (!token){
            return res.status(401).json({error: "User is not authenticated"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(decoded.userId);
        if(!user){
            return res.status(401).json({error : "User not found"});
        }
        req.user = user;
        next();
        
    }
    catch(error){
        console.log("Error while authenticating" + error)
        return res.status(401).json({error: "User is not authenticated"})
    }
};

// Authorization
export const isAdmin = (...roles) =>{
    return (req, res, next) =>{
        if(!roles.includes(req.user.role)){
            return res.status(403).json({error: "User is not authorized to perform this action only admin can perform this task"});
        }
        next();
    }
};