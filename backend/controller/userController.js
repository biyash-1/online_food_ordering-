// controllers/userController.js

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";
import User from "../models/userModel.js";

export const signupUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            throw new Error("All fields must be filled");
        }

        if (!validator.isEmail(email)) {
            throw new Error("Invalid email");
        }

        const exists = await User.findOne({ email });
        if (exists) {
            throw new Error("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });
        await newUser.save();

        const token = jwt.sign(
            {
                id: newUser._id,
                username: newUser.username,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h",
            }
        );

        res.json({ msg: "User created successfully", token });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ msg: error.message });
    }
};

export const loginUser = async (req, res) => {
    console.log("Received login request:", req.body); // Log the request body
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new Error("Email and password are required");
        }

        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Invalid password");
        }

        const token = jwt.sign(
            {
                id: user._id,
                username: user.username,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h",
            }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 3600000,
        });

        res.json({
            msg: "Login successful",
            username: user.username,
            email: user.email,
            role: user.role,
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(401).json({ msg: error.message });
    }
};

export const logoutUser = async (req, res) => {
    try {
        console.log("logout user called");
       
        res.cookie("token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 0, // Expire immediately
        });
      
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
