
import {catchAsyncError} from '../middlewares/catchAsyncError.js';
import ErrorHandler from "../middlewares/error.js";
import {Job} from "../models/jobSchema.js";

export const getallJobs=catchAsyncError(async(req,res,next)=>{
     
    const jobs=await Job.find({expired:false});

    res.status(200).json({
        success:true,   
        jobs,
       
    });
});


export const postJob=catchAsyncError(async(req,res,next)=>{
        const {role}=req.user;
        console.log("get jobpost")
        if(role==="Job Seeker"){
                return next(new ErrorHandler("job seeker Not allowed to use these resources..",400));
        }

        const {title,description,category,country,city,location,fixedSalary,salaryFrom,salaryTo}=req.body;
        console.log(req.body)
      var  City =city;
      var Country = country;
        if(!title || !description || !category || !Country || !City || !location)
        {
            return next(new ErrorHandler("please provide full Job details..",400));
        }

        if(((!salaryFrom || !salaryTo) && !fixedSalary))
        {
            return next(new ErrorHandler("please provide eigther fixed salary or range salary ",400));
        }
      
        if (salaryFrom && salaryTo && fixedSalary) {
            return next(
              new ErrorHandler("Cannot Enter Fixed and Ranged Salary together.", 400)
            );
          }

     const postedBy = req.user._id;
     const job= await Job.create(  {
        title,description,category,Country,City,location,fixedSalary,salaryFrom,salaryTo,
        postedBy
     });
     
     res.status(200).json({
        success:true,   
        message:"job posted successfully..",
        job
     });
});

export const getJobDetail=catchAsyncError(async(req,res,next)=>{
   const {id} =req.params;
   const jobs=await Job.findById(id).limit(1);
   console.log(jobs)
   res.status(200).json({
    success:true,   
    message:"get job info..",
   job: jobs
 });

})
export const getmyJobs=catchAsyncError(async(req,res,next)=>{
    const {role}=req.body;
    if(role==="Job Seeker") 
    {
        return next(new ErrorHandler("job seeker Not allowed to use these resources..",400));
    }

    const myjobs = await Job.find({postedBy:req.user._id});
    res.status(200).json({
        success:true,
        myjobs,      
    });
    
}); 

export const updateJob =catchAsyncError(async(req,res,next)=>{
    const {role}=req.body;
    
    if(role==="Job Seeker")
    {
        return next(new ErrorHandler("job seeker Not allowed to use these resources..",400));
    }

    const {id}=req.params;
    let job=await Job.findById(id);
    
    if(!job)    
    {
        return next(new ErrorHandler("Oops Job Not Found !! ",404));
    }

    job=await Job.findByIdAndUpdate(id, req.body,{
        new: true,
        runValidators:true,
        useFindAndModify:false,
    });
    res.status(200).json({

        success:true,
        job,
        message:"Job Updated Successfully..."
    });

   

});

export const deleteJob = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
      return next(
        new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
      );
    }
    const { id } = req.params;
    const job = await Job.findById(id);
    if (!job) {
      return next(new ErrorHandler("OOPS! Job not found.", 404));
    }
    await job.deleteOne();
    res.status(200).json({
      success: true,
      message: "Job Deleted!",
    });
  });
  
  export const getSingleJob = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    try {
      const job = await Job.findById(id);
      if (!job) {
        return next(new ErrorHandler("Job not found.", 404));
      }
      res.status(200).json({
        success: true,
        job,
      });
    } catch (error) {
      return next(new ErrorHandler(`Invalid ID / CastError`, 404));
    }
  });