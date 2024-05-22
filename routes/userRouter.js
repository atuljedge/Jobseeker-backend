import express from "express";
import {register,login,logOut, getUser} from '../controllers/userController.js';
import {isAuthorized} from "../middlewares/auth.js";


const router =express.Router();

router.post("/register",register);
router.post("/login",login);
router.get("/logOut",isAuthorized,logOut);
router.get("/getuser",isAuthorized,getUser);

export default router;





