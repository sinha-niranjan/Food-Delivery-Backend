import express from "express";
import MyUserControllers from "../controllers/MyUserControllers";
import { jwtCheck } from "../middleware/auth";

const router = express.Router();

router.post("/",jwtCheck, MyUserControllers.createCurrentUser)

export default router;