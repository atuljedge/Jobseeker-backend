import mongoose from "mongoose";

const Dbconnection= ()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbname:"jobseeker"
    }).then(()=>{
        console.log("connected to database..");
    }).catch((err)=>{
        console.log(`Some error occured..:${err}`);
    });
}

export default Dbconnection;