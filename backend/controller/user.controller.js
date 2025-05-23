import { User } from "../models/user.model.js";
import { v2 as cloudinary } from 'cloudinary';
import bcrypt from 'bcryptjs';
import createTokenAndSaveCookies from "../jwt/authToken.js";


export const register= async (req,res)=>{
    try{
        if(!req.files || Object.keys(req.files).length===0){
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const{photo} =req.files;
        const allowedFormats = ['image/jpg', 'image/png', 'image/jpeg','image/webp' ];
        if(!allowedFormats.includes(photo.mimetype)){
            return res.status(400).json({ message: 'Invalid file format' });
        }
        const {email,name,password,phone,education,role}=req.body;
        if (!email || !name || !password || !phone || !education || !role || !photo) {
            return res.status(400).json({ message: 'Missing! Data Can not be empty' });
        }
    
        const user=await User.findOne({email})
        if(user){
            return res.status(400).json({ message: 'User already exists' });
        }
        const cloudinaryResponse = await cloudinary.uploader.upload(
            photo.tempFilePath
        )
        if(!cloudinaryResponse || cloudinaryResponse.error){
            return res.status(500).json({ message: 'Failed to upload file to cloudinary' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({email,name,password:hashedPassword,phone,education,role ,photo:{
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.url,
        }});
    
        await newUser.save()
        if(newUser){
            const token= await createTokenAndSaveCookies(newUser._id,res);
            console.log("Register token",token);
            res.status(200).json({ message: "User Registerd Successfully",newUser,token:token});
        }
    }
    catch (error){
        console.log(error);
        return res.status(500).json({ message: 'Failed to register' });
    }
};    

export const login= async (req,res)=>{
    const {email,password,role}=req.body;
   try{
    if(!email || !password || !role){
        return res.status(400).json({ message: 'Missing! Data Can not be empty' });
    }
    const user=await User.findOne({email}).select("+password");
    if(!user.password){
        return res.status(400).json({ message: 'Enter Password' });
    }

    const isMatch=await bcrypt.compare(password,user.password);
    if(!user || !isMatch){
        return res.status(400).json({ message: 'Invalid Email Or Password' });
    }
    if (user.role!==role){
        return res.status(400).json({ message: 'Access denied, Please select the role carefully!!!' });
    }

    const token= await createTokenAndSaveCookies(user._id,res)
    console.log("Login token",token);
    res.status(201).json({ message: 'Logged in successfully',user:{
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        __v: user.__v,
    },token:token});
   }
   catch(error){
    console.log(error);
    return res.status(500).json({ message: 'Failed to login' });
   }
}

export const logout = (req, res) => {
   try{
    res.clearCookie("jwt",{ httpOnly: true });
   res.status(200).json({ message: "Logged out successfully" });
   }
   catch(error){
    console.log(error);
    return res.status(500).json({ message: 'Failed to log out' });
   }
};

export const getMyProfile = async (req, res) => {
    const user = await req.user;
    res.status(200).json(user);
};

export const getAdmins = async (req, res) => {
    const admins = await User.find({ role: 'admin' });
    res.status(200).json(admins);
}