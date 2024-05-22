import {catchAsyncError} from './catchasyncError.js';
import Errorhandler from './error.js';
import jwt from 'jsonwebtoken';
import {User} from '../models/userSchema.js';



export const isAuthorized=catchAsyncError(async(req,res,next)=>{
    const {token}=req.cookies;
    if(!token){
        return next(new Errorhandler("user not authorized ",400));
        // console.log('User not Authorized!');
     
    }

    const decoded =jwt.verify(token,process.env.JWT_SECRETE_KEY);

    req.user =await User.findById(decoded.id);

    next();
    
})