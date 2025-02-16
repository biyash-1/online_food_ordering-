// routes/userRoutes.js
import express from "express";
import { loginUser, signupUser, getAllUsers, logoutUser, refreshToken } from "../controller/userController.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/signup", signupUser);
router.get("/all", getAllUsers);

router.post("/logout",logoutUser)
router.post("/refreshtoken",refreshToken)

export default router;
