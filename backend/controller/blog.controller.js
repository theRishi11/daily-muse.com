import mongoose from "mongoose";
import { Blog } from "../models/blog.models.js";
import { v2 as cloudinary } from 'cloudinary';


export const createBlog= async (req,res)=>{
    try{
        if(!req.files || Object.keys(req.files).length===0){
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const{blogImage} =req.files;
        const allowedFormats = ['image/jpg', 'image/png', 'image/jpeg','image/webp','image/avif' ];
        if(!allowedFormats.includes(blogImage.mimetype)){
            return res.status(400).json({ message: 'Invalid file format' });
        }
        const {category,title,about}=req.body;
        if (!title || !category || !about ) {
            return res.status(400).json({ message: 'Missing! feilds Can not be empty' });
        }

        const adminName = req?.user?.name;
        const adminPhoto = req?.user?.photo?.url;
        const createdBy = req?.user?._id;
        
        const cloudinaryResponse = await cloudinary.uploader.upload(
            blogImage.tempFilePath
        )
        if(!cloudinaryResponse || cloudinaryResponse.error){
            return res.status(500).json({ message: 'Failed to upload file to cloudinary' });
        }
        const blogData = ({title,about,category,adminName,adminPhoto,createdBy ,blogImage:{
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.url,
        }});

        const blog = await Blog.create(blogData)
            res.status(200).json({ message: "Blog Created Successfully",blog});
    }
    catch (error){
        console.log(error);
        return res.status(500).json({ message: 'Failed to Create' });
    }
}; 

//Delete a blog
export const deleteBlog = async (req, res) => {
    const {id} = req.params;
    const blog = await Blog.findById(id);
    if(!blog){
        return res.status(404).json({ message: 'Blog not found' });
    }
    await blog.deleteOne();
    res.status(200).json({ message: 'Blog deleted successfully' });
};

export const getAllBlogs = async(req,res) =>{
    const allBlogs = await Blog.find()
    res.status(200).json(allBlogs);
};

export const getSingleBlogs = async(req,res) =>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({ message: 'Invalid Blog ID' });
    }
    const blog = await Blog.findById(id);
    if(!blog){
        return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json(blog);
};

export const getMyBlog = async (req,res) =>{
    const createdBy = req.user._id;
    const myBlogs = await Blog.find({createdBy});
    res.status(200).json(myBlogs);
};

export const updateBlog = async (req,res) =>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({ message: 'Invalid Blog ID' });
    }
    const updateBlog = await Blog .findByIdAndUpdate(id,req.body,{new:true});
    if (!updateBlog){
        return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json({ message: 'Blog updated successfully', blog: updateBlog });
};