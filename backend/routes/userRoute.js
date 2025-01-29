// routes/userRoutes.js
import express from "express";
import { loginUser, signupUser, getAllUsers, logoutUser } from "../controller/userController.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/signup", signupUser);
router.get("/all", getAllUsers);

router.post("/logout",logoutUser)

export default router;
