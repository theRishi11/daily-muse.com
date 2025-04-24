import express from "express";
import { createBlog, deleteBlog, getAllBlogs, getMyBlog, getSingleBlogs, updateBlog } from "../controller/blog.controller.js";
import { isAdmin, isAunthicated } from "../middleware/authUser.js";

const router = express.Router();
router.post("/create", isAunthicated, isAdmin("admin") ,createBlog);
router.delete("/delete/:id", isAunthicated, isAdmin("admin"),deleteBlog);
router.get("/all-blogs", getAllBlogs);
router.get("/single-blog/:id",isAunthicated, getSingleBlogs);
router.get("/my-blog",isAunthicated, isAdmin ("admin"), getMyBlog );
router.put("/update/:id",isAunthicated, isAdmin("admin"), updateBlog);

export default router;