import app from './app.js'
import express from 'express';
import cloudinary from 'cloudinary';

app.use(express.json())

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
    api_key:process.env.CLOUDINARY_CLIENT_API_KEY,
    api_secret:process.env.CLOUDINARY_CLIENT_API_SECRETE
})

app.listen(process.env.PORT,()=>{
    console.log(`server running on port ${process.env.PORT}`);
})





