import {catchAsyncError} from '../middlewares/catchAsyncError.js';
import ErrorHandler from '../middlewares/error.js'
import {User} from "../models/userSchema.js";
import {sendToken} from '../utils/jwtToken.js';


export const register= catchAsyncError(async(req,res,next)=>{
    const {name,email,phone,role,password}=req.body;
    // console.log(name)
    if(!name || !email || !phone || !role || !password){
        return next(new ErrorHandler("Please fill the full registration form..."));
    }
    const isEmail =await User.findOne({email});
    if(isEmail)
    {
        return next(new ErrorHandler("User with this mail-id already exists.."));
        // res.status(404).json("User with this mail-id already exists..")
    }

  const user = await User.create({
        name,
        email,
        phone,
        role,
        password,
        
    });

    // res.status(200).json({
    //     success:true,
    //     message:"user registered ",
    //     user,
    // });
    sendToken(user, 200, res,"user registred succesfully!!..");
    
});

//    LOGIN Controller 

export const login=catchAsyncError(async(req,res,next)=>{
    const {email,password,role}=req.body;

    if(!email || !password || !role){
        return next(new ErrorHandler("please provide email,password and role.."),400);
         res.status(404).json("please provide email,password and role.." );
    }
    const user = await User.findOne({email});
    if(!user)
    {
       return next(new ErrorHandler("Invalid Email or password !",400));
       res.status(404).json("Invalid Email or password !" );
    }

    const isPasswordmatched = await user.comaparePassword(password);
    if(!isPasswordmatched)
    {
        return next(new ErrorHandler("invalid passowrd .. ",400));
        res.send("invalid passowrd .. " );
    }
    if(user.role!=role)
    {
       return next(new Errorhandler("User with this role not Found..",400));
    }
    sendToken(user,200,res, "user logged in successfully...");
    // res.send("user logged in successfully.." );
    
});


export const logOut= catchAsyncError(async (req,res,next)=>{
    res.status(201).cookie("token","",{
        httpOnly:true,
        expires:new Date(Date.now()),
    }).json({
        success:true,
        message:"User logged out Successfully...!!",
    })
});


 export const getUser = catchAsyncError((req,res,next)=>{
    const user=req.user;
    res.status(200).json({
        success:true,
        user,    
    });
 });










