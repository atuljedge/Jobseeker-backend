import express from 'express';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name:{
    type:String,
    required:[true,'please provide your Name...'],
    minLength:[3,"Name must conatins at least 3 characters.."],
    maxLength:[30,"Name must conatains at most 30  charactets.."],
    },

    email:{
        type:String,
        required:[true,'please provide your E-mail'],
        validate:[validator.isEmail, `please provide a valid email..`],
    },
    phone:
    {
        type:Number,
        required:[true,"please provide your phone number"],
    },
    password:
    {
        type:String,
        minLength:[8,"Name must conatins at least 8 characters.."],
        maxLength:[32,"Name must conatains at most 32 charactets.."],
        // select:false
    },
    role:
    {
        type:String,
        required:[true,"please provide your role.."],
        enum:["Job Seeker","Employer"],
    },
    createdAt:{
        type:Date,
        default:Date.now,

    },
});

// hashing Password 

userSchema.pre("save",async function(next){
    if(!this.isModified("password"))
    {
        next();
    }
    this.password=await bcrypt.hash(this.password, 10);

});
 
// comapairing Password 
 
userSchema.methods.comaparePassword = async function(enteredPasswored){
    // console.log(this.passowrd);
    return await bcrypt.compare(enteredPasswored, this.password);
};
// generate jsonwebtoken for authorization
userSchema.methods.getJWTtoken = function (){
// JWT_SECRETE_KEY=process.env.JWT_SECRETE_KEY;
console.log(process.env.JWT_SECRETE_KEY);
return jwt.sign({id:  this._id} , process.env.JWT_SECRETE_KEY,{
    expiresIn:process.env.JWT_EXPIRE,
});
};


export const User =mongoose.model("User",userSchema);
