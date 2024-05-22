import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"please provide your Job title"],
        minLength:[3,"job title contains minimum 3 characters"],
        maxLength:[50,"job title contains max 50 characters"],
    },

    description:{
        type:String,
        required:[true,"please provide your description title"],
        minLength:[3,"job description contains minimum 50 characters"],
        maxLength:[350,"job description contains max 350 characters"],
    },
    category:{
        type:String,
        required:[true,"Job category is Required..."],
        
    },
    Country:{
        type:String,
        required:[true,"Job Country is required.."],
    },
    City:{
        type:String,
        required:[true,"Job City is required.."],
    },
    location:{
        type:String,
        required:[true,"please provide Current location"],
    },
    fixedSalary:{
        type:Number,
        minLength:[4,"should be at least four digit"],
        maxLength:[9,"should be at at most nine digit."],
    },
    salaryFrom:{
        type:Number,
        minLength:[4,"salary must be at least four digit"],
        maxLength:[9,"salary must be at most nine digit."],
    },
    salaryTo:{
        type:Number,
        minLength:[4,"salary must be at least four digit"],
        maxLength:[9,"salary must be at most nine digit"],
    },
    expired:{
        type:Boolean,
        default:false,
    },
    jobPostedOn:{
        type:Date,
        default:Date.now(),
    },
    postedBy:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },
})

export const Job=mongoose.model("Job",jobSchema);