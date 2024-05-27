import express from 'express';
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import dotenv from 'dotenv'
import userRouter from "./routes/userRouter.js";
import jobRouter from "./routes/jobRouter.js";
import applicationRouter from "./routes/applicationRouter.js";
import Dbconnection from "./Database/Dbconnection.js";
import Errorhandler from "./middlewares/error.js"



const app=express()
dotenv.config({path:"./config/config.env"}); 

app.use( 
   cors(
    {
    origin: [process.env.FRONTEND_URI,"https://main--jobseeker-atul.netlify.app"],
    method: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,}
   )
);


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(fileUpload({
    useTempFiles:true,
    tempfileDir:"/temp/",
}));


//   ROUTER SECTION 

app.use('/api/v1/user',userRouter);
app.use('/api/v1/job',jobRouter);
app.use('/api/v1/application',applicationRouter);

// Database Connection
Dbconnection();

// Api error handling 
app.use(Errorhandler);
export default app;