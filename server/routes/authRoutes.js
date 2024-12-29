import { Router } from "express";
import { userLogin, userLogout, userSignup,  } from "../controllers/authUserController.js";

const authRoutes = Router();

authRoutes.post("/signup",userSignup);
authRoutes.post("/login",userLogin);
authRoutes.post("/logout",userLogout);


export default authRoutes;