// const express = require('express');
// const {addFood} = require('../controller/foodController');
// const router = express.Router();
// const multer = require('multer');

// const foodRoute = express.Router();
import express from "express";
import { addFood } from "../controller/foodController.js";
import multer from "multer";
const foodRoute = express.Router();

// Add food

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage });
foodRoute.post("/add",upload.single('image'),addFood);
export default foodRoute;
