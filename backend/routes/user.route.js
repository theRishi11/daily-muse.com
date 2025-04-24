import express from "express";
import { getAdmins, getMyProfile, login, logout, register } from "../controller/user.controller.js";
import { isAunthicated } from "../middleware/authUser.js";

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAunthicated, logout);
router.get("/my-profile", isAunthicated ,getMyProfile);
router.get("/admins",getAdmins);


export default router;