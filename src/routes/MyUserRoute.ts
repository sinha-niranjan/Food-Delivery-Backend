import express from "express";
import MyUserControllers from "../controllers/MyUserControllers";

const router = express.Router();

router.post("/", MyUserControllers.createCurrentUser)

export default router;