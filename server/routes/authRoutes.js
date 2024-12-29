import { Router } from "express";
import { userLogin, userSignup,  } from "../controllers/authUserController.js";

const authRoutes = Router();

authRoutes.post("/signup",userSignup);
authRoutes.post("/login",userLogin);


export default authRoutes;