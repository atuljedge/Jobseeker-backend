import express from "express";
import {getallJobs,getmyJobs,getJobDetail,deleteJob,postJob,updateJob} from "../controllers/jobController.js";
import {isAuthorized} from "../middlewares/auth.js";

const router =express.Router();

router.get("/getallJob",getallJobs);
router.post("/postJob",isAuthorized, postJob);
router.get("/getmyJobs",isAuthorized, getmyJobs);
router.put("/updateJob/:id",isAuthorized,updateJob);
router.delete("/delete/:id",isAuthorized,deleteJob);
router.get("/:id",isAuthorized,getJobDetail)

export default router;


